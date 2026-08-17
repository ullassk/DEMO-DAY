import React from 'react';
import { motion, type Variants } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Terminal, Flame, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#06b6d4', '#ec4899']
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:border-indigo-500/40 transition-colors shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-300">
                Production-Ready Stack • <span className="text-indigo-400 font-semibold">Motion 12 + React 18</span>
              </span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl text-white mb-6"
          >
            Craft fluid UI with{' '}
            <span className="gradient-text">React 18</span> &{' '}
            <span className="gradient-text-cyan">Motion/React</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-xl text-gray-300/90 max-w-2xl font-normal leading-relaxed mb-10"
          >
            Supercharge your frontend with ultra-responsive physics animations, type-safe components, atomic Tailwind CSS utility styling, and blazing fast Vite HMR.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 w-full"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                triggerCelebration();
                onExplore();
              }}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-glow-md border border-indigo-300/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Explore Interactive Lab</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.96 }}
              href="#code"
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-medium text-sm sm:text-base flex items-center gap-2 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>View Code Samples</span>
            </motion.a>
          </motion.div>

          {/* Features Highlights Checklist */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-14 pt-8 border-t border-white/10 w-full max-w-3xl"
          >
            {[
              { text: 'Vite 6 Fast HMR', color: 'text-cyan-400' },
              { text: 'React 18 Concurrent', color: 'text-indigo-400' },
              { text: 'Tailwind CSS v3', color: 'text-sky-400' },
              { text: 'motion/react 12', color: 'text-purple-400' },
            ].map((pill, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                <CheckCircle2 className={`w-4 h-4 ${pill.color}`} />
                <span className="text-xs font-mono font-medium text-gray-300">{pill.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
