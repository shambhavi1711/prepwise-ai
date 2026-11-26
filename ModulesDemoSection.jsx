import React, { useState } from 'react';
import { 
  Bot, 
  FileText, 
  Code2, 
  Calendar, 
  User, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  Send, 
  Play, 
  RotateCcw, 
  FileCheck, 
  Cpu, 
  Check, 
  Award,
  ArrowRight,
  Volume2,
  Mic,
  MicOff,
  Upload,
  RefreshCw,
  Copy,
  History,
  TrendingUp,
  Terminal
} from 'lucide-react';
import { 
  mockInterviewQuestions, 
  sampleResumes, 
  sampleCodingChallenges, 
  adaptiveStudyPlan 
} from '../data/demoData';
import { 
  evaluateInterviewResponse, 
  evaluateCodeSubmission, 
  evaluateResumeText 
} from '../utils/aiEvaluator';

export default function ModulesDemoSection({ activeTab, setActiveTab, userProfile }) {
  // Interview state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [isEvaluatingInterview, setIsEvaluatingInterview] = useState(false);
  const [interviewResult, setInterviewResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interviewAttempts, setInterviewAttempts] = useState({});
  const [hasCopiedScorecard, setHasCopiedScorecard] = useState(false);

  // Resume state
  const [selectedResumeIndex, setSelectedResumeIndex] = useState(0);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [resumeResult, setResumeResult] = useState(sampleResumes[0]);
  const [customResumeText, setCustomResumeText] = useState('');
  const [isCustomResume, setIsCustomResume] = useState(false);

  // Coding state
  const [selectedCodeIndex, setSelectedCodeIndex] = useState(0);
  const [codeContent, setCodeContent] = useState(sampleCodingChallenges[0].defaultCode);
  const [isEvaluatingCode, setIsEvaluatingCode] = useState(false);
  const [codeResult, setCodeResult] = useState(sampleCodingChallenges[0].evaluation);

  // Study plan state (interactive completion checkmarks)
  const [planTasks, setPlanTasks] = useState(adaptiveStudyPlan);

  // Handlers
  const handleAutofillAnswer = (type = 'exemplar') => {
    const q = mockInterviewQuestions[selectedQuestionIndex];
    if (type === 'weak') {
      setInterviewAnswer(q.weakAnswer || "I honestly don't know much about this topic, maybe it's just basic logic?");
    } else if (type === 'misconception') {
      setInterviewAnswer(q.misconceptionAnswer || "We can just use a basic data structure and loop through everything sequentially.");
    } else {
      setInterviewAnswer(q.sampleAnswer);
    }
  };

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const questionText = mockInterviewQuestions[selectedQuestionIndex].question;
      const utterance = new SpeechSynthesisUtterance(questionText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type or use 'Autofill Exemplary Answer'.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInterviewAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleEvaluateInterview = () => {
    if (!interviewAnswer.trim()) return;
    setIsEvaluatingInterview(true);
    setInterviewResult(null);
    setHasCopiedScorecard(false);

    setTimeout(() => {
      setIsEvaluatingInterview(false);
      const currentQ = mockInterviewQuestions[selectedQuestionIndex];
      const result = evaluateInterviewResponse(currentQ, interviewAnswer, userProfile.targetRole);
      setInterviewResult(result);

      // Record attempt in historical progression tracker
      setInterviewAttempts((prev) => {
        const questionKey = currentQ.id;
        const past = prev[questionKey] || [];
        const newAttempt = {
          attemptNum: past.length + 1,
          score: result.overallScore,
          verdict: result.verdict,
          verdictType: result.verdictType,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...prev,
          [questionKey]: [...past, newAttempt]
        };
      });
    }, 1100);
  };

  const handleCopyScorecard = () => {
    if (!interviewResult) return;
    const report = `PREPWISE AI - PLACEMENT EVALUATION SCORECARD
Candidate: ${userProfile.name || 'Candidate'}
Target Role: ${userProfile.targetRole}
Question: "${mockInterviewQuestions[selectedQuestionIndex].question}"
------------------------------------------------
Overall Readiness Score: ${interviewResult.overallScore}/100
Verdict: ${interviewResult.verdict}
Technical Depth: ${interviewResult.technicalDepth}%
Communication & Clarity: ${interviewResult.communication}%
Delivery & Confidence: ${interviewResult.confidence}%
Latency: ${interviewResult.latency} (${interviewResult.llmModelUsed})

STRENGTHS:
${interviewResult.strengths.map(s => '• ' + s).join('\n')}

ACTIONABLE IMPROVEMENT AREAS:
${interviewResult.improvementAreas.map(a => '• ' + a).join('\n')}
------------------------------------------------
Generated by PrepWise AI (Offline Ollama Engine)`;

    navigator.clipboard.writeText(report);
    setHasCopiedScorecard(true);
    setTimeout(() => setHasCopiedScorecard(false), 2500);
  };

  const handleSelectResume = (idx) => {
    setIsCustomResume(false);
    setSelectedResumeIndex(idx);
    setIsAnalyzingResume(true);
    setTimeout(() => {
      setIsAnalyzingResume(false);
      setResumeResult(sampleResumes[idx]);
    }, 450);
  };

  const handleAnalyzeCustomResume = () => {
    if (!customResumeText.trim()) return;
    setIsAnalyzingResume(true);
    setTimeout(() => {
      setIsAnalyzingResume(false);
      const dynamicResume = evaluateResumeText(customResumeText, userProfile.targetRole);
      setResumeResult(dynamicResume);
    }, 700);
  };

  const handleSelectCodeProblem = (idx) => {
    setSelectedCodeIndex(idx);
    setCodeContent(sampleCodingChallenges[idx].defaultCode);
    setCodeResult(null);
  };

  const handleEvaluateCode = () => {
    setIsEvaluatingCode(true);
    setTimeout(() => {
      setIsEvaluatingCode(false);
      const dynamicCodeEval = evaluateCodeSubmission(sampleCodingChallenges[selectedCodeIndex], codeContent);
      setCodeResult(dynamicCodeEval);
    }, 900);
  };

  const toggleTaskCompletion = (index) => {
    setPlanTasks((prev) => 
      prev.map((item, idx) => {
        if (idx === index) {
          const nextStatus = item.status === 'Completed' ? 'Pending' : 'Completed';
          const nextScore = nextStatus === 'Completed' ? '92%' : 'Pending';
          return { ...item, status: nextStatus, score: nextScore };
        }
        return item;
      })
    );
  };

  const completedCount = planTasks.filter(t => t.status === 'Completed').length;
  const readinessPercent = Math.round((completedCount / planTasks.length) * 100);

  return (
    <section id="modules-hub" className="py-20 relative bg-[#090D16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Placement Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Preparation <span className="text-rose-400">Engines</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Practice mock interviews with voice assistance, analyze your resume ATS rating, evaluate algorithm complexity, and manage your dynamic 7-day study roadmap.
          </p>
        </div>

        {/* 4 Interactive Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-900/80 p-2 rounded-2xl border border-slate-800/80 max-w-4xl mx-auto">
          {[
            { id: 'interview', label: '1. Mock Interview (Tech & HR)', icon: Bot },
            { id: 'resume', label: '2. Resume ATS Analyzer', icon: FileText },
            { id: 'coding', label: '3. Code Evaluator', icon: Code2 },
            { id: 'planner', label: '4. Study Roadmap & Dashboard', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: MOCK INTERVIEW ================= */}
        {activeTab === 'interview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Question & Input */}
            <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-4 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Placement Interviewer</h3>
                    <p className="text-[11px] text-slate-400">Offline inference via Ollama (Llama-3-8B)</p>
                  </div>
                </div>

                {/* Question Selector */}
                <select
                  value={selectedQuestionIndex}
                  onChange={(e) => {
                    setSelectedQuestionIndex(Number(e.target.value));
                    setInterviewAnswer('');
                    setInterviewResult(null);
                  }}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  {mockInterviewQuestions.map((q, idx) => (
                    <option key={q.id} value={idx}>
                      {q.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                    Target Role: {userProfile.targetRole || mockInterviewQuestions[selectedQuestionIndex].role}
                  </span>
                  
                  {/* Voice Read-Aloud Button & Visualizer */}
                  <div className="flex items-center gap-2">
                    {isSpeaking && (
                      <div className="flex items-center gap-0.5 h-3.5 px-2 bg-rose-500/20 rounded-full border border-rose-500/30">
                        <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-3.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
                      </div>
                    )}
                    <button
                      onClick={handleSpeakQuestion}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSpeaking ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                      title="Read question out loud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Speaking...' : 'Listen to AI'}</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  "{mockInterviewQuestions[selectedQuestionIndex].question}"
                </p>
              </div>

              {/* Answer Input & Demo Presets */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 text-xs gap-2">
                  <label className="text-slate-400 font-medium">Candidate Verbal or Written Response:</label>
                  
                  {/* Speech & Quick Test Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleVoiceInput}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-[11px] border transition-all cursor-pointer ${
                        isListening 
                          ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                      title="Speak your answer using microphone"
                    >
                      {isListening ? <Mic className="w-3.5 h-3.5 text-white" /> : <Mic className="w-3.5 h-3.5 text-rose-400" />}
                      <span>{isListening ? 'Listening...' : 'Speak'}</span>
                    </button>

                    <div className="h-4 w-px bg-slate-800 mx-0.5" />

                    <button
                      onClick={() => handleAutofillAnswer('exemplar')}
                      className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px] cursor-pointer"
                      title="Autofill standard high-scoring answer"
                    >
                      ⚡ Ideal (92%)
                    </button>
                    <button
                      onClick={() => handleAutofillAnswer('weak')}
                      className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-semibold text-[11px] cursor-pointer"
                      title="Test evasive 'I don't know' response"
                    >
                      ⚠️ Evasive (32%)
                    </button>
                    <button
                      onClick={() => handleAutofillAnswer('misconception')}
                      className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold text-[11px] cursor-pointer"
                      title="Test common architectural misconception"
                    >
                      ❌ Wrong/Flaw
                    </button>
                  </div>
                </div>

                <textarea
                  rows={5}
                  value={interviewAnswer}
                  onChange={(e) => setInterviewAnswer(e.target.value)}
                  placeholder="Type candidate response, speak into mic, or click one of the preset pills above to test how the AI evaluates ideal vs wrong answers..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none font-sans"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {interviewAnswer.length} characters • {interviewAnswer.trim() ? interviewAnswer.trim().split(/\s+/).length : 0} words
                </span>

                <button
                  onClick={handleEvaluateInterview}
                  disabled={!interviewAnswer.trim() || isEvaluatingInterview}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                >
                  {isEvaluatingInterview ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Ollama Evaluating Response...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Evaluate Response with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: AI Evaluation Results */}
            <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Evaluation Scorecard
                  </h4>
                  {interviewResult && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyScorecard}
                        className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 cursor-pointer"
                        title="Copy diagnostic scorecard"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{hasCopiedScorecard ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ⚡ {interviewResult.latency}
                      </span>
                    </div>
                  )}
                </div>

                {!interviewResult && !isEvaluatingInterview && (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Bot className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-xs">
                      Select a preset above (e.g. <strong>"⚡ Ideal"</strong> or <strong>"⚠️ Evasive"</strong>) and click <strong>"Evaluate Response"</strong> to see realistic scoring and feedback.
                    </p>
                  </div>
                )}

                {isEvaluatingInterview && (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-10 h-10 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-4" />
                    <p className="text-xs text-slate-300 font-mono">Running local Ollama LLM prompt...</p>
                    <p className="text-[11px] text-slate-500 mt-1">Evaluating logic, STAR compliance, keywords & depth</p>
                  </div>
                )}

                {interviewResult && (
                  <div className="space-y-4">
                    {/* Overall Score Banner with Dynamic Verdict Color */}
                    <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                      interviewResult.verdictType === 'critical'
                        ? 'bg-rose-950/40 border-rose-500/60'
                        : interviewResult.verdictType === 'warning'
                        ? 'bg-amber-950/40 border-amber-500/60'
                        : 'bg-emerald-950/40 border-emerald-500/60'
                    }`}>
                      <div>
                        <span className={`text-[11px] font-bold uppercase ${
                          interviewResult.verdictType === 'critical' ? 'text-rose-400' :
                          interviewResult.verdictType === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          Overall Readiness Score
                        </span>
                        <div className="text-3xl font-black text-white font-mono">
                          {interviewResult.overallScore}
                          <span className="text-slate-400 text-lg">/100</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Diagnostic Verdict</span>
                        <div className={`text-xs font-bold flex items-center justify-end gap-1 mt-0.5 ${
                          interviewResult.verdictType === 'critical' ? 'text-rose-400' :
                          interviewResult.verdictType === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {interviewResult.verdictType === 'critical' && <AlertCircle className="w-3.5 h-3.5" />}
                          {interviewResult.verdictType === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                          {interviewResult.verdictType === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          <span>{interviewResult.verdict}</span>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Bars */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Technical Depth</span>
                          <span className="font-mono font-bold text-rose-400">{interviewResult.technicalDepth}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, interviewResult.technicalDepth)}%` }} 
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Communication & Clarity</span>
                          <span className="font-mono font-bold text-pink-400">{interviewResult.communication}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-pink-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, interviewResult.communication)}%` }} 
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Delivery & Confidence</span>
                          <span className="font-mono font-bold text-indigo-400">{interviewResult.confidence}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, interviewResult.confidence)}%` }} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Check className="w-3.5 h-3.5" /> AI Identified Strengths
                      </span>
                      <ul className="space-y-1">
                        {interviewResult.strengths.map((str, sIdx) => (
                          <li key={sIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvement Tips */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/20">
                      <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5 mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Actionable Improvement Areas
                      </span>
                      <ul className="space-y-1">
                        {interviewResult.improvementAreas.map((area, aIdx) => (
                          <li key={aIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Attempt Progression History */}
                    {interviewAttempts[mockInterviewQuestions[selectedQuestionIndex].id]?.length > 1 && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mb-1.5">
                          <History className="w-3.5 h-3.5 text-rose-400" />
                          <span>Candidate Iteration Progress:</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {interviewAttempts[mockInterviewQuestions[selectedQuestionIndex].id].map((att, aIdx) => (
                            <span 
                              key={aIdx} 
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                                att.verdictType === 'critical' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' :
                                att.verdictType === 'warning' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                                'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              }`}
                            >
                              Attempt #{att.attemptNum}: {att.score}%
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {interviewResult && (
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Engine: {interviewResult.llmModelUsed}</span>
                  <span className="text-emerald-400">✓ Locally Parsed</span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 2: RESUME ANALYZER ================= */}
        {activeTab === 'resume' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Resume Selector & Extraction */}
            <div className="lg:col-span-6 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">PyMuPDF Resume ATS Parser</h3>
                    <p className="text-[11px] text-slate-400">Sub-50ms text extraction & keyword matching</p>
                  </div>
                </div>

                {/* Candidate Selector */}
                <div className="flex items-center gap-1.5">
                  {sampleResumes.map((res, idx) => (
                    <button
                      key={res.id}
                      onClick={() => handleSelectResume(idx)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        !isCustomResume && selectedResumeIndex === idx
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {res.targetRole.split(' ')[0]} CV
                    </button>
                  ))}
                  <button
                    onClick={() => setIsCustomResume(true)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                      isCustomResume
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    Custom Text
                  </button>
                </div>
              </div>

              {/* Extraction Preview or Custom Textarea */}
              {isCustomResume ? (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Paste Candidate Resume Content (or summary of projects & skills):
                  </label>
                  <textarea
                    rows={6}
                    value={customResumeText}
                    onChange={(e) => setCustomResumeText(e.target.value)}
                    placeholder="Paste resume text here (e.g. B.Tech graduate in Computer Science. Proficient in Python, React, SQL. Built real-time chat app and machine learning classifier...)"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500 font-mono"
                  />
                  <button
                    onClick={handleAnalyzeCustomResume}
                    disabled={!customResumeText.trim() || isAnalyzingResume}
                    className="mt-2 w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    {isAnalyzingResume ? 'PyMuPDF Extracting & Scoring...' : 'Run PyMuPDF ATS Scan'}
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/80 mb-2">
                    <span className="text-rose-400 font-semibold">{resumeResult.candidateName}</span>
                    <span className="text-[10px] text-slate-500">{resumeResult.fileSize}</span>
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed">
                    <span className="text-slate-500">// PyMuPDF Extracted Profile Summary:</span><br />
                    "{resumeResult.extractedSummary}"
                  </div>
                </div>
              )}

              {/* Detected Skills */}
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Detected Core Skills (Keyword Match)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resumeResult.detectedSkills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing High-Yield Keywords */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-2">
                  Missing High-Frequency ATS Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resumeResult.missingKeywords.map((kw, kIdx) => (
                    <span key={kIdx} className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-mono">
                      + Add {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: ATS Score & AI Suggestions */}
            <div className="lg:col-span-6 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    ATS Optimization Scorecard
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    Target: {resumeResult.targetRole}
                  </span>
                </div>

                {/* Score Dial */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-500/40 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-rose-300 font-bold uppercase">ATS Machine Compatibility</span>
                    <div className="text-4xl font-extrabold text-white font-mono mt-0.5">
                      {resumeResult.atsScore}<span className="text-rose-400 text-xl">/100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-400 font-bold">Top 15% Candidate</span>
                    <p className="text-[11px] text-slate-400">Passes corporate campus resume filter</p>
                  </div>
                </div>

                {/* Granular Breakdown */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Action Verbs & Impact</span>
                    <strong className="text-white font-mono text-sm">{resumeResult.metrics.impactVerbs}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Skill Relevance</span>
                    <strong className="text-white font-mono text-sm">{resumeResult.metrics.skillRelevance}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">ATS Parsability</span>
                    <strong className="text-emerald-400 font-mono text-sm">{resumeResult.metrics.formattingATS}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Quantifiable Metrics</span>
                    <strong className="text-amber-400 font-mono text-sm">{resumeResult.metrics.quantifiableResults}%</strong>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/20">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> AI Recommended Revisions
                  </span>
                  <div className="space-y-2">
                    {resumeResult.aiRecommendations.map((rec, rIdx) => (
                      <div key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold mt-0.5">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>PyMuPDF 1.24 • Ollama NLP Extraction</span>
                <span className="text-emerald-400">Ready for Placement Drives</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CODING EVALUATION ================= */}
        {activeTab === 'coding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Code Editor */}
            <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Algorithmic Code Evaluator</h3>
                    <p className="text-[11px] text-slate-400">Logic, Complexity & Edge-Case Validator</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {sampleCodingChallenges.map((prob, idx) => (
                    <button
                      key={prob.id}
                      onClick={() => handleSelectCodeProblem(idx)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        selectedCodeIndex === idx
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {prob.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 mb-3">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-white">{sampleCodingChallenges[selectedCodeIndex].title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {sampleCodingChallenges[selectedCodeIndex].difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {sampleCodingChallenges[selectedCodeIndex].description}
                </p>
              </div>

              {/* Code Editor */}
              <div className="relative font-mono text-xs">
                <div className="bg-slate-950 text-slate-400 px-4 py-2 border-t border-x border-slate-800 rounded-t-xl text-[11px] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">solution.py</span>
                    <span className="text-[10px] text-emerald-400 font-sans">Python 3.11</span>
                  </div>

                  {/* Algorithm Quick Presets for Demo */}
                  <div className="flex items-center gap-1.5 font-sans">
                    <span className="text-[10px] text-slate-500">Preset:</span>
                    {selectedCodeIndex === 0 && (
                      <>
                        <button
                          onClick={() => setCodeContent(`def two_sum(nums, target):
    # Optimal Single-Pass Hash Map
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`)}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[10px] cursor-pointer"
                        >
                          ⚡ Optimal O(n)
                        </button>
                        <button
                          onClick={() => setCodeContent(`def two_sum(nums, target):
    # Brute force nested loops (Sub-optimal)
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`)}
                          className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-[10px] cursor-pointer"
                        >
                          ⚠️ Brute Force O(n²)
                        </button>
                      </>
                    )}
                    {selectedCodeIndex === 1 && (
                      <>
                        <button
                          onClick={() => setCodeContent(`def reverse_list(head):
    # Optimal Iterative 3-pointer
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`)}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[10px] cursor-pointer"
                        >
                          ⚡ Iterative O(1)
                        </button>
                        <button
                          onClick={() => setCodeContent(`def reverse_list(head):
    # Recursive solution (O(n) call-stack memory)
    if not head or not head.next:
        return head
    reversed_head = reverse_list(head.next)
    head.next.next = head
    head.next = None
    return reversed_head`)}
                          className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-[10px] cursor-pointer"
                        >
                          ⚠️ Recursive O(n) Stack
                        </button>
                      </>
                    )}
                    {selectedCodeIndex === 2 && (
                      <>
                        <button
                          onClick={() => setCodeContent(`def is_palindrome(s):
    # In-place two pointers
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`)}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[10px] cursor-pointer"
                        >
                          ⚡ Two Pointer O(1)
                        </button>
                        <button
                          onClick={() => setCodeContent(`def is_palindrome(s):
    # String slicing (allocates extra copy)
    filtered = "".join(c.lower() for c in s if c.isalnum())
    return filtered == filtered[::-1]`)}
                          className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-[10px] cursor-pointer"
                        >
                          ⚠️ Slicing O(n) Space
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <textarea
                  rows={9}
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full p-4 bg-[#0a0f1d] border border-slate-800 rounded-b-xl text-emerald-400 focus:outline-none focus:border-rose-500 resize-none font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Run Button */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setCodeContent(sampleCodingChallenges[selectedCodeIndex].defaultCode)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Code
                </button>

                <button
                  onClick={handleEvaluateCode}
                  disabled={isEvaluatingCode}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                >
                  {isEvaluatingCode ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Algorithm...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run AI Code Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Complexity & Feedback */}
            <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Complexity & Logic Audit
                  </h4>
                  {codeResult && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      codeResult.verdictType === 'warning'
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                        : codeResult.verdictType === 'critical'
                        ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    }`}>
                      {codeResult.verdict}
                    </span>
                  )}
                </div>

                {!codeResult && !isEvaluatingCode && (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Code2 className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-xs">Click <strong>"Run AI Code Analysis"</strong> or choose an algorithm preset above to inspect loops, call stacks, and Big-O asymptotic bounds.</p>
                  </div>
                )}

                {isEvaluatingCode && (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-10 h-10 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-4" />
                    <p className="text-xs text-slate-300 font-mono">Computing Asymptotic Bounds...</p>
                    <p className="text-[11px] text-slate-500 mt-1">Inspecting loops, recursion stacks & auxiliary allocations</p>
                  </div>
                )}

                {codeResult && (
                  <div className="space-y-4">
                    {/* Complexity Badges */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Time Complexity</span>
                        <span className={`text-xl font-extrabold font-mono ${
                          codeResult.timeComplexity === 'O(n²)' ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {codeResult.timeComplexity}
                        </span>
                        <span className={`text-[10px] block mt-0.5 ${
                          codeResult.timeComplexity === 'O(n²)' ? 'text-amber-400 font-semibold' : 'text-emerald-400'
                        }`}>
                          {codeResult.timeComplexity === 'O(n²)' ? '⚠️ TLE Risk on N > 10⁴' : 'Optimal Bounds'}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Space Complexity</span>
                        <span className="text-xl font-extrabold text-pink-400 font-mono">{codeResult.spaceComplexity}</span>
                        <span className="text-[10px] text-emerald-400 block mt-0.5">Auxiliary Memory</span>
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Algorithmic Efficiency</span>
                        <span className="font-mono text-emerald-400 font-bold">{codeResult.efficiencyScore}/100</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Code Readability & Style</span>
                        <span className="font-mono text-rose-400 font-bold">{codeResult.readabilityScore}/100</span>
                      </div>
                    </div>

                    {/* Critique */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/20 text-xs">
                      <span className="text-[11px] font-bold text-rose-400 block mb-1">
                        Ollama LLM Critique:
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {codeResult.critique}
                      </p>
                    </div>

                    {/* Edge Cases */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <span className="text-[11px] font-bold text-indigo-400 block mb-1">
                        Edge Cases Verified:
                      </span>
                      <div className="space-y-1">
                        {codeResult.edgeCasesCovered.map((ec, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-slate-300 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{ec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {codeResult && (
                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                  <span>{codeResult.llmNotes}</span>
                  <span className={codeResult.verdictType === 'warning' ? 'text-amber-400' : codeResult.verdictType === 'critical' ? 'text-rose-400' : 'text-emerald-400'}>
                    {codeResult.verdictType === 'warning' ? '⚠️ Sub-optimal (Review Suggested)' : codeResult.verdictType === 'critical' ? '❌ Incomplete / Error' : '✓ Optimal Test Passed'}
                  </span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 4: STUDY PLANNER & DASHBOARD ================= */}
        {activeTab === 'planner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: 7-Day Adaptive Schedule */}
            <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Dynamic 7-Day Adaptive Roadmap</h3>
                    <p className="text-[11px] text-slate-400">Click any day to toggle completion and update readiness</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  Target: {userProfile.targetRole}
                </span>
              </div>

              <div className="space-y-3">
                {planTasks.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTaskCompletion(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      item.status === 'Completed'
                        ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        : item.status === 'In Progress'
                        ? 'bg-rose-950/30 border-rose-500/50 shadow-md'
                        : 'bg-slate-950/30 border-slate-800/50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          item.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : item.status === 'In Progress'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.day}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{item.focus}</h4>
                      </div>
                      <span className={`text-[11px] font-mono font-semibold ${
                        item.status === 'Completed' ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {item.status === 'Completed' ? '✓ Completed' : 'Pending'}
                      </span>
                    </div>

                    <ul className="space-y-1 pl-1">
                      {item.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-300 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Completed' ? 'bg-emerald-400' : 'bg-rose-400'
                          }`} />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Progress Analytics & Weak Area Diagnosis */}
            <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Student Progress Dashboard
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400">Real-Time Sync</span>
                </div>

                {/* Overall Diagnostic Bar */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-500/40 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">Aggregated Placement Readiness</span>
                    <span className="text-base font-extrabold text-rose-400 font-mono">{readinessPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500" style={{ width: `${readinessPercent}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {completedCount} of {planTasks.length} milestones completed for candidate <strong>{userProfile.name}</strong>.
                  </p>
                </div>

                {/* Skill Radar Progress Bars */}
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Data Structures & Algorithms</span>
                      <span className="font-mono text-emerald-400 font-bold">92%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Resume ATS Compatibility</span>
                      <span className="font-mono text-rose-400 font-bold">88%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Behavioral & STAR Communication</span>
                      <span className="font-mono text-indigo-400 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Dynamic Programming & Trees (Weak Spot)</span>
                      <span className="font-mono text-amber-400 font-bold">68%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>

                {/* Weakness Diagnostic Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Automated Weakness Detection
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Student exhibits hesitation on multi-variable Dynamic Programming states and System Design trade-offs. The Study Planner has dynamically rescheduled Day 4 to prioritize these two domains.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Stored in SQLite Database</span>
                <span className="text-emerald-400">Weekly Progress Report Ready</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
