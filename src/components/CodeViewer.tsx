import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import type { CodeSnippet } from '../types';

export const CodeViewer: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeSnippet, setActiveSnippet] = useState(0);

  const snippets: CodeSnippet[] = [
    {
      title: 'Motion Gestures & Spring',
      filename: 'SpringDragCard.tsx',
      language: 'tsx',
      code: `import { motion } from 'motion/react';

export const SpringDragCard = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 20
      }}
      className="p-6 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 backdrop-blur-xl shadow-glow-md"
    >
      <h3 className="text-lg font-bold text-white">Drag Me with Spring Physics</h3>
      <p className="text-xs text-indigo-200">Bounces naturally with mass and damping</p>
    </motion.div>
  );
};`
    },
    {
      title: 'Shared Layout Morph (layoutId)',
      filename: 'MorphModal.tsx',
      language: 'tsx',
      code: `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const MorphModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        layoutId="modal-card"
        onClick={() => setIsOpen(true)}
        className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
      >
        <motion.h4 layoutId="modal-title" className="font-bold text-white">
          Click to Morph
        </motion.h4>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              layoutId="modal-card"
              className="p-8 rounded-3xl bg-[#121826] border border-indigo-500/40 shadow-2xl max-w-md w-full"
            >
              <motion.h3 layoutId="modal-title" className="text-2xl font-bold text-white">
                Expanded View
              </motion.h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg text-white text-xs"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};`
    },
    {
      title: 'React 18 Concurrent Hook',
      filename: 'ConcurrentFilter.tsx',
      language: 'tsx',
      code: `import { useState, useTransition, useDeferredValue } from 'react';
import { motion } from 'motion/react';

export const ConcurrentFilter = ({ data }: { data: string[] }) => {
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);

  const filtered = data.filter(item => 
    item.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          startTransition(() => {
            // High CPU data filtering executes non-blockingly
          });
        }}
        placeholder="Type to filter instantly..."
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
      />
      {isPending && <span className="text-xs text-amber-400">Rendering...</span>}
    </div>
  );
};`
    }
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="code" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Developer Reference
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Production Code Snippets
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base">
            Copy-pasteable React 18 and Motion components ready for your next feature.
          </p>
        </div>

        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header File Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {snippets.map((snip, idx) => (
                <button
                  key={snip.filename}
                  onClick={() => setActiveSnippet(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    activeSnippet === idx
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{snip.filename}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleCopy(snippets[activeSnippet].code, activeSnippet)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 transition-colors cursor-pointer"
            >
              {copiedIndex === activeSnippet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-6 bg-[#080B12] overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
              <code>{snippets[activeSnippet].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
