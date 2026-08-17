import type { Request, Response } from 'express';
import { store } from '../data/store.ts';

export const getProjects = (_req: Request, res: Response) => {
  store.incrementRequests();
  const projects = store.getAll();
  return res.json({
    success: true,
    data: projects,
    count: projects.length,
    timestamp: new Date().toISOString()
  });
};

export const getProjectById = (req: Request, res: Response) => {
  store.incrementRequests();
  const { id } = req.params;
  const project = store.getById(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Project with id '${id}' not found.`,
      timestamp: new Date().toISOString()
    });
  }

  return res.json({
    success: true,
    data: project,
    timestamp: new Date().toISOString()
  });
};

export const createProject = (req: Request, res: Response) => {
  store.incrementRequests();
  const { title, category, status, stiffness, damping, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: 'Title and description are required fields.',
      timestamp: new Date().toISOString()
    });
  }

  const created = store.create({
    title: String(title),
    category: category || 'Physics',
    status: status || 'active',
    stiffness: Number(stiffness) || 300,
    damping: Number(damping) || 20,
    description: String(description)
  });

  return res.status(201).json({
    success: true,
    data: created,
    message: 'Project successfully created.',
    timestamp: new Date().toISOString()
  });
};

export const updateProject = (req: Request, res: Response) => {
  store.incrementRequests();
  const { id } = req.params;
  const updates = req.body;

  const updated = store.update(id, updates);
  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Project with id '${id}' not found for update.`,
      timestamp: new Date().toISOString()
    });
  }

  return res.json({
    success: true,
    data: updated,
    message: 'Project successfully updated.',
    timestamp: new Date().toISOString()
  });
};

export const deleteProject = (req: Request, res: Response) => {
  store.incrementRequests();
  const { id } = req.params;
  const deleted = store.delete(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: `Project with id '${id}' not found for deletion.`,
      timestamp: new Date().toISOString()
    });
  }

  return res.json({
    success: true,
    message: `Project with id '${id}' successfully deleted.`,
    timestamp: new Date().toISOString()
  });
};
