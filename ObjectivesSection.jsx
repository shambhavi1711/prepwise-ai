import React, { useState } from 'react';
import { 
  Target, 
  Lightbulb, 
  Layers, 
  Bot, 
  Activity, 
  Map, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Sparkles,
  Search,
  SlidersHorizontal
} from 'lucide-react';

export default function ObjectivesSection() {
  const [activeView, setActiveView] = useState('objectives');

  const objectives = [
    {
      num: "01",
      title: "Unified Platform",
      desc: "Develop an AI-powered platform integrating multiple placement preparation activities — interviews, coding, resume analysis, and study planning.",
      metric: "Single Dashboard",
      icon: Layers,
      color: "from-rose-500/20 to-pink-500/10",
      borderColor: "border-rose-500/30",
      iconColor: "text-rose-400"
    },
    {
      num: "02",
      title: "AI Mock Interviews",
      desc: "Conduct AI-based technical and HR mock interviews with intelligent, contextual feedback on student responses.",
      metric: "Real-time STAR Feedback",
      icon: Bot,
      color: "from-pink-500/20 to-fuchsia-500/10",
      borderColor: "border-pink-500/30",
      iconColor: "text-pink-400"
    },
    {
      num: "03",
      title: "Performance Analysis",
      desc: "Analyze student performance to identify strengths, weaknesses, and specific areas requiring improvement.",
      metric: "Weakness Pinpointing",
      icon: Activity,
      color: "from-fuchsia-500/20 to-indigo-500/10",
      borderColor: "border-fuchsia-500/30",
      iconColor: "text-fuchsia-400"
    },
    {
      num: "04",
      title: "Personalized Roadmap",
      desc: "Generate adaptive preparation plans tailored to each student's performance data and target role.",
      metric: "Dynamic 7-Day Plan",
      icon: Map,
      color: "from-indigo-500/20 to-rose-500/10",
      borderColor: "border-indigo-500/30",
      iconColor: "text-indigo-400"
    }
  ];

  const innovations = [
    {
      title: "AI Interviewer",
      tagline: "Contextual Conversational Simulation",
      desc: "Simulates real technical and HR interviewers, evaluating responses contextually rather than matching simple string keywords.",
      icon: Bot
    },
    {
      title: "Weakness Detection",
      tagline: "Algorithmic Error Diagnosis",
      desc: "Analyzes past performance across coding, resume, and interview history to pinpoint exact topics needing more practice.",
      icon: Search
    },
    {
      title: "Adaptive Preparation",
      tagline: "Dynamic Difficulty Adjustment",
      desc: "Questions and recommendations adjust dynamically based on prior results and mastery levels, ensuring efficient revision.",
      icon: SlidersHorizontal
    },
    {
      title: "Unified Platform",
      tagline: "Zero Context-Switching",
      desc: "Resume analysis, mock interviews, coding evaluation, and planning synthesized into one intelligent system.",
      icon: Layers
    }
  ];

  return (
    <section id="objectives" className="py-20 relative bg-[#090D16]/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Target className="w-3.5 h-3.5" />
              <span>Project Capabilities & Innovation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Platform Goals & <span className="text-rose-400">Core Innovations</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              How PrepWise AI defines rigorous engineering milestones and delivers breakthrough value for student placement readiness.
            </p>
          </div>

          {/* Toggle pill */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveView('objectives')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeView === 'objectives' 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Project Objectives</span>
            </button>
            <button
              onClick={() => setActiveView('innovation')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeView === 'innovation' 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Originality & Innovation</span>
            </button>
          </div>
        </div>

        {/* Objectives View */}
        {activeView === 'objectives' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 rounded-3xl bg-gradient-to-br ${obj.color} bg-slate-900/90 border ${obj.borderColor} shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center ${obj.iconColor} group-hover:scale-110 transition-transform shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-extrabold text-slate-700 group-hover:text-rose-500/40 transition-colors">
                      {obj.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                    {obj.title}
                  </h3>
                  
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {obj.desc}
                  </p>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target Outcome:</span>
                    <span className="font-semibold text-rose-300 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      {obj.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Innovation View */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {innovations.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 hover:border-rose-400 shadow-xl transition-all duration-300 group hover:-translate-y-1 relative"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-rose-300 transition-colors">
                      {item.title}
                    </h4>
                    <span className="inline-block text-[11px] font-mono text-rose-400/90 mb-2">
                      {item.tagline}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Value Addition Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/40 border border-rose-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Core Value Addition</span>
                  <p className="text-base sm:text-lg font-semibold text-white mt-0.5">
                    "PrepWise AI transforms preparation from a generic Q&A process into a personalized, performance-driven learning experience."
                  </p>
                </div>
              </div>
              <a
                href="#modules-hub"
                className="shrink-0 px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md"
              >
                Experience Live Engines →
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
