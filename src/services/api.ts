import type { ProjectItem, SystemMetrics, ApiResponse } from '../../server/types.ts';

const API_BASE = '/api';

export const api = {
  async getHealth(): Promise<{ status: string; server: string; timestamp: string }> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  async getMetrics(): Promise<ApiResponse<SystemMetrics>> {
    const res = await fetch(`${API_BASE}/metrics`);
    if (!res.ok) throw new Error('Failed to fetch system metrics');
    return res.json();
  },

  async getProjects(): Promise<ApiResponse<ProjectItem[]>> {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async createProject(project: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ProjectItem>> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  async updateProject(id: string, updates: Partial<ProjectItem>): Promise<ApiResponse<ProjectItem>> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },
};
