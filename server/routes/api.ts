import { Router } from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.ts';
import { getSystemMetrics, getHealth } from '../controllers/metricsController.ts';

export const router = Router();

// Health & System Metrics
router.get('/health', getHealth);
router.get('/metrics', getSystemMetrics);

// Projects CRUD REST Endpoints
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
