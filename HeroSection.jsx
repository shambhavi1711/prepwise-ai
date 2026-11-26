import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Bot, 
  FileText, 
  Code2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Layers,
  User
} from 'lucide-react';
import { projectDetails } from '../data/teamData';

export default function HeroSection({ userProfile, onOpenProfile, onSelectModule }) {
  const quickModules = [
    {
      id: 'interview',
      title: "AI Mock Interview",
      desc: "Simulate Technical & HR interviews with instant Ollama LLM critique.",
      icon: Bot,
      color: "from-rose-500/20 to-pink-500/10",
      borderColor: "border-rose-500/40",
      accent: "text-rose-400"
    },
    {
      id: 'resume',
      title: "Resume ATS Analyzer",
      desc: "PyMuPDF high-speed parsing, ATS match rating & keyword optimization.",
      icon: FileText,
      color: "from-indigo-500/20 to-purple-500/10",
      borderColor: "border-indigo-500/40",
      accent: "text-indigo-400"
    },
    {
      id: 'coding',
      title: "Code Complexity Evaluator",
      desc: "Algorithmic review with asymptotic Time & Space O(n) analysis.",
      icon: Code2,
      color: "from-pink-500/20 to-rose-500/10",
      borderColor: "border-pink-500/40",
      accent: "text-pink-400"
    },
    {
      id: 'planner',
      title: "Adaptive Study Planner",
      desc: "Dynamic 7-day roadmap tailored automatically to diagnosed weak areas.",
      icon: Calendar,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/40",
      accent: "text-emerald-400"
    }
  ];

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[360px] bg-rose-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-inner">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>AI-Powered Placement Platform</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Private Offline Inference via Ollama</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            PrepWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500">AI</span>
          </h1>
          <p className="mt-4 text-2xl sm:text-3xl font-semibold text-slate-200 tracking-tight">
            An Intelligent AI-Based Interview Preparation Assistant
          </p>
          <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            An AI-powered placement coach that unifies interview practice, resume analysis, coding evaluation, and personalized study planning into one intelligent platform.
          </p>

          {/* Slogan Banner */}
          <div className="mt-4 inline-block px-4 py-1.5 rounded-xl bg-slate-900/80 border border-rose-500/30 text-xs sm:text-sm font-medium text-rose-300">
            🎯 "{projectDetails.slogan}"
          </div>

          {/* Current Candidate Profile Bar */}
          <div className="mt-8 max-w-2xl mx-auto p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-slate-400 block text-[10px]">Active Candidate Profile</span>
                <span className="font-bold text-white text-xs">{userProfile.name} • <span className="text-rose-400">{userProfile.targetRole}</span></span>
              </div>
            </div>
            
            <button
              onClick={onOpenProfile}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-xl border border-rose-500/30 transition-all shrink-0"
            >
              Customize Target Role & Prep Level →
            </button>
          </div>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#modules-hub"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 transition-all group scale-100 hover:scale-[1.02]"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Interactive Modules</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#architecture"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 transition-all"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>System Architecture & Stack</span>
            </a>
          </div>
        </div>

        {/* 4 Interactive Feature Launch Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <a
                key={mod.id}
                href="#modules-hub"
                onClick={() => onSelectModule(mod.id)}
                className={`p-5 rounded-2xl bg-gradient-to-br ${mod.color} bg-slate-900/80 border ${mod.borderColor} hover:scale-[1.02] transition-all duration-300 shadow-xl group block text-left`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center ${mod.accent} shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white flex items-center gap-1">
                    Open <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {mod.desc}
                </p>
              </a>
            );
          })}
        </div>

        {/* Key Platform Value Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {projectDetails.corePillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">{pillar.title}</h5>
                <p className="text-[10px] text-slate-400 line-clamp-1">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
