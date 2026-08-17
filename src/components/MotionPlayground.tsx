import React, { useState, useTransition, useDeferredValue } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Move, 
  Maximize2, 
  Sparkles, 
  Sliders, 
  Play, 
  RotateCcw, 
  Zap, 
  Check, 
  X, 
  Search,
  Volume2
} from 'lucide-react';

export const MotionPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'spring' | 'layout' | 'keyframes' | 'concurrent'>('spring');

  // Spring & Drag State
  const [springStiffness, setSpringStiffness] = useState(300);
  const [springDamping, setSpringDamping] = useState(20);
  const [dragKey, setDragKey] = useState(0);

  // Layout Animation State
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Keyframes Wave State
  const [isPlayingWave, setIsPlayingWave] = useState(true);

  // React 18 Concurrent Search State
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const sampleCards = [
    {
      id: 'card-1',
      title: 'Neural Engine Architecture',
      subtitle: 'React 18 Concurrent State',
      tag: 'Concurrent Mode',
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      description: 'React 18 introduces concurrent rendering without blocking the main UI thread. Transitions yield execution to keep animations responsive.',
      details: 'With startTransition and useDeferredValue, resource-heavy calculations or data filtering occur in the background while high-priority gestures (like typing or dragging) remain buttery smooth at 120 FPS.'
    },
    {
      id: 'card-2',
      title: 'Spring Physics Engine',
      subtitle: 'Motion 12 Spring Dynamics',
      tag: 'Physics & Damp',
      tagColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
      description: 'Realistic momentum and inertia based calculations replace rigid cubic-bezier curves for lifelike interaction responses.',
      details: 'Configurable mass, stiffness, damping, and initial velocity allow UI components to snap naturally to resting positions without artificial delays or stutter.'
    },
    {
      id: 'card-3',
      title: 'Morphing Shared Layouts',
      subtitle: 'LayoutId Continuous Fluidity',
      tag: 'Layout Animations',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      description: 'Smoothly morph elements between disparate DOM positions and dimensions without manual coordinate calculations.',
      details: 'By assigning matching layoutId strings across components, Motion computes bounding boxes and performs FLIP animations automatically across component unmounts.'
    }
  ];

  const itemsList = [
    { id: '1', name: 'Gesture Recognizer', category: 'Motion Hooks', latency: '0.2ms' },
    { id: '2', name: 'LayoutId Shared Morph', category: 'FLIP Engine', latency: '0.4ms' },
    { id: '3', name: 'Concurrent Fiber Root', category: 'React 18', latency: '0.1ms' },
    { id: '4', name: 'Tailwind Arbitrary Variants', category: 'Styling', latency: '0.0ms' },
    { id: '5', name: 'Vite Rollup Tree Shaker', category: 'Build Optimizer', latency: '0.5ms' },
    { id: '6', name: 'Spring Mass Oscillator', category: 'Physics', latency: '0.3ms' },
    { id: '7', name: 'Automatic Batching Hub', category: 'React 18', latency: '0.1ms' },
    { id: '8', name: 'Dynamic Keyframe Oscillator', category: 'Animations', latency: '0.2ms' },
  ];

  const filteredItems = itemsList.filter(item =>
    item.name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <section id="playground" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Motion & React 18 Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Live Motion Playground
          </h2>
          <p className="text-gray-400 max-w-xl text-sm sm:text-base">
            Interact with real physics, shared layout transitions, concurrent hooks, and SVG animation loops.
          </p>
        </div>

        {/* Lab Container */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 bg-black/40 overflow-x-auto p-2 gap-2">
            {[
              { id: 'spring', label: '1. Spring & Drag Physics', icon: Move },
              { id: 'layout', label: '2. Shared Layout Morph (layoutId)', icon: Maximize2 },
              { id: 'keyframes', label: '3. Keyframe & Wave Loops', icon: Sparkles },
              { id: 'concurrent', label: '4. React 18 Concurrent Transitions', icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-sm' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Playground Body */}
          <div className="p-6 sm:p-10 min-h-[460px] flex flex-col justify-center bg-gradient-to-b from-transparent to-black/20">
            {/* TAB 1: Spring & Drag Physics */}
            {activeTab === 'spring' && (
              <motion.div 
                key="spring-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
              >
                {/* Interactive Physics Canvas */}
                <div className="lg:col-span-2 relative h-72 sm:h-80 bg-black/40 rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-4 text-[11px] font-mono text-gray-500">
                    BOUNDARY CONSTRAINTS ACTIVE • DRAG THE ORB ANYWHERE
                  </div>

                  <motion.div
                    key={dragKey}
                    drag
                    dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
                    dragElastic={0.2}
                    whileHover={{ scale: 1.1, cursor: 'grab' }}
                    whileDrag={{ scale: 1.18, cursor: 'grabbing', boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' }}
                    dragTransition={{
                      bounceStiffness: springStiffness,
                      bounceDamping: springDamping,
                      power: 0.3
                    }}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 shadow-glow-md flex flex-col items-center justify-center text-white font-bold text-center select-none cursor-grab border border-white/30 backdrop-blur-md"
                  >
                    <Move className="w-6 h-6 mb-1 text-white animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider uppercase">Drag Me</span>
                  </motion.div>

                  <div className="absolute bottom-3 right-4 flex items-center gap-2">
                    <button
                      onClick={() => setDragKey(k => k + 1)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Position</span>
                    </button>
                  </div>
                </div>

                {/* Physics Tuning Panel */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-bold text-white text-sm">Spring Parameters</h3>
                  </div>

                  {/* Stiffness Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Stiffness</span>
                      <span className="text-indigo-400 font-bold">{springStiffness}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      step="20"
                      value={springStiffness}
                      onChange={(e) => setSpringStiffness(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-gray-700 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Damping Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">Damping (Friction)</span>
                      <span className="text-purple-400 font-bold">{springDamping}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="2"
                      value={springDamping}
                      onChange={(e) => setSpringDamping(Number(e.target.value))}
                      className="w-full accent-purple-500 bg-gray-700 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-gray-300 font-mono leading-relaxed">
                    <code>{`dragTransition={{ bounceStiffness: ${springStiffness}, bounceDamping: ${springDamping} }}`}</code>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: Shared Layout Morph */}
            {activeTab === 'layout' && (
              <motion.div
                key="layout-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="text-xs text-gray-400 font-mono">
                  CLICK ANY CARD TO EXPAND WITH SEAMLESS <code>layoutId</code> FLIP MORPHING:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sampleCards.map((card) => (
                    <motion.div
                      key={card.id}
                      layoutId={`card-container-${card.id}`}
                      onClick={() => setSelectedCardId(card.id)}
                      whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.5)' }}
                      className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer flex flex-col justify-between group hover:shadow-glow-sm transition-shadow"
                    >
                      <div>
                        <motion.div 
                          layoutId={`card-tag-${card.id}`}
                          className={`inline-block text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${card.tagColor}`}
                        >
                          {card.tag}
                        </motion.div>
                        <motion.h4 
                          layoutId={`card-title-${card.id}`} 
                          className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors mb-1"
                        >
                          {card.title}
                        </motion.h4>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {card.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-indigo-400 font-semibold">
                        <span>Click to expand</span>
                        <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Expanded Modal Overlay */}
                <AnimatePresence>
                  {selectedCardId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                      {sampleCards
                        .filter(c => c.id === selectedCardId)
                        .map(card => (
                          <motion.div
                            key={card.id}
                            layoutId={`card-container-${card.id}`}
                            className="w-full max-w-lg glass-panel bg-[#111625] p-7 rounded-3xl border border-indigo-500/40 shadow-2xl relative"
                          >
                            <button
                              onClick={() => setSelectedCardId(null)}
                              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>

                            <motion.div 
                              layoutId={`card-tag-${card.id}`}
                              className={`inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full border mb-4 ${card.tagColor}`}
                            >
                              {card.tag}
                            </motion.div>

                            <motion.h3 
                              layoutId={`card-title-${card.id}`} 
                              className="text-2xl font-extrabold text-white mb-2"
                            >
                              {card.title}
                            </motion.h3>

                            <p className="text-sm text-indigo-300 font-medium mb-4">
                              {card.subtitle}
                            </p>

                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                              {card.description}
                            </p>

                            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 leading-relaxed mb-6 font-sans">
                              {card.details}
                            </div>

                            <button
                              onClick={() => setSelectedCardId(null)}
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-glow-sm hover:from-indigo-600 hover:to-purple-700 transition-all cursor-pointer"
                            >
                              Close Morph Modal
                            </button>
                          </motion.div>
                        ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* TAB 3: Keyframes & Wave Loops */}
            {activeTab === 'keyframes' && (
              <motion.div
                key="keyframes-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* SVG Visualizer Canvas */}
                <div className="h-72 bg-black/50 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={isPlayingWave ? {
                          height: [16, Math.sin(i * 0.8) * 45 + 50, 16],
                          backgroundColor: [
                            '#6366f1',
                            '#a855f7',
                            '#06b6d4',
                            '#6366f1'
                          ]
                        } : { height: 16 }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.08,
                          ease: "easeInOut"
                        }}
                        className="w-2.5 rounded-full bg-indigo-500"
                      />
                    ))}
                  </div>

                  {/* Rotating Multi-axis Gyroscope */}
                  <motion.div
                    animate={isPlayingWave ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400/40 flex items-center justify-center"
                  >
                    <motion.div
                      animate={isPlayingWave ? { rotate: -360, scale: [1, 1.15, 1] } : { rotate: 0 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500/40 to-pink-500/40 border border-purple-400/50 flex items-center justify-center"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                    </motion.div>
                  </motion.div>

                  <button
                    onClick={() => setIsPlayingWave(!isPlayingWave)}
                    className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    {isPlayingWave ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-gray-300" />}
                    <span>{isPlayingWave ? 'Pause Visualizer' : 'Resume Visualizer'}</span>
                  </button>
                </div>

                {/* Info Card */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <span>Infinite Keyframe Sequences</span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Motion enables multi-stage keyframe animations by passing arrays directly to animation properties:
                  </p>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-indigo-300">
                    <pre className="overflow-x-auto">
{`animate={{
  height: [16, 80, 16],
  backgroundColor: ['#6366f1', '#a855f7', '#06b6d4']
}}
transition={{
  repeat: Infinity,
  duration: 1.2,
  ease: "easeInOut"
}}`}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: React 18 Concurrent Transitions */}
            {activeTab === 'concurrent' && (
              <motion.div
                key="concurrent-tab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter concurrent items..."
                      value={query}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQuery(val);
                        startTransition(() => {
                          // non-blocking transition update
                        });
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 rounded-xl border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-gray-400">Status:</span>
                    {isPending ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <span className="animate-spin">⏳</span> Transition Pending
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Concurrent Idle (0ms lag)
                      </span>
                    )}
                  </div>
                </div>

                {/* Staggered Animated List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <AnimatePresence>
                    {filteredItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400">{item.latency}</span>
                        </div>
                        <div className="font-semibold text-white text-xs">{item.name}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
