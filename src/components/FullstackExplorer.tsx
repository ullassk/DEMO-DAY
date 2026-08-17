import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, 
  Database, 
  Activity, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Sliders,
  Send,
  Zap
} from 'lucide-react';
import { api } from '../services/api';
import type { ProjectItem, SystemMetrics } from '../../server/types';

export const FullstackExplorer: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Physics' | 'Layout' | 'Keyframes' | 'Concurrent' | 'Fullstack'>('Fullstack');
  const [newDesc, setNewDesc] = useState('');
  const [newStiffness, setNewStiffness] = useState(350);
  const [newDamping, setNewDamping] = useState(25);

  const fetchAllData = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const health = await api.getHealth();
      const end = performance.now();
      setLatency(Math.round(end - start));
      if (health.status === 'ok') {
        setServerStatus('online');
      }

      const [metricsRes, projectsRes] = await Promise.all([
        api.getMetrics(),
        api.getProjects(),
      ]);

      if (metricsRes.data) setMetrics(metricsRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
    } catch {
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    try {
      const res = await api.createProject({
        title: newTitle,
        category: newCategory,
        status: 'active',
        stiffness: newStiffness,
        damping: newDamping,
        description: newDesc,
      });

      if (res.data) {
        setProjects(prev => [res.data!, ...prev]);
        setNewTitle('');
        setNewDesc('');
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <section id="fullstack" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Server className="w-3.5 h-3.5" />
            <span>Full-Stack REST Bridge & Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Node.js Express + React 18 Live Integration
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base">
            Perform live CRUD requests directly against the Express backend with real-time memory metrics and motion-animated responses.
          </p>
        </div>

        {/* Server Status & Metrics HUD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Status Indicator */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-gray-400 uppercase">Backend Server</span>
              <div className="flex items-center gap-2 mt-1">
                {serverStatus === 'online' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">Online (Port 5000)</span>
                  </>
                ) : serverStatus === 'checking' ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                    <span className="font-bold text-amber-400 text-sm">Connecting...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-rose-400 text-sm">Offline</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>
          </div>

          {/* Latency */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-mono text-gray-400 uppercase">API Latency</span>
            <div className="flex items-center gap-2 mt-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white text-sm">{latency !== null ? `${latency} ms` : '--'}</span>
            </div>
          </div>

          {/* Heap Memory */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-mono text-gray-400 uppercase">Heap Memory</span>
            <div className="flex items-center gap-2 mt-1">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-white text-sm">
                {metrics ? `${metrics.memoryUsageMb.heapUsed} MB / ${metrics.memoryUsageMb.heapTotal} MB` : '--'}
              </span>
            </div>
          </div>

          {/* Requests Served */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <span className="text-[11px] font-mono text-gray-400 uppercase">Total API Hits</span>
            <div className="flex items-center gap-2 mt-1">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-sm">{metrics ? `${metrics.totalRequestsServed} calls` : '--'}</span>
            </div>
          </div>
        </div>

        {/* Live CRUD Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Item Form */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <Plus className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Create New Record</h3>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Velocity Gesture Card"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#121826] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 font-sans"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Layout">Layout</option>
                    <option value="Keyframes">Keyframes</option>
                    <option value="Concurrent">Concurrent</option>
                    <option value="Fullstack">Fullstack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Description</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Brief description of the motion / data item..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[10px] font-mono text-gray-400">Stiffness: {newStiffness}</span>
                    <input
                      type="range"
                      min="100"
                      max="600"
                      step="20"
                      value={newStiffness}
                      onChange={(e) => setNewStiffness(Number(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-gray-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-400">Damping: {newDamping}</span>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="2"
                      value={newDamping}
                      onChange={(e) => setNewDamping(Number(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-gray-700 rounded-lg"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-glow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>POST to /api/projects</span>
                </motion.button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-gray-500">
              Auto-persists in backend Memory Store
            </div>
          </div>

          {/* Database Items List */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-white text-sm">Server Database Store ({projects.length} items)</h3>
                </div>
                <span className="text-[11px] font-mono text-gray-400">GET /api/projects</span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {projects.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 flex items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                            {item.category}
                          </span>
                          <span className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Sliders className="w-3 h-3 text-indigo-400" />
                            Stiff: {item.stiffness} | Damp: {item.damping}
                          </span>
                          <span>ID: {item.id}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/5 transition-colors cursor-pointer"
                        title="Delete from server"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>Status: Synchronized with Express</span>
              <span>Proxy: /api → localhost:5000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
