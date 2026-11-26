import React from 'react';
import { X, GraduationCap, UserCheck, Users, Award, BookOpen, Layers } from 'lucide-react';
import { projectDetails, teamMembers } from '../data/teamData';

export default function ProjectInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0D1322] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-4 h-4 text-rose-400" />
            <span>Mini Project Academic Defense Details</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {projectDetails.name} — Project Info
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Department of Artificial Intelligence & Machine Learning
          </p>
        </div>

        {/* Academic Metadata Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Group Number</span>
            <strong className="text-sm text-white font-mono mt-0.5 block">{projectDetails.groupNo}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Branch & Discipline</span>
            <strong className="text-sm text-white font-mono mt-0.5 block">{projectDetails.branch}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 text-center">
            <span className="text-[10px] font-mono uppercase text-rose-400 block">Supervisor</span>
            <strong className="text-sm text-rose-200 mt-0.5 block">{projectDetails.supervisor}</strong>
          </div>
        </div>

        {/* Team Members List */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-rose-400" />
            <span>Student Researchers & Developers</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                  {member.initials}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">{member.name}</h5>
                  <p className="text-[11px] font-mono text-rose-400">Roll: {member.rollNo}</p>
                  <span className="text-[10px] text-slate-400">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Summary */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
          <strong className="text-white block mb-1">Project Abstract:</strong>
          {projectDetails.summary}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
