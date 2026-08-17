import React from 'react';
import { motion } from 'motion/react';
import { Zap, Atom, Code2, Palette, Activity, Layers, ExternalLink } from 'lucide-react';
import type { TechItem } from '../types';

export const TechStack: React.FC = () => {
  const techList: TechItem[] = [
    {
      name: 'Vite',
      category: 'Build Engine',
      version: '^6.1.0',
      description: 'Lightning-fast Next Generation Frontend Tooling with instant esbuild compilation and instant HMR.',
      icon: 'zap',
      color: 'from-amber-500/20 to-purple-500/20 text-amber-400 border-amber-500/30',
      docsUrl: 'https://vite.dev',
    },
    {
      name: 'React 18',
      category: 'UI Core',
      version: '^18.3.1',
      description: 'Concurrent rendering engine with useTransition, useDeferredValue, and automatic batching.',
      icon: 'atom',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      docsUrl: 'https://react.dev',
    },
    {
      name: 'TypeScript',
      category: 'Language',
      version: '^5.7.2',
      description: 'Strict static type definitions, robust interfaces, type inference, and seamless IDE intellisense.',
      icon: 'code2',
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      docsUrl: 'https://www.typescriptlang.org',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling',
      version: '^3.4.17',
      description: 'Utility-first CSS framework with tailored tokens, dark-mode support, and modern glassmorphism.',
      icon: 'palette',
      color: 'from-sky-500/20 to-teal-500/20 text-sky-400 border-sky-500/30',
      docsUrl: 'https://tailwindcss.com',
    },
    {
      name: 'motion/react',
      category: 'Animation Engine',
      version: '^12.4.7',
      description: 'Production-ready spring physics, gesture recognition, morphing layout IDs, and scroll triggers.',
      icon: 'activity',
      color: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400 border-fuchsia-500/30',
      docsUrl: 'https://motion.dev',
    },
    {
      name: 'Lucide Icons',
      category: 'Icons',
      version: '^0.475.0',
      description: 'Clean, customizable, feather-weight SVG icon library designed for modern interfaces.',
      icon: 'layers',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      docsUrl: 'https://lucide.dev',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'atom': return <Atom className="w-6 h-6" />;
      case 'code2': return <Code2 className="w-6 h-6" />;
      case 'palette': return <Palette className="w-6 h-6" />;
      case 'activity': return <Activity className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section id="stack" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Engineered Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Core Technologies & Tooling
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base">
            Every library in this template has been hand-selected and tuned for peak developer experience and UI performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techList.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/40 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle card glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} border shadow-inner`}>
                    {getIcon(item.icon)}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    <span>{item.version}</span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-300/80 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <a
                href={item.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/link mt-auto pt-4 border-t border-white/5"
              >
                <span>Documentation</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
