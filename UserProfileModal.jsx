import React, { useState } from 'react';
import { X, User, Briefcase, Building, Sparkles, Check, GraduationCap } from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose, userProfile, onUpdateProfile }) {
  const [formData, setFormData] = useState({ ...userProfile });
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0D1322] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Candidate Profile Settings</h3>
            <p className="text-xs text-slate-400">Module 01: Stores info, target role, and interview preferences</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Candidate Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
              placeholder="e.g. Shambhavi Shukla"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Target Engineering Role</label>
            <select
              value={formData.targetRole}
              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Full Stack SDE Intern">Full Stack SDE Intern</option>
              <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
              <option value="Data Structures & Core Backend">Data Structures & Core Backend</option>
              <option value="Frontend Engineer (React)">Frontend Engineer (React)</option>
              <option value="Data Analyst / Business Intelligence">Data Analyst / Business Intelligence</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Target Company Tier</label>
            <select
              value={formData.targetCompanyTier}
              onChange={(e) => setFormData({ ...formData, targetCompanyTier: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Tier-1 Product (Google, Microsoft, Amazon)">Tier-1 Product (Google, Microsoft, Amazon)</option>
              <option value="High-Growth Tech Startups">High-Growth Tech Startups</option>
              <option value="Campus On-Placement Drives">Campus On-Placement Drives</option>
              <option value="Global Consultancies & FinTech">Global Consultancies & FinTech</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Preparation Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFormData({ ...formData, prepLevel: lvl })}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    formData.prepLevel === lvl 
                      ? 'bg-rose-600 text-white border-rose-500 shadow-md' 
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Auto-saved to local state</span>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-1.5 shadow-lg shadow-rose-600/30"
            >
              {savedAlert ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
