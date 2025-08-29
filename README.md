# OpenWebUI Dashboard - Bootcamp Bancamía

A comprehensive analytics dashboard for tracking OpenWebUI usage during the Bancamía Innovation Bootcamp.

## Features

### 📊 Key Metrics
- **User Analytics**: Total Bancamía users (@bancamia.com.co)
- **Chat Analysis**: Valid interactions vs agent conversations
- **Quality Scoring**: Intelligent assessment of chat completeness and depth
- **Innovation Engagement**: Tracking of bootcamp workflow usage

### 🎯 Smart Filtering
- Filters for Bancamía corporate email domain only
- Separates agent interactions (Finni, Paul Graham, Kiwi) from regular chats
- Identifies bootcamp workflow patterns (entrevistas, usuarios-sintéticos, etc.)

### 📈 Visualizations
- User quality ranking charts
- Activity distribution pie charts
- Innovation engagement analysis
- Detailed user metrics table

### 🧠 AI-Powered Analysis
- Claude-based chat quality assessment
- Interaction depth scoring
- Completion rate calculation
- Workflow type detection

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Database**: SQLite with sql.js (client-side)
- **Build Tool**: Vite
- **Deployment**: Coolify via GitHub

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd openwebui-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup

The dashboard expects a SQLite database file at `public/webui_optimized.db` with the following structure:

```sql
-- Users table
CREATE TABLE user (
  id VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(255),
  created_at INTEGER,
  updated_at INTEGER,
  last_active_at INTEGER
);

-- Chats table
CREATE TABLE chat (
  id VARCHAR(255),
  user_id VARCHAR(255),
  title TEXT,
  chat JSON,
  created_at DATETIME,
  updated_at DATETIME
);
```

## Usage

1. **Navigate to OpenWebUI Analytics**: Use the sidebar menu
2. **View Key Metrics**: Overview cards show totals and averages
3. **Analyze Quality Scores**: Top 10 ranking chart shows best performers  
4. **Check Activity Distribution**: Pie chart shows engagement levels
5. **Review User Details**: Full table with all metrics per user
## Deployment

### For Coolify

1. **New Project** → **Git Repository**
2. **Repository URL:** `https://github.com/BY-SAMBO/dashbancamia.git`
3. **Branch:** `main`
4. **Build Pack:** `Docker`
5. **Port:** `80` (automatically configured in Dockerfile)

### Environment Variables

```bash
VITE_ROUTE=browserRouter  # or hashRouter for GitHub Pages
```

## Metrics Explained

### Quality Score (0-100)
Composite metric based on:
- **Depth (40%)**: Average messages per valid chat
- **Completion Rate (30%)**: Percentage of completed interactions
- **Innovation Engagement (30%)**: Usage of bootcamp workflows

### Valid Interactions
Criteria for valid chats:
- ✅ Not agent conversations (excludes Finni, Paul Graham, Kiwi)
- ✅ Minimum 5 messages (shows meaningful engagement)
- ✅ Natural completion (user response or conclusion indicators)

### Bootcamp Workflows
Tracked patterns:
- 1.1-entrevistas (Interviews)
- 2.1-usuarios-sinteticos (Synthetic Users)
- 2.2-entrevista-sintetica (Synthetic Interview)
- 3.1-generador-hipotesis (Hypothesis Generator)
- 3.2-validacion-hipotesis (Hypothesis Validation)
- 3.3-investigacion-prototipos (Prototype Research)
- 4.1-metodologias (Methodologies)

## Contributing

This dashboard was created for the Bancamía Innovation Bootcamp. For modifications or issues, please contact the bootcamp facilitators.


## 🛠️ command

| command | description             |
|---------|-------------------------|
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `build:github` | `tsc -b && vite build --mode github` |
| `lint` | `eslint .` |
| `preview` | `vite preview` |
| `preview:github` | `vite preview --mode github` |
| `analyze` | `cross-env ANALYZE=true vite build` |
| `readme` | `node ./readme/readme.js && node ./readme/readme-zh-CN.js` |

## 📦 dependencies

- dependencies:
  - @dnd-kit/core: ^6.3.1
  - @dnd-kit/modifiers: ^9.0.0
  - @dnd-kit/sortable: ^10.0.0
  - @dnd-kit/utilities: ^3.2.2
  - @hookform/resolvers: ^5.0.1
  - @loadable/component: ^5.16.7
  - @observablehq/plot: ^0.6.17
  - @radix-ui/react-avatar: ^1.1.9
  - @radix-ui/react-checkbox: ^1.3.1
  - @radix-ui/react-collapsible: ^1.1.11
  - @radix-ui/react-dialog: ^1.1.13
  - @radix-ui/react-dropdown-menu: ^2.1.15
  - @radix-ui/react-label: ^2.1.6
  - @radix-ui/react-popover: ^1.1.14
  - @radix-ui/react-select: ^2.2.4
  - @radix-ui/react-separator: ^1.1.6
  - @radix-ui/react-slot: ^1.2.3
  - @radix-ui/react-switch: ^1.2.5
  - @radix-ui/react-tabs: ^1.1.12
  - @radix-ui/react-toggle: ^1.1.8
  - @radix-ui/react-toggle-group: ^1.1.9
  - @radix-ui/react-tooltip: ^1.2.7
  - @tabler/icons-react: ^3.31.0
  - @tailwindcss/vite: ^4.1.3
  - @tanstack/react-table: ^8.21.3
  - axios: ^1.9.0
  - class-variance-authority: ^0.7.1
  - clsx: ^2.1.1
  - colorjs.io: ^0.5.2
  - echarts-for-react: ^3.0.2
  - lucide-react: ^0.488.0
  - next-themes: ^0.4.6
  - react: ^19.1.0
  - react-dom: ^19.1.0
  - react-hook-form: ^7.56.3
  - react-intl: ^7.1.11
  - react-router: ^7.6.2
  - recharts: ^2.15.3
  - sonner: ^2.0.5
  - tailwind-merge: ^3.2.0
  - tailwindcss: ^4.1.3
  - tailwindcss-animate: ^1.0.7
  - vaul: ^1.1.2
  - zod: ^3.24.4
  - zustand: ^5.0.5

- devDependencies:
  - @eslint/js: ^9.24.0
  - @types/loadable__component: ^5.13.9
  - @types/mockjs: ^1.0.10
  - @types/node: ^22.14.1
  - @types/react: ^19.1.1
  - @types/react-dom: ^19.1.2
  - @vitejs/plugin-react-swc: ^3.8.1
  - cross-env: ^7.0.3
  - eslint: ^9.24.0
  - eslint-plugin-react-hooks: ^5.2.0
  - eslint-plugin-react-refresh: ^0.4.19
  - globals: ^16.0.0
  - msw: ^2.10.2
  - rollup-plugin-visualizer: ^6.0.3
  - typescript: ~5.8.3
  - typescript-eslint: ^8.29.1
  - vite: ^6.2.6

## License

Private - Bancamía Internal Use

---

*Built with ❤️ for Bancamía's AI Innovation Journey*
