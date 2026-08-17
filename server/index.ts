import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as apiRoutes } from './routes/api.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger middleware
app.use((req, _res, next) => {
  const start = Date.now();
  _res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} - ${_res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'MotionStack Fullstack Backend API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      metrics: '/api/metrics',
      projects: '/api/projects'
    }
  });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Fullstack Backend Server listening on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Metrics API: http://localhost:${PORT}/api/metrics`);
});
