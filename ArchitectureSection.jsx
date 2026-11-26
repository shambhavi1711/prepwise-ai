import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Layers, 
  Server, 
  FileCode, 
  Brain, 
  BarChart, 
  GitBranch, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { techStackData } from '../data/teamData';

export default function ArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState('ollama');

  const architectureNodes = {
    user: {
      title: "End User (Candidate / Evaluator)",
      role: "User Interaction Layer",
      desc: "Engineering students preparing for placements interact via desktop or mobile web browsers. Submits voice/text interview responses, PDF resumes, and source code.",
      specs: ["HTTP/HTTPS Requests", "File Uploads (PDF)", "Real-time SSE / WebSockets"]
    },
    react: {
      title: "React Web Interface (Tailwind CSS)",
      role: "Client-Side Frontend Layer",
      desc: "Responsive SPA built with React 19 and Tailwind CSS. Features dynamic radar charts, interactive coding playground, live mock interview simulator, and responsive slide deck presentation.",
      specs: ["Client state management", "Chart.js visualization", "Mobile-first responsive styling"]
    },
    flask: {
      title: "Flask Backend API",
      role: "RESTful Service Orchestration",
      desc: "Python Flask microservices handling authentication, session states, coordinating PyMuPDF extraction, dispatching prompt pipelines to Ollama, and persisting performance analytics into SQLite.",
      specs: ["REST Endpoints (/api/interview, /api/resume, /api/code)", "JSON serialization", "Ollama client SDK"]
    },
    sqlite: {
      title: "SQLite Database",
      role: "Relational Persistence Layer",
      desc: "Lightweight, zero-configuration embedded database storing user profiles, test sessions, ATS score history, and weakness tracking records.",
      specs: ["Zero-maintenance ACID compliance", "Fast indexed queries on candidate ID", "Audit trail for historical improvement"]
    },
    ollama: {
      title: "Ollama LLM (Llama 3 / Qwen)",
      role: "Local AI Inference Engine",
      desc: "Runs open-weights large language models locally on consumer hardware. Completely private, offline-capable, and cost-effective without cloud API billing or data leakage.",
      specs: ["Llama 3 (8B) for conversational HR/Tech grading", "Qwen 2.5 Coder for code evaluation", "Deterministic structured JSON responses"]
    },
    pymupdf: {
      title: "PyMuPDF (fitz) Document Parser",
      role: "High-Performance Document Extraction",
      desc: "Extracts textual content, layout boundaries, formatting, and structural bullet points from candidate resumes in milliseconds without loss of formatting.",
      specs: ["Sub-50ms PDF extraction speed", "Accurate font & bullet hierarchy capture", "Python PyMuPDF bindings"]
    },
    feedback: {
      title: "Feedback & Scoring Engine",
      role: "Diagnostic Synthesis Engine",
      desc: "Aggregates technical accuracy, communication scores, ATS metrics, and asymptotic complexity to output holistic scores and personalized study roadmaps.",
      specs: ["Multi-dimensional percentage scoring", "STAR method rubric grading", "7-Day dynamic curriculum scheduling"]
    }
  };

  return (
    <section id="architecture" className="py-20 relative bg-[#090D16]/70 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical System Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tools, Technologies & <span className="text-rose-400">System Architecture</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            End-to-end data flow between React frontend, Flask backend API, local Ollama LLM, PyMuPDF parser, and SQLite database.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Interactive System Data Flow</span>
                <span className="text-xs font-normal text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">Click any block to inspect</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Component architecture & bidirectional communication protocols</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Active Layer: <strong className="text-white">{architectureNodes[selectedNode].title.split(' ')[0]}</strong></span>
            </div>
          </div>

          {/* Diagram Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative">
            
            {/* 1. User */}
            <div 
              onClick={() => setSelectedNode('user')}
              className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                selectedNode === 'user' 
                  ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10 scale-[1.02]' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 mx-auto flex items-center justify-center mb-2">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white">1. End User</h4>
              <p className="text-[11px] text-slate-400 mt-1">Interacts with Interface</p>
              <div className="mt-2 text-[10px] font-mono text-rose-400">interacts with ➔</div>
            </div>

            {/* 2. React */}
            <div 
              onClick={() => setSelectedNode('react')}
              className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                selectedNode === 'react' 
                  ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10 scale-[1.02]' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center mb-2">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white">2. React Web UI</h4>
              <p className="text-[11px] text-slate-400 mt-1">Tailwind CSS + Chart.js</p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400">connects to ➔</div>
            </div>

            {/* 3. Flask */}
            <div 
              onClick={() => setSelectedNode('flask')}
              className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                selectedNode === 'flask' 
                  ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10 scale-[1.02]' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white">3. Flask Backend API</h4>
              <p className="text-[11px] text-slate-400 mt-1">Python RESTful Router</p>
              <div className="mt-2 text-[10px] font-mono text-emerald-400">communicates with ➔</div>
            </div>

            {/* 4. Processing Engines (Ollama + PyMuPDF + SQLite) */}
            <div className="grid grid-cols-1 gap-2">
              <div 
                onClick={() => setSelectedNode('ollama')}
                className={`cursor-pointer p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                  selectedNode === 'ollama' 
                    ? 'bg-rose-950/40 border-rose-500' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Brain className="w-4 h-4 text-purple-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Ollama LLM</div>
                  <div className="text-[10px] text-slate-400">Llama 3 / Qwen</div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedNode('pymupdf')}
                className={`cursor-pointer p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                  selectedNode === 'pymupdf' 
                    ? 'bg-rose-950/40 border-rose-500' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">PyMuPDF</div>
                  <div className="text-[10px] text-slate-400">Resume Parser</div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedNode('sqlite')}
                className={`cursor-pointer p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                  selectedNode === 'sqlite' 
                    ? 'bg-rose-950/40 border-rose-500' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Database className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">SQLite DB</div>
                  <div className="text-[10px] text-slate-400">Profiles & Scores</div>
                </div>
              </div>
            </div>

          </div>

          {/* Return Feedback Loop Bar */}
          <div 
            onClick={() => setSelectedNode('feedback')}
            className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
              selectedNode === 'feedback' 
                ? 'bg-rose-950/50 border-rose-500' 
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-mono text-rose-400">◀── produces ──</span>
              <span className="text-xs font-bold text-white uppercase tracking-wider bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
                Feedback & Scores Engine
              </span>
              <span className="text-xs font-mono text-rose-400">── returned to User ──▶</span>
            </div>
          </div>

          {/* Node Inspector Detail Card */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 mb-3 gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">{architectureNodes[selectedNode].role}</span>
                <h4 className="text-base font-bold text-white">{architectureNodes[selectedNode].title}</h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                Component Inspector
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {architectureNodes[selectedNode].desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {architectureNodes[selectedNode].specs.map((spec, sIdx) => (
                <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-rose-400" />
                  <span>{spec}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-rose-400">Engineering Foundation</span>
            <h3 className="text-2xl font-bold text-white mt-1">Platform Technology Stack</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStackData.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider">{item.category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                  {item.tech}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
