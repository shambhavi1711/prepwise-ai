import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  Check, 
  AlertTriangle, 
  Bot, 
  Cpu, 
  Target,
  Users
} from 'lucide-react';
import { presentationSlides } from '../data/presentationData';
import { projectDetails } from '../data/teamData';

export default function SlideDeckModal({ isOpen, onClose, initialSlide = 0 }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = presentationSlides.length;
  const currentSlide = presentationSlides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalSlides, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060911]/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Presentation Bar */}
      <div className="h-16 px-6 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs">
            {currentSlide.slideNumber}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {currentSlide.title}
            </h3>
            <p className="text-[11px] text-slate-400">
              Slide {currentSlideIndex + 1} of {totalSlides} • {projectDetails.name} Presentation
            </p>
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showNotes 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Slide Deck (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-5xl aspect-video max-h-[75vh] bg-[#0c1222] border border-slate-700/60 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          {/* Ambient Slide Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Slide Header */}
          <div className="border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-rose-400 font-semibold">
                  0{currentSlide.slideNumber} // {projectDetails.name}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                  {currentSlide.title}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                {currentSlide.subtitle}
              </span>
            </div>
          </div>

          {/* Slide Body Dependent on Slide Type */}
          <div className="flex-1 flex flex-col justify-center py-2 overflow-y-auto">
            
            {/* SLIDE 1: Cover */}
            {currentSlide.type === 'cover' && (
              <div className="text-center py-4">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-4">
                  {currentSlide.tagline}
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  PrepWise <span className="text-rose-400">AI</span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-slate-300 mt-2">
                  {currentSlide.subtitle}
                </p>

                <div className="mt-8 max-w-2xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
                  <div className="bg-rose-950/40 px-4 py-2 border-b border-slate-800 text-left text-xs font-bold text-rose-300 uppercase tracking-wider">
                    Team Members (Group No. 06)
                  </div>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="py-2 px-4">Roll No.</th>
                        <th className="py-2 px-4">Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                      {currentSlide.content.team.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="py-2 px-4 text-rose-400">{m.rollNo}</td>
                          <td className="py-2 px-4 font-sans font-semibold text-white">{m.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SLIDE 2: Table of Contents */}
            {currentSlide.type === 'toc' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentSlide.items.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx + 2)}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition-all hover:bg-slate-800/60 group"
                  >
                    <span className="font-mono text-xs font-bold text-rose-400 group-hover:text-rose-300">
                      {item.num}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-white mt-1 group-hover:text-rose-200">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            )}

            {/* SLIDE 3: Introduction */}
            {currentSlide.type === 'content' && (
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {currentSlide.body}
                </p>
                <div className="space-y-2 pt-2">
                  {currentSlide.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLIDE 4: Problem Statement */}
            {currentSlide.type === 'problem' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">The Challenge</span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-2">Fragmented Preparation</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentSlide.challenge}
                  </p>
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-rose-500/20 text-xs text-rose-200">
                    💡 <strong>Key Insight:</strong> {currentSlide.keyInsight}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Demographics</span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-3">Who Is Affected?</h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {currentSlide.affected.map((aff, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>{aff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* SLIDE 5: Proposed Solution */}
            {currentSlide.type === 'solution' && (
              <div>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 italic border-l-2 border-rose-500 pl-3">
                  "{currentSlide.description}"
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentSlide.steps.map((st, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
                      <div className="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                        {st.step}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{st.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLIDE 6: Objectives */}
            {currentSlide.type === 'objectives' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentSlide.objectives.map((obj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-mono font-bold text-rose-400">0{obj.num}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5 mb-1">{obj.title}</h4>
                    <p className="text-xs text-slate-300">{obj.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SLIDE 7: Gap Analysis */}
            {currentSlide.type === 'gapAnalysis' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What Students Use Today</h4>
                  <div className="space-y-2">
                    {currentSlide.currentSolutions.map((cs, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                        <span className="font-bold text-white block">{cs.category} ({cs.name})</span>
                        <span className="text-slate-400 text-[11px]">{cs.issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Limitations & Gaps</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {currentSlide.limitations.map((lim, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-rose-400">✕</span>
                          <span>{lim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200">
                    <strong>Gap Identified:</strong> {currentSlide.gapIdentified}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 8: Innovation */}
            {currentSlide.type === 'innovation' && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {currentSlide.innovations.map((inv, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <h4 className="text-xs sm:text-sm font-bold text-rose-400">{inv.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1">{inv.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-rose-500/20 text-xs text-center text-slate-200">
                  ⚡ <strong>Value Addition:</strong> {currentSlide.valueAddition}
                </div>
              </div>
            )}

            {/* SLIDE 9: Scope */}
            {currentSlide.type === 'scope' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Target Users</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentSlide.targetUsers.map((u, i) => (
                      <li key={i}>• {u}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Expected Outcomes</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentSlide.expectedOutcomes.map((o, i) => (
                      <li key={i}>✓ {o}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Future Enhancements</h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {currentSlide.futureEnhancements.map((f, i) => (
                      <li key={i}>➔ {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* SLIDE 10: Architecture */}
            {currentSlide.type === 'architecture' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-6 space-y-2 text-xs">
                  <span className="font-bold text-rose-400 text-xs uppercase block">System Flowchart</span>
                  {currentSlide.architectureFlow.map((flow, i) => (
                    <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                      <span className="text-rose-400 font-mono text-[10px]">{i + 1}.</span>
                      <span className="text-slate-300 text-[11px]">{flow}</span>
                    </div>
                  ))}
                </div>

                <div className="sm:col-span-6">
                  <span className="font-bold text-slate-400 text-xs uppercase block mb-2">Tech Stack Grid</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {currentSlide.techStack.map((ts, i) => (
                      <div key={i} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-500 text-[10px] block">{ts.category}</span>
                        <strong className="text-white text-xs">{ts.tech}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 11: Core Modules */}
            {currentSlide.type === 'modules' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentSlide.modules.map((mod, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-rose-400 font-mono text-xs font-bold">Mod 0{i + 1}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{mod.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{mod.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SLIDE 12: Conclusion */}
            {currentSlide.type === 'conclusion' && (
              <div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                  {currentSlide.summary}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {currentSlide.pillars.map((pil, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                      <strong className="text-rose-400 block">{pil.label}</strong>
                      <span className="text-slate-400 text-[11px]">{pil.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-[10px] text-slate-400 font-mono">
                  <strong>References:</strong> {currentSlide.references.join('; ')}
                </div>
              </div>
            )}

          </div>

          {/* Slide Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Group 06 • B.Tech AI&ML</span>
            <span className="font-mono">Slide {currentSlideIndex + 1} / {totalSlides}</span>
            <span>Supervisor: Mr. Ritesh</span>
          </div>

        </div>
      </div>

      {/* Speaker Notes Drawer (Collapsible) */}
      {showNotes && (
        <div className="bg-slate-900 border-t border-rose-500/30 px-6 py-3 shrink-0 animate-in slide-in-from-bottom-2 duration-150">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <Volume2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Speaker Defense Notes:</span>
              <p className="text-xs text-slate-300 mt-0.5">{currentSlide.speakerNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation & Thumbnails */}
      <div className="h-20 bg-slate-950 border-t border-slate-800/80 px-6 flex items-center justify-between shrink-0">
        
        {/* Previous Button */}
        <button
          onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev (←)</span>
        </button>

        {/* Slide Selector Badges */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 px-2 max-w-xl">
          {presentationSlides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold shrink-0 transition-all ${
                currentSlideIndex === idx
                  ? 'bg-rose-600 text-white scale-110 shadow-md shadow-rose-600/40'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              title={`Slide ${idx + 1}: ${s.title}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1))}
          disabled={currentSlideIndex === totalSlides - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-rose-600/30"
        >
          <span className="hidden sm:inline">Next (→)</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}
