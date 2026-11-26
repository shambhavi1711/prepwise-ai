import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Check, 
  X, 
  Users2, 
  Lightbulb, 
  Layers, 
  ArrowRight, 
  TrendingDown, 
  Sparkles, 
  ShieldAlert 
} from 'lucide-react';

export default function ProblemGapSection() {
  const [activeTab, setActiveTab] = useState('gap');

  const comparisonData = [
    {
      feature: "Preparation Environment",
      traditional: "Disconnected across 3-4 separate websites (LeetCode, Canva, GFG)",
      prepwise: "Unified intelligent coach combining interviews, coding, and resume in one place",
      advantage: "Zero context switching"
    },
    {
      feature: "Interview Feedback",
      traditional: "Generic written articles or expensive 1-on-1 human mock sessions",
      prepwise: "Context-aware real-time AI mock interviewer powered by local Ollama LLMs",
      advantage: "Instant contextual critique"
    },
    {
      feature: "Resume Evaluation",
      traditional: "Static visual layout templates with zero ATS or NLP bullet analysis",
      prepwise: "Automated PyMuPDF text parser with ATS score and missing keyword diagnosis",
      advantage: "Quantifiable ATS boost"
    },
    {
      feature: "Coding Evaluation",
      traditional: "Only passes/fails unit tests without reviewing code structure or logic depth",
      prepwise: "Time & Space complexity audit (O(n)), code readability, and edge-case feedback",
      advantage: "Holistic logic review"
    },
    {
      feature: "Progress & Continuity",
      traditional: "No memory across sessions; students repeat mistakes with no customized roadmap",
      prepwise: "Adaptive study planner that dynamically prioritizes diagnosed weak topics",
      advantage: "Adaptive preparation"
    }
  ];

  return (
    <section id="problem" className="py-20 relative border-t border-slate-800/80 bg-[#090D16]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Problem & Industry Gap Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Placement Preparation is <span className="text-rose-400">Broken Today</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Breaking down the fragmented student preparation cycle and identifying the critical gap in modern career tech.
          </p>
        </div>

        {/* The Core Challenge & Target Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Challenge Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 to-slate-900 border border-rose-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert className="w-24 h-24 text-rose-400" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">The Core Challenge</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-3">Fragmented Preparation</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Students rely on multiple platforms for coding, resume review, and interview practice — with <strong>no unified feedback</strong> or progress tracking.
            </p>
            <div className="mt-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
              ⚡ <strong>The Friction:</strong> Context switching wastes hours and leaves candidates unprepared for integrated placement rounds.
            </div>
          </div>

          {/* Who is Affected */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Users2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Target Demographics</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-3">Who Is Affected?</h3>
            <ul className="space-y-3">
              {[
                { title: "Engineering Students", desc: "Preparing for on-campus and off-campus placements" },
                { title: "Internship Applicants", desc: "Freshers seeking their first professional tech role" },
                { title: "Mentor-Deprived Candidates", desc: "Students lacking access to high-quality mock interviews" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white">{item.title}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Insight */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/30 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Key Research Insight</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-3">The Diagnostic Deficiency</h3>
              <blockquote className="text-sm italic text-slate-200 border-l-2 border-indigo-400 pl-3 my-2">
                "Generic resources don't identify individual weaknesses or provide continuous, personalized feedback."
              </blockquote>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400">
              💡 <strong>PrepWise AI Solution:</strong> A closed-loop feedback engine that adapts dynamically to past errors.
            </div>
          </div>

        </div>

        {/* Existing Solutions vs Limitations */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Existing Work vs. Gap Analysis</h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparing current student workflows with the PrepWise AI unified architecture
              </p>
            </div>
            <div className="inline-flex p-1 bg-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('gap')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'gap' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Identified Gaps
              </button>
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'matrix' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Comparison Matrix
              </button>
            </div>
          </div>

          {activeTab === 'gap' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What Students Use Today */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  What Students Use Today
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Coding Platforms</span>
                      <span className="text-[11px] text-amber-400 font-mono">LeetCode, HackerRank</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Isolated coding practice without contextual interview or resume feedback.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Resume Tools</span>
                      <span className="text-[11px] text-amber-400 font-mono">Canva, generic templates</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Focus only on aesthetic formatting with zero AI content or ATS optimization.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Interview Prep Sites</span>
                      <span className="text-[11px] text-amber-400 font-mono">GeeksforGeeks, static blogs</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Static question-answer catalogs lacking real-time interactive role simulation.</p>
                  </div>
                </div>
              </div>

              {/* Identified Gap */}
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Limitations & Critical Gaps
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      "Preparation is distributed across multiple disconnected platforms",
                      "Feedback is generic — not tailored to individual weaknesses",
                      "No continuity or systematic tracking between sessions",
                      "Students lack a personalized preparation roadmap"
                    ].map((limitation, i) => (
                      <li key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10 text-xs text-slate-300">
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-purple-950/20 to-slate-900 border border-rose-500/30">
                  <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    The Gap Identified
                  </div>
                  <p className="text-sm font-semibold text-white mt-1">
                    "No integrated system combines AI evaluation, interview practice, and personalized progress tracking in one place."
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Evaluation Dimension</th>
                    <th className="py-3 px-4 text-amber-400">Traditional / Existing Tools</th>
                    <th className="py-3 px-4 text-rose-400">PrepWise AI (Our Solution)</th>
                    <th className="py-3 px-4 text-emerald-400">Impact Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">{row.feature}</td>
                      <td className="py-3 px-4 text-slate-400">{row.traditional}</td>
                      <td className="py-3 px-4 text-slate-200 font-medium bg-rose-500/5">{row.prepwise}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">{row.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
