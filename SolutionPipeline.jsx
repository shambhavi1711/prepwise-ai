import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  Sliders, 
  BrainCircuit, 
  BarChart, 
  Compass,
  FileCheck2,
  Code2,
  Mic2
} from 'lucide-react';

export default function SolutionPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: 1,
      title: "Select Module",
      subtitle: "Choose Target Domain",
      description: "Candidates select their preferred preparation module based on their current focus — whether an AI Mock Interview (Technical/HR), Resume PDF Upload, or a Coding Evaluation challenge.",
      badge: "User Input",
      details: [
        "Configurable role presets: SDE, ML Engineer, Frontend, Data Analyst",
        "Resume parser accepts PDF/Docx documents via PyMuPDF",
        "Coding challenges standard to Tier-1 campus placement drives"
      ],
      icon: Sliders
    },
    {
      num: 2,
      title: "AI Analysis",
      subtitle: "Ollama LLM Evaluation Engine",
      description: "Local Ollama LLM (Llama 3 / Qwen) and PyMuPDF extract candidate responses and examine them for technical accuracy, logic correctness, communication clarity, and ATS compatibility.",
      badge: "Neural Processing",
      details: [
        "Zero-cloud dependency: Ollama runs privately and securely offline",
        "Prompt-engineered grading rubric evaluating STAR method and algorithms",
        "AST and algorithmic complexity analysis for submitted code"
      ],
      icon: BrainCircuit
    },
    {
      num: 3,
      title: "Score & Feedback",
      subtitle: "Multi-Dimensional Scorecard",
      description: "Receive granular quantitative metrics (Technical Depth, Logic, Communication, ATS Score) alongside actionable, pinpointed suggestions and weak-spot diagnoses.",
      badge: "Diagnostic Output",
      details: [
        "Overall percentage score alongside sub-domain breakdowns",
        "Specific highlighted missing keywords or unhandled edge cases",
        "Instant model critique explaining WHY a particular answer was suboptimal"
      ],
      icon: BarChart
    },
    {
      num: 4,
      title: "Personalized Plan",
      subtitle: "Dynamic Adaptive Roadmap",
      description: "PrepWise AI synthesizes candidate strengths and weaknesses into a customized 7-day adaptive roadmap, dynamically shifting focus to lower-scoring topics.",
      badge: "Continuous Loop",
      details: [
        "Eliminates guesswork by prioritizing high-yield revision topics",
        "Continuously updates as new practice interviews and code runs are submitted",
        "Tracks velocity towards placement readiness over time"
      ],
      icon: Compass
    }
  ];

  return (
    <section id="solution" className="py-20 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Preparation Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500">PrepWise AI</span> Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            A continuous 4-stage pipeline that takes students from initial diagnostic evaluation to placement readiness.
          </p>
        </div>

        {/* 4 Steps Interactive Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative group ${
                  isActive 
                    ? 'bg-rose-950/40 border-rose-500/60 shadow-xl shadow-rose-500/10 -translate-y-1' 
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                    isActive ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {s.badge}
                  </span>
                </div>
                <h4 className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {s.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {s.subtitle}
                </p>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Step Detail View Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-rose-400 text-xs font-mono mb-3">
                <span>Phase {steps[activeStep].num} of 4</span>
                <span>•</span>
                <span>{steps[activeStep].badge}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {steps[activeStep].title} — <span className="text-slate-400 font-normal">{steps[activeStep].subtitle}</span>
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {steps[activeStep].description}
              </p>

              <div className="space-y-2.5">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                  >
                    ← Previous Step
                  </button>
                )}
                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href="#demos"
                    className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>Try In Live Sandboxes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Interactive Mock preview */}
            <div className="lg:col-span-5 bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs text-slate-400">
                <span className="font-mono">pipeline_runner.py</span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Ollama Online
                </span>
              </div>

              {activeStep === 0 && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <Mic2 className="w-5 h-5 text-rose-400" />
                    <div>
                      <div className="text-white font-semibold">1. AI Mock Interview</div>
                      <div className="text-slate-400 text-[11px]">Technical (DSA, ML) & HR Behavioral</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <FileCheck2 className="w-5 h-5 text-indigo-400" />
                    <div>
                      <div className="text-white font-semibold">2. Resume Upload & Extraction</div>
                      <div className="text-slate-400 text-[11px]">PyMuPDF instant ATS scanner</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-pink-400" />
                    <div>
                      <div className="text-white font-semibold">3. Coding Challenge</div>
                      <div className="text-slate-400 text-[11px]">Complexity, Edge Cases & Logic Evaluation</div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="p-4 rounded-xl bg-slate-900/90 font-mono text-[11px] space-y-2 text-slate-300">
                  <div className="text-rose-400">// Invoking Ollama LLM Client</div>
                  <div>$ ollama run llama3:instruct</div>
                  <div className="text-slate-400">&gt; Prompt: Grade candidate answer against STAR rubric...</div>
                  <div className="text-emerald-400">&gt; PyMuPDF parsed 512 tokens with 0 OCR errors</div>
                  <div className="text-slate-400">&gt; Synthesizing feedback metrics...</div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white">Overall Readiness Score</span>
                    <span className="text-rose-400 font-mono">92 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full w-[92%]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Technical Depth:</span>
                      <strong className="text-white block font-mono">94%</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Communication:</span>
                      <strong className="text-white block font-mono">90%</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <span className="text-indigo-400 font-bold block text-[11px] uppercase">Generated Study Roadmap</span>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>Dynamic Programming & Trees (High Priority)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>ATS Resume Keyword Alignment: Docker, Redis</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Behavioral STAR Practice: Leadership Conflicts</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
