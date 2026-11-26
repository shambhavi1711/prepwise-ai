import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ExternalLink, 
  Heart, 
  CheckCircle2, 
  FileText, 
  GitBranch, 
  Award,
  Info
} from 'lucide-react';
import { projectDetails, teamMembers } from '../data/teamData';

export default function Footer({ onOpenProjectInfo }) {
  const references = [
    { title: "React 19 & Tailwind CSS v4 Documentation", category: "Frontend Framework" },
    { title: "Flask 3.0 Web Development & REST Architecture", category: "Python Backend" },
    { title: "Ollama: High-Performance Local Large Language Model Runtime (Llama 3 & Qwen)", category: "Inference Engine" },
    { title: "PyMuPDF (fitz) Structured PDF Text & Formatting Parser", category: "Document Processing" },
    { title: "Chart.js 4.0 Interactive Data Visualization Library", category: "Analytics Visualization" },
    { title: "IEEE Transactions on Learning Technologies: AI-driven formative feedback and adaptive student evaluation pipelines", category: "Academic Research" }
  ];

  return (
    <footer className="relative bg-[#070A11] border-t border-slate-800/80 pt-20 pb-12 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Conclusion Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border border-rose-500/30 shadow-2xl mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Platform Summary</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            "PrepWise AI — Prepare Smarter, Practice Better, Perform Better."
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            PrepWise AI proposes an intelligent, personalized approach to interview preparation. By integrating AI-powered mock interviews, resume analysis, coding evaluation, and progress tracking, it helps students prepare more effectively for placements and internships.
          </p>

          {/* 4 Pillars */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {[
              { emoji: "🎯", label: "Personalized", desc: "Tailored to weaknesses" },
              { emoji: "🤖", label: "AI-Powered", desc: "Ollama LLM feedback" },
              { emoji: "📊", label: "Trackable", desc: "Continuous monitoring" },
              { emoji: "🚀", label: "Unified", desc: "All-in-one platform" },
            ].map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xl mb-1">{p.emoji}</div>
                <div className="text-xs font-bold text-white">{p.label}</div>
                <div className="text-[11px] text-slate-400">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#modules-hub"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              Start Placement Practice
            </a>
            
            <button
              onClick={onOpenProjectInfo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-rose-400" />
              <span>Project & Team Details</span>
            </button>
          </div>
        </div>

        {/* References Section */}
        <div className="mb-16 pt-10 border-t border-slate-800/80">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Technical Standards & Research Citations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {references.map((ref, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                <span className="font-mono text-xs text-rose-400 font-bold mt-0.5">[{idx + 1}]</span>
                <div>
                  <h4 className="text-xs font-medium text-slate-200">{ref.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{ref.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team & Supervisor Bottom Summary */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span>{projectDetails.name}</span>
              <span className="text-rose-400 font-normal">| {projectDetails.groupNo}</span>
              <span className="text-slate-500 font-normal">• {projectDetails.branch}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Supervisor: <strong>{projectDetails.supervisor}</strong> • Developed by Alisha Hayaat, Shambhavi Shukla, Snigdha, Adarsh Nayak
            </p>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            <div>B.Tech AI&ML Mini Project Implementation</div>
            <div className="text-slate-600 mt-0.5">© 2026 PrepWise AI Team • Open Source Academic Defense</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
