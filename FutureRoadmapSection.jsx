import React from 'react';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Mic, 
  Smile, 
  TerminalSquare, 
  Building2, 
  Smartphone, 
  Sparkles,
  Users
} from 'lucide-react';

export default function FutureRoadmapSection() {
  const futureEnhancements = [
    {
      title: "Voice-Based Mock Interviews",
      subtitle: "Speech-to-Text & Audio Inference",
      desc: "Integrate Whisper STT and natural voice synthesis for true hands-free audio interview sessions.",
      icon: Mic,
      status: "Pipeline Phase 2"
    },
    {
      title: "Confidence & Communication Analysis",
      subtitle: "Audio/Video Sentiment Tracking",
      desc: "Analyze voice pitch, filler words ('um', 'ah'), pause duration, and facial expressions during delivery.",
      icon: Smile,
      status: "Research Phase"
    },
    {
      title: "Live Coding Sandbox Integration",
      subtitle: "In-Browser Test Runner",
      desc: "Integrated sandboxed Monaco code editor with live unit test runners and memory leak monitors.",
      icon: TerminalSquare,
      status: "Prototyping"
    },
    {
      title: "Company-Specific Question Datasets",
      subtitle: "FAANG & Tier-1 Placement Banks",
      desc: "Tailor mock rounds to specific company rubrics (e.g. Amazon Leadership Principles, Google DSA).",
      icon: Building2,
      status: "Data Aggregation"
    },
    {
      title: "Native Mobile Application",
      subtitle: "React Native / Flutter Cross-Platform",
      desc: "Enable on-the-go mock interviews and daily flashcard revision on iOS and Android smartphones.",
      icon: Smartphone,
      status: "Planned"
    }
  ];

  return (
    <section id="roadmap" className="py-20 relative bg-[#090D16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Scope & Product Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scope, Deliverables & <span className="text-rose-400">Future Enhancements</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Targeted placement impact on engineering graduates and our upcoming multi-modal feature expansion.
          </p>
        </div>

        {/* Target Users & Expected Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Target Users */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Audience Scope</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-4">Target Users</h3>
            
            <div className="space-y-3">
              {[
                { title: "Engineering students preparing for placements", note: "On-campus & off-campus drives" },
                { title: "Internship applicants and beginners", note: "Pre-final year undergraduate aspirants" },
                { title: "Students preparing for technical interviews", note: "Core SDE, AI/ML, and Data Analytics tracks" }
              ].map((user, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">{user.title}</h4>
                    <p className="text-[11px] text-slate-400">{user.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-rose-500/30 shadow-xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Measurable Deliverables</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-4">Expected Outcomes</h3>

            <div className="space-y-3">
              {[
                { title: "Practice interviews independently with AI feedback", desc: "No dependence on expensive human interview coaches; available 24/7." },
                { title: "Identify and address weak areas systematically", desc: "Algorithmic diagnosis pinpoints high-yield topics before interview day." },
                { title: "Track preparation progress over time", desc: "Measurable readiness scores across mock interviews, coding, and resume." }
              ].map((outcome, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">{outcome.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{outcome.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Future Enhancements (5 Arrows from Slide 9) */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-rose-400">Roadmap Phase 2</span>
            <h3 className="text-2xl font-bold text-white mt-1">Future Enhancements</h3>
            <p className="text-xs text-slate-400 mt-1">Expanding PrepWise AI into a multi-modal placement super-assistant</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {futureEnhancements.map((enh, idx) => {
              const Icon = enh.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                      {enh.status}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors mb-1">
                      {enh.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {enh.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-rose-400 flex items-center gap-1">
                    <span>Explore spec</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
