import type { ProjectItem } from '../types.ts';

class DataStore {
  private projects: Map<string, ProjectItem> = new Map();
  private requestCounter: number = 0;

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    const seed: ProjectItem[] = [
      {
        id: 'proj-1',
        title: 'Spring Kinetic Interface',
        category: 'Physics',
        status: 'active',
        stiffness: 350,
        damping: 25,
        description: 'Ultra-low latency spring dynamics tuned for gesture dragging and momentum flicks.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'proj-2',
        title: 'FLIP Shared Element Transition',
        category: 'Layout',
        status: 'active',
        stiffness: 400,
        damping: 30,
        description: 'Automatic bounding-box morphing across navigation routes using motion layoutId.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'proj-3',
        title: 'Concurrent Data Stream Pipe',
        category: 'Concurrent',
        status: 'active',
        stiffness: 280,
        damping: 18,
        description: 'React 18 useTransition background filtering with zero main-thread blockage.',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'proj-4',
        title: 'Express Fullstack REST Bridge',
        category: 'Fullstack',
        status: 'experimental',
        stiffness: 500,
        damping: 35,
        description: 'End-to-end type-safe API communication between Node.js Express backend and React 18 client.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    seed.forEach(item => this.projects.set(item.id, item));
  }

  public getAll(): ProjectItem[] {
    return Array.from(this.projects.values());
  }

  public getById(id: string): ProjectItem | undefined {
    return this.projects.get(id);
  }

  public create(item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>): ProjectItem {
    const id = `proj-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();
    const newProject: ProjectItem = {
      ...item,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  public update(id: string, updates: Partial<Omit<ProjectItem, 'id' | 'createdAt'>>): ProjectItem | null {
    const existing = this.projects.get(id);
    if (!existing) return null;

    const updated: ProjectItem = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.projects.set(id, updated);
    return updated;
  }

  public delete(id: string): boolean {
    return this.projects.delete(id);
  }

  public incrementRequests() {
    this.requestCounter++;
  }

  public getRequestCount(): number {
    return this.requestCounter;
  }
}

export const store = new DataStore();
