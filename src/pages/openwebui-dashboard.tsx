import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Database } from 'sql.js';
import { 
  initDatabase, 
  getBancamiaUsers, 
  getUserChats, 
  calculateUserMetrics,
  UserMetrics 
} from '@/lib/database';
import { Users, MessageCircle, TrendingUp, Award, Activity } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function OpenWebUIDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userMetrics, setUserMetrics] = useState<UserMetrics[]>([]);
  const [database, setDatabase] = useState<Database | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const db = await initDatabase();
        setDatabase(db);
        
        const users = getBancamiaUsers(db);
        const metricsData = users.map(user => {
          const chats = getUserChats(db, user.id);
          return calculateUserMetrics(user, chats);
        });
        
        setUserMetrics(metricsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading data');
        console.error('Database error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalUsers = userMetrics.length;
  const totalValidChats = userMetrics.reduce((sum, m) => sum + m.totalValidChats, 0);
  const totalAgentInteractions = userMetrics.reduce((sum, m) => sum + m.totalAgentInteractions, 0);
  const avgQualityScore = userMetrics.length > 0 
    ? userMetrics.reduce((sum, m) => sum + m.qualityScore, 0) / userMetrics.length 
    : 0;

  // Data for charts
  const userQualityData = userMetrics
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .slice(0, 10)
    .map(m => ({
      name: m.user.name.split(' ')[0], // First name only
      email: m.user.email,
      qualityScore: Math.round(m.qualityScore),
      validChats: m.totalValidChats,
      completionRate: Math.round(m.completionRate),
    }));

  const engagementData = userMetrics
    .filter(m => m.innovationEngagement > 0)
    .map(m => ({
      name: m.user.name.split(' ')[0],
      innovation: Math.round(m.innovationEngagement),
      depth: Math.round(m.averageDepth),
    }));

  const activityDistribution = [
    { name: 'Alto (8+ chats)', value: userMetrics.filter(m => m.totalValidChats >= 8).length },
    { name: 'Medio (4-7 chats)', value: userMetrics.filter(m => m.totalValidChats >= 4 && m.totalValidChats < 8).length },
    { name: 'Bajo (1-3 chats)', value: userMetrics.filter(m => m.totalValidChats >= 1 && m.totalValidChats < 4).length },
    { name: 'Sin actividad', value: userMetrics.filter(m => m.totalValidChats === 0).length },
  ].filter(item => item.value > 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel OpenWebUI - Bootcamp Bancamía</h1>
          <p className="text-gray-600 mt-1">Análisis de uso y engagement durante el bootcamp de innovación</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {totalUsers} usuarios activos
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Bancamía</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className="text-xs text-gray-600">Total registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chats Válidos</CardTitle>
            <MessageCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalValidChats}</div>
            <p className="text-xs text-gray-600">Interacciones completas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interacciones con Agentes</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalAgentInteractions}</div>
            <p className="text-xs text-gray-600">Finni, Paul Graham, Kiwi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Calidad Promedio</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{Math.round(avgQualityScore)}</div>
            <Progress value={avgQualityScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Quality Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Top 10 - Score de Calidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userQualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'qualityScore' ? `${value}%` : value,
                    name === 'qualityScore' ? 'Score' : name === 'validChats' ? 'Chats Válidos' : 'Tasa Completitud'
                  ]}
                  labelFormatter={(label) => {
                    const user = userQualityData.find(u => u.name === label);
                    return user ? `${user.name} (${user.email})` : label;
                  }}
                />
                <Bar dataKey="qualityScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Innovation Engagement vs Depth */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement de Innovación vs Profundidad Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  fontSize={12}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="innovation" fill="#10B981" name="% Innovation Engagement" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="depth" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Profundidad Promedio"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles por Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Usuario</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-right p-2">Chats Válidos</th>
                  <th className="text-right p-2">Interacciones Agentes</th>
                  <th className="text-right p-2">Score Calidad</th>
                  <th className="text-right p-2">% Completitud</th>
                  <th className="text-right p-2">Innovation %</th>
                </tr>
              </thead>
              <tbody>
                {userMetrics
                  .sort((a, b) => b.qualityScore - a.qualityScore)
                  .map((metrics, index) => (
                  <tr key={metrics.user.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-2 font-medium">{metrics.user.name}</td>
                    <td className="p-2 text-gray-600">{metrics.user.email}</td>
                    <td className="p-2 text-right">{metrics.totalValidChats}</td>
                    <td className="p-2 text-right">{metrics.totalAgentInteractions}</td>
                    <td className="p-2 text-right">
                      <Badge 
                        variant={metrics.qualityScore >= 70 ? "default" : 
                               metrics.qualityScore >= 50 ? "secondary" : "outline"}
                      >
                        {Math.round(metrics.qualityScore)}
                      </Badge>
                    </td>
                    <td className="p-2 text-right">{Math.round(metrics.completionRate)}%</td>
                    <td className="p-2 text-right">{Math.round(metrics.innovationEngagement)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}