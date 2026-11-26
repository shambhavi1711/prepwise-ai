import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  FileText, 
  Code2, 
  Calendar, 
  User, 
  Info, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { projectDetails } from '../data/teamData';

export default function Navbar({ onOpenProfile, onOpenProjectInfo, userProfile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mock Interview', href: '#modules-hub' },
    { name: 'Resume ATS', href: '#modules-hub' },
    { name: 'Code Evaluator', href: '#modules-hub' },
    { name: 'Study Planner', href: '#modules-hub' },
    { name: 'System Architecture', href: '#architecture' },
    { name: 'Platform Vision', href: '#problem' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800 shadow-xl' : 'bg-transparent border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-rose-400 transition-colors">
                {projectDetails.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full">
                Platform
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI Placement & Interview Assistant
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Candidate Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500/40 rounded-xl transition-all shadow-md group"
            title="Candidate Profile & Settings"
          >
            <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <span className="max-w-[110px] truncate">{userProfile.name}</span>
          </button>

          {/* Project Details Modal Trigger */}
          <button
            onClick={onOpenProjectInfo}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
            title="Academic Project & Team Details"
          >
            <Info className="w-4 h-4 text-slate-400 hover:text-rose-400" />
          </button>

          {/* Start Practice CTA */}
          <a
            href="#modules-hub"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-600/25 transition-all hover:shadow-rose-600/40"
          >
            <span>Start Practice</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-rose-400 font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg"
            >
              <User className="w-4 h-4 text-rose-400" />
              <span>Candidate Profile: {userProfile.name}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectInfo();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Project & Team Info</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
