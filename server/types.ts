export interface ProjectItem {
  id: string;
  title: string;
  category: 'Physics' | 'Layout' | 'Keyframes' | 'Concurrent' | 'Fullstack';
  status: 'active' | 'archived' | 'experimental';
  stiffness: number;
  damping: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemMetrics {
  serverTime: string;
  uptimeSeconds: number;
  memoryUsageMb: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
  nodeVersion: string;
  activeProjectsCount: number;
  totalRequestsServed: number;
  status: 'healthy' | 'degraded';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
}
