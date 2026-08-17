import React from 'react';
import { Zap, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 mt-20 py-12 px-4 sm:px-6 bg-black/40">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-glow-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">MotionStack</span>
            <p className="text-xs text-gray-400">Vite • React 18 • TypeScript • Tailwind CSS • motion/react</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            All systems operational
          </span>
          <a
            href="https://github.com/ullassk/First-project"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
