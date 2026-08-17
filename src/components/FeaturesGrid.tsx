import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, RefreshCw, Palette } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const bentoItems = [
    {
      title: 'Real-time Spring Physics',
      description: 'Motion utilizes accurate numerical integration for spring equations rather than hardcoded bezier curves, delivering organic gesture feedback.',
      icon: Cpu,
      gradient: 'from-indigo-600/20 to-purple-600/20 border-indigo-500/30',
      tag: 'Physics Core',
      span: 'md:col-span-2'
    },
    {
      title: 'Automatic Batching',
      description: 'React 18 batches all state updates inside promises, timeouts, and native event handlers for fewer renders.',
      icon: RefreshCw,
      gradient: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/30',
      tag: 'React 18 Engine',
      span: 'md:col-span-1'
    },
    {
      title: 'Strict Type-Safety',
      description: 'Full TypeScript 5.7+ setup ensuring comprehensive type definitions for Motion props, events, and variants.',
      icon: ShieldCheck,
      gradient: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/30',
      tag: 'TypeScript 5',
      span: 'md:col-span-1'
    },
    {
      title: 'Tailwind JIT & Design Tokens',
      description: 'Zero-runtime utility CSS compilation with customized brand scales, backdrop filters, and dark theme gradients.',
      icon: Palette,
      gradient: 'from-pink-600/20 to-rose-600/20 border-pink-500/30',
      tag: 'Tailwind CSS',
      span: 'md:col-span-2'
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Architectural Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Built For High-Performance Web Apps
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base">
            Engineered from ground up with modern front-end standards, accessibility, and fluid animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bentoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`glass-panel p-7 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group ${item.span}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.gradient} border`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Optimized runtime</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
