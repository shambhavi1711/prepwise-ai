import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemGapSection from './components/ProblemGapSection';
import SolutionPipeline from './components/SolutionPipeline';
import ObjectivesSection from './components/ObjectivesSection';
import ModulesDemoSection from './components/ModulesDemoSection';
import ArchitectureSection from './components/ArchitectureSection';
import FutureRoadmapSection from './components/FutureRoadmapSection';
import Footer from './components/Footer';
import UserProfileModal from './components/UserProfileModal';
import ProjectInfoModal from './components/ProjectInfoModal';
import { ArrowUp, Sparkles, Terminal } from 'lucide-react';

function App() {
  const [activeModuleTab, setActiveModuleTab] = useState('interview');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProjectInfoModalOpen, setIsProjectInfoModalOpen] = useState(false);

  // Candidate profile state (Module 01: Stores student info, target role, and preparation preferences)
  const [userProfile, setUserProfile] = useState({
    name: "Shambhavi Shukla",
    targetRole: "Full Stack SDE Intern",
    targetCompanyTier: "Tier-1 Product (Google, Microsoft, Amazon)",
    prepLevel: "Intermediate"
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModuleFromHero = (moduleId) => {
    setActiveModuleTab(moduleId);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Sticky App Header */}
      <Navbar 
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenProjectInfo={() => setIsProjectInfoModalOpen(true)}
        userProfile={userProfile}
      />

      {/* Main Platform Content */}
      <main className="flex-1">
        {/* Product Hero */}
        <HeroSection 
          userProfile={userProfile}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onSelectModule={handleSelectModuleFromHero}
        />

        {/* 4 Interactive Functional Modules Hub */}
        <ModulesDemoSection 
          activeTab={activeModuleTab}
          setActiveTab={setActiveModuleTab}
          userProfile={userProfile}
        />

        {/* 4-Stage Workflow Pipeline */}
        <SolutionPipeline />

        {/* Challenges & Gap Analysis */}
        <ProblemGapSection />

        {/* System Architecture & Tech Stack */}
        <ArchitectureSection />

        {/* Objectives & Innovation */}
        <ObjectivesSection />

        {/* Scope & Future Enhancements */}
        <FutureRoadmapSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenProjectInfo={() => setIsProjectInfoModalOpen(true)}
      />

      {/* Candidate Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={(updated) => setUserProfile(updated)}
      />

      {/* Project & Team Details Modal (for Examiner / Viva Evaluation) */}
      <ProjectInfoModal
        isOpen={isProjectInfoModalOpen}
        onClose={() => setIsProjectInfoModalOpen(false)}
      />

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <a
          href="#modules-hub"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-2xl shadow-rose-600/40 border border-rose-400/30 transition-all hover:scale-105 group"
          title="Jump to Practice Engines"
        >
          <Terminal className="w-4 h-4" />
          <span>Launch Engines</span>
        </a>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 shadow-lg transition-all hover:scale-105 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export default App;
