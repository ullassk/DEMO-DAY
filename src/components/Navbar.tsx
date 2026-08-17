import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Github, Zap } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'stack', label: 'Tech Stack' },
    { id: 'playground', label: 'Interactive Lab' },
    { id: 'fullstack', label: 'Full-Stack API' },
    { id: 'features', label: 'Bento Grid' },
    { id: 'code', label: 'Code Snippets' },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 pt-4 pb-2">
      <motion.nav 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto glass-panel rounded-2xl px-4 py-3 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); setActiveSection('hero'); }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
              <span>Motion</span>
              <span className="text-indigo-400">Stack</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Full-Stack
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono hidden sm:block">Vite + React 18 + Express TS</p>
          </div>
        </a>

        {/* Desktop Nav Items with Morphing Indicator */}
        <div className="hidden md:flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-lg shadow-sm border border-indigo-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/ullassk/First-project"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('playground');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-xs font-semibold text-white shadow-glow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Lab</span>
          </motion.button>
        </div>
      </motion.nav>
    </header>
  );
};
