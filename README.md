# MotionStack • Full-Stack Vite + React 18 + Node.js Express + TypeScript + Tailwind CSS + motion/react

A high-performance modern Full-Stack application boilerplate combining:
- **Frontend Core**: React 18 (Concurrent rendering, `useTransition`, `useDeferredValue`, automatic batching)
- **Styling**: Tailwind CSS 3 with custom tokens, dark mode, and glassmorphism
- **Animations**: `motion/react` 12 (Spring physics, `layoutId` FLIP morphing, gestures, keyframes)
- **Backend API**: Node.js + Express + TypeScript (Native type stripping, zero build lag)
- **REST Endpoints**: CRUD `/api/projects`, system metrics `/api/metrics`, `/api/health`
- **Data Persistence**: In-memory database store with CRUD operations and request counters
- **Dev Workflow**: Single `npm run dev` command running both Express server and Vite frontend concurrently with proxying.

---

## 📁 Full-Stack Architecture

```
DEMO DAY 2/
├── server/                       # Node.js Express TypeScript Backend
│   ├── controllers/
│   │   ├── projectController.ts  # CRUD handlers (GET, POST, PUT, DELETE)
│   │   └── metricsController.ts  # Health check & system RAM/CPU metrics
│   ├── data/
│   │   └── store.ts              # In-memory database store with seed data
│   ├── routes/
│   │   └── api.ts                # Express REST routes definition
│   ├── types.ts                  # Shared backend/frontend data models
│   └── index.ts                  # Express server bootstrap (Port 5000)
├── src/                          # Vite + React 18 Frontend
│   ├── components/
│   │   ├── Navbar.tsx            # Glassmorphism header with active pill
│   │   ├── Hero.tsx              # Staggered typography, confetti trigger
│   │   ├── TechStack.tsx         # Interactive stack cards with 3D tilt
│   │   ├── MotionPlayground.tsx  # 4 Interactive live labs (Springs, FLIP, Keyframes, Concurrent)
│   │   ├── FullstackExplorer.tsx # Live full-stack HUD, latency meter & CRUD panel
│   │   ├── FeaturesGrid.tsx      # Bento grid architectural cards
│   │   ├── CodeViewer.tsx        # Tabbed code inspector with 1-click copy
│   │   └── Footer.tsx            # Status bar and links
│   ├── services/
│   │   └── api.ts                # Client API service for backend communication
│   ├── types/
│   │   └── index.ts              # UI types and presets
│   ├── App.tsx                   # Main layout and section router
│   ├── index.css                 # Tailwind directives, glassmorphism & glow effects
│   └── main.tsx                  # React 18 createRoot bootstrap
├── index.html                    # HTML5 entry with Google Fonts
├── tailwind.config.js            # Custom palette, glow shadows, and keyframes
├── postcss.config.js             # PostCSS configuration
├── tsconfig.json                 # TypeScript compiler setup
├── vite.config.ts                # Vite config + /api proxy to backend
├── README.md                     # Documentation & setup instructions
└── package.json                  # Dependencies and fullstack scripts
```

---

## 📡 Backend REST API Endpoints

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health check and environment status |
| `GET` | `/api/metrics` | Live RAM usage (RSS/Heap), uptime, request counts |
| `GET` | `/api/projects` | Fetch all project records from store |
| `GET` | `/api/projects/:id` | Fetch specific project by ID |
| `POST` | `/api/projects` | Create a new project record |
| `PUT` | `/api/projects/:id` | Update an existing project record |
| `DELETE` | `/api/projects/:id` | Delete a project record |

---

## 🚀 Quick Start Commands

### 1. Run Full-Stack (Frontend + Backend Concurrently)
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

### 2. Run Only Backend Server
```bash
npm run server
```

### 3. Run Only Frontend Client
```bash
npm run client
```

### 4. Build Production Bundle
```bash
npm run build
```
