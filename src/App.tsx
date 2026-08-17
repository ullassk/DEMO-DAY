import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { MotionPlayground } from './components/MotionPlayground';
import { FullstackExplorer } from './components/FullstackExplorer';
import { FeaturesGrid } from './components/FeaturesGrid';
import { CodeViewer } from './components/CodeViewer';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F3F4F6] relative selection:bg-indigo-500 selection:text-white">
      {/* Background Radial Glow Mesh */}
      <div className="fixed inset-0 bg-mesh pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Navigation */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={scrollToSection} 
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onExplore={() => scrollToSection('playground')} />
        <TechStack />
        <MotionPlayground />
        <FullstackExplorer />
        <FeaturesGrid />
        <CodeViewer />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
