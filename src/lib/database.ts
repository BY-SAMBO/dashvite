import initSqlJs, { Database } from 'sql.js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: number;
  updated_at: number;
  last_active_at: number;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  chat: any;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  parentId?: string;
  childrenIds?: string[];
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  models?: string[];
}

export interface ParsedChat extends Omit<Chat, 'chat'> {
  messages: ChatMessage[];
  isValidInteraction: boolean;
  depth: number;
  isCompleted: boolean;
  workflowType?: string;
  isAgentChat: boolean;
}

export interface UserMetrics {
  user: User;
  totalValidChats: number;
  totalAgentInteractions: number;
  averageDepth: number;
  completionRate: number;
  innovationEngagement: number;
  activityDays: number;
  qualityScore: number;
}

let db: Database | null = null;

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });

  const response = await fetch('/webui_optimized.db');
  const buffer = await response.arrayBuffer();
  const data = new Uint8Array(buffer);
  
  db = new SQL.Database(data);
  return db;
}

export function getBancamiaUsers(database: Database): User[] {
  const stmt = database.prepare(`
    SELECT id, name, email, role, created_at, updated_at, last_active_at 
    FROM user 
    WHERE email LIKE '%@bancamia.com.co'
    ORDER BY name
  `);
  
  const results: User[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as any;
    results.push({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      created_at: row.created_at,
      updated_at: row.updated_at,
      last_active_at: row.last_active_at,
    });
  }
  
  stmt.free();
  return results;
}

export function getUserChats(database: Database, userId: string): ParsedChat[] {
  const stmt = database.prepare(`
    SELECT id, user_id, title, chat, created_at, updated_at 
    FROM chat 
    WHERE user_id = ?
    ORDER BY created_at DESC
  `);
  
  const results: ParsedChat[] = [];
  stmt.bind([userId]);
  
  while (stmt.step()) {
    const row = stmt.getAsObject() as any;
    const chatData = JSON.parse(row.chat);
    const messages = chatData.messages || [];
    
    const isAgentChat = isAgentInteraction(row.title, messages);
    const depth = messages.length;
    const isCompleted = isInteractionCompleted(messages);
    const isValidInteraction = !isAgentChat && depth >= 5 && isCompleted;
    const workflowType = detectWorkflowType(row.title);
    
    results.push({
      id: row.id,
      user_id: row.user_id,
      title: row.title,
      messages,
      created_at: row.created_at,
      updated_at: row.updated_at,
      isValidInteraction,
      depth,
      isCompleted,
      workflowType,
      isAgentChat,
    });
  }
  
  stmt.free();
  return results;
}

function isAgentInteraction(title: string, messages: ChatMessage[]): boolean {
  const agentKeywords = ['finni', 'paul graham', 'kiwi'];
  const titleLower = title.toLowerCase();
  
  // Check title
  if (agentKeywords.some(keyword => titleLower.includes(keyword))) {
    return true;
  }
  
  // Check messages for agent mentions
  const messageContent = messages.map(m => m.content.toLowerCase()).join(' ');
  return agentKeywords.some(keyword => messageContent.includes(keyword));
}

function isInteractionCompleted(messages: ChatMessage[]): boolean {
  if (messages.length < 3) return false;
  
  const lastMessage = messages[messages.length - 1];
  const secondLastMessage = messages[messages.length - 2];
  
  // Check if user had the last word or conversation ended naturally
  const hasUserResponse = lastMessage.role === 'user';
  const hasNaturalEnding = lastMessage.content.toLowerCase().includes('gracias') ||
                          lastMessage.content.toLowerCase().includes('perfecto') ||
                          secondLastMessage.content.toLowerCase().includes('éxito');
  
  return hasUserResponse || hasNaturalEnding;
}

function detectWorkflowType(title: string): string | undefined {
  const workflows = {
    '1.1-entrevistas': 'Entrevistas',
    '1.2-busqueda-mercado': 'Búsqueda de Mercado',
    '2.1-usuarios-sinteticos': 'Usuarios Sintéticos',
    '2.2-entrevista-sintetica': 'Entrevista Sintética',
    '3.1-generador-hipotesis': 'Generador de Hipótesis',
    '3.2-validacion-hipotesis': 'Validación de Hipótesis',
    '3.3-investigacion-prototipos': 'Investigación de Prototipos',
    '4.1-metodologias': 'Metodologías',
  };
  
  const titleLower = title.toLowerCase();
  for (const [workflow, name] of Object.entries(workflows)) {
    if (titleLower.includes(workflow.toLowerCase()) || 
        titleLower.includes(name.toLowerCase())) {
      return name;
    }
  }
  
  return undefined;
}

export function calculateUserMetrics(user: User, chats: ParsedChat[]): UserMetrics {
  const validChats = chats.filter(c => c.isValidInteraction);
  const agentChats = chats.filter(c => c.isAgentChat);
  
  const totalDepth = validChats.reduce((sum, chat) => sum + chat.depth, 0);
  const averageDepth = validChats.length > 0 ? totalDepth / validChats.length : 0;
  
  const completedChats = chats.filter(c => c.isCompleted);
  const completionRate = chats.length > 0 ? (completedChats.length / chats.length) * 100 : 0;
  
  const uniqueWorkflows = new Set(
    chats
      .filter(c => c.workflowType)
      .map(c => c.workflowType)
  );
  const innovationEngagement = (uniqueWorkflows.size / 8) * 100; // 8 total workflows
  
  // Calculate activity days (simplified - using chat count as proxy)
  const activityDays = Math.min(chats.length, 30); // Cap at 30 days
  
  // Quality score combines depth, completion rate, and innovation engagement
  const qualityScore = (
    (Math.min(averageDepth / 20, 1) * 0.4) + // Depth weight 40%
    (completionRate / 100 * 0.3) + // Completion weight 30%
    (innovationEngagement / 100 * 0.3) // Innovation weight 30%
  ) * 100;
  
  return {
    user,
    totalValidChats: validChats.length,
    totalAgentInteractions: agentChats.length,
    averageDepth,
    completionRate,
    innovationEngagement,
    activityDays,
    qualityScore,
  };
}