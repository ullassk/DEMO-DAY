import type { Request, Response } from 'express';
import { store } from '../data/store.ts';
import type { SystemMetrics } from '../types.ts';

const startTime = Date.now();

export const getSystemMetrics = (_req: Request, res: Response) => {
  store.incrementRequests();
  const mem = process.memoryUsage();

  const metrics: SystemMetrics = {
    serverTime: new Date().toISOString(),
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    memoryUsageMb: {
      rss: Math.round(mem.rss / 1024 / 1024 * 100) / 100,
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024 * 100) / 100,
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024 * 100) / 100
    },
    nodeVersion: process.version,
    activeProjectsCount: store.getAll().length,
    totalRequestsServed: store.getRequestCount(),
    status: 'healthy'
  };

  return res.json({
    success: true,
    data: metrics,
    timestamp: new Date().toISOString()
  });
};

export const getHealth = (_req: Request, res: Response) => {
  store.incrementRequests();
  return res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    server: 'Express / TypeScript',
    timestamp: new Date().toISOString()
  });
};
