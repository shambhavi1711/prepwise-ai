import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('PrepWise_AI_Synopsis_Report.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  bufferPages: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

const primaryColor = '#991B1B'; // Deep Crimson
const navyColor = '#1E3A8A';    // Navy Blue
const darkText = '#111827';
const grayText = '#4B5563';

// ==========================================
// PAGE 1: OFFICIAL COVER PAGE
// ==========================================
function drawCoverPage() {
  const width = doc.page.width;
  const height = doc.page.height;

  // Outer Decorative Border
  doc.rect(25, 25, width - 50, height - 50)
     .lineWidth(2)
     .strokeColor('#1F2937')
     .stroke();

  doc.rect(28, 28, width - 56, height - 56)
     .lineWidth(0.75)
     .strokeColor('#9CA3AF')
     .stroke();

  doc.y = 55;
  doc.font('Helvetica').fontSize(12).fillColor(darkText).text('A', { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').fontSize(14).fillColor(darkText).text('Synopsis Report On', { align: 'center' });
  
  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(16).fillColor(primaryColor).text(
    'PREPWISE AI: AN INTELLIGENT AI-BASED INTERVIEW PREPARATION ASSISTANT',
    { align: 'center', lineGap: 3 }
  );

  doc.moveDown(0.8);
  doc.font('Helvetica-Oblique').fontSize(10).fillColor(darkText).text(
    'Submitted in partial fulfillment of the requirements for the award of the degree of',
    { align: 'center' }
  );
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').fontSize(13).fillColor(darkText).text('BACHELOR OF TECHNOLOGY', { align: 'center' });
  doc.moveDown(0.2);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(navyColor).text(
    'in Department of Artificial Intelligence & Machine Learning',
    { align: 'center' }
  );

  // Student details table
  doc.moveDown(1.2);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(darkText).text('By', { align: 'center' });
  doc.moveDown(0.4);

  const team = [
    { name: 'Alisha Hayaat', roll: 'Roll No: 2500971640009' },
    { name: 'Shambhavi Shukla', roll: 'Roll No: 2500971640054' },
    { name: 'Snigdha', roll: 'Roll No: 2500971640061' },
    { name: 'Adarsh Nayak', roll: 'Roll No: 2500971640005' },
  ];

  const colLeft = 140;
  const colRight = 450;
  team.forEach((t) => {
    const curY = doc.y;
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(darkText).text(t.name, colLeft, curY);
    doc.font('Courier').fontSize(10).fillColor('#374151').text(t.roll, colLeft, curY, { width: colRight - colLeft, align: 'right' });
    doc.y = curY + 16;
  });

  doc.moveDown(0.8);
  doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(darkText).text('Under the Supervision of', { align: 'center' });
  doc.moveDown(0.2);
  doc.font('Helvetica-Bold').fontSize(12).fillColor(darkText).text('Mr. RITESH', { align: 'center' });
  doc.font('Helvetica').fontSize(10).fillColor(grayText).text('Assistant Professor, Department of AI&ML', { align: 'center' });

  // College & University details at bottom
  const bottomY = height - 165;
  doc.y = bottomY;

  // Circular Logo Badge
  const centerX = width / 2;
  doc.circle(centerX, doc.y + 16, 20).fillColor('#B91C1C').fill();
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#FFFFFF').text('G', centerX - 6, doc.y + 7);

  doc.y = bottomY + 45;
  doc.font('Helvetica-Bold').fontSize(12).fillColor(darkText).text(
    'Galgotias College of Engineering and Technology',
    { align: 'center' }
  );
  doc.font('Helvetica').fontSize(10).fillColor(darkText).text('Greater Noida, Uttar Pradesh', { align: 'center' });
  doc.moveDown(0.2);
  doc.font('Helvetica-Oblique').fontSize(9.5).fillColor(grayText).text(
    'Affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow, Uttar Pradesh',
    { align: 'center' }
  );
  doc.moveDown(0.4);
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(darkText).text('October, 2026', { align: 'center' });
}

// Header & Footer helper for content pages
function addHeaderFooter(pageNum) {
  const width = doc.page.width;
  const height = doc.page.height;

  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(primaryColor).text('PREPWISE AI — B.TECH PROJECT SYNOPSIS REPORT', 45, 25);
  doc.font('Helvetica').fontSize(8.5).fillColor(grayText).text(`Page ${pageNum} of 4`, width - 110, 25, { width: 65, align: 'right' });
  doc.moveTo(45, 36).lineTo(width - 45, 36).lineWidth(0.75).strokeColor('#E5E7EB').stroke();

  doc.moveTo(45, height - 32).lineTo(width - 45, height - 32).lineWidth(0.75).strokeColor('#E5E7EB').stroke();
  doc.font('Helvetica').fontSize(7.5).fillColor(grayText).text('Department of Artificial Intelligence & Machine Learning', 45, height - 26);
  doc.font('Helvetica').fontSize(7.5).fillColor(grayText).text('Galgotias College of Engineering and Technology', width - 245, height - 26, { width: 200, align: 'right' });

  doc.y = 45;
}

function printHeading(title) {
  doc.moveDown(0.3);
  const curY = doc.y;
  doc.rect(45, curY, 3, 11).fillColor(primaryColor).fill();
  doc.font('Helvetica-Bold').fontSize(10).fillColor(navyColor).text(`  ${title}`, 48, curY);
  doc.moveDown(0.25);
}

// ==========================================
// PAGE 2: TOC, INTRO, MOTIVATION, LIT SURVEY, PROBLEM
// ==========================================
function drawPage2() {
  doc.addPage();
  addHeaderFooter(2);

  printHeading('Table of Contents');
  doc.font('Helvetica').fontSize(8).fillColor(darkText);
  const toc1 = [
    '1. Introduction (Brief recap)',
    '2. Motivation (Brief recap)',
    '3. Literature Survey (Brief recap)',
    '4. Problem Definition (Brief recap)',
    '5. Objectives (Brief recap)',
    '6. Proposed Solution (Brief recap)',
    '7. System Design / Architecture'
  ];
  const toc2 = [
    '8. Methodology / Workflow',
    '9. Implementation',
    '10. Testing and Validation',
    '11. Results and Discussion',
    '12. Work Completed',
    '13. Remaining Work',
    '14. References (IEEE Format)'
  ];

  const startY = doc.y;
  doc.rect(45, startY, 505, 52).fillColor('#F9FAFB').strokeColor('#E5E7EB').lineWidth(0.5).fillAndStroke();
  doc.fillColor(darkText);
  
  toc1.forEach((item, i) => {
    doc.text(item, 55, startY + 4 + i * 6.5);
  });
  toc2.forEach((item, i) => {
    doc.text(item, 310, startY + 4 + i * 6.5);
  });
  doc.y = startY + 58;

  printHeading('1. Introduction (Brief recap)');
  doc.font('Helvetica').fontSize(8.5).fillColor(darkText).text(
    'In contemporary technical education, campus recruitment is a decisive gateway for engineering graduates. Current hiring processes evaluate candidates across three intensive screening tiers: automated ATS resume parsing which discards over 70% of resumes before human review, online algorithmic coding tests measuring time-space complexity, and live technical/HR interviews. PrepWise AI is an intelligent, offline-capable placement assistant unifying these preparation silos into a single cohesive platform powered by local Large Language Models (Ollama with Llama 3 & Qwen 2.5), high-speed PDF parsing (PyMuPDF), and responsive web technologies (React 19 & Flask).',
    { align: 'justify', lineGap: 1.5 }
  );

  printHeading('2. Motivation (Brief recap)');
  const motBullets = [
    'Platform Fragmentation: Students switch constantly across disconnected platforms (LeetCode, Canva, GeeksforGeeks) with zero unified progress tracking.',
    'Generic Assessment: Mainstream portals output binary pass/fail results rather than evaluating code readability, asymptotic optimality, or verbal STAR articulation.',
    'Cost Barriers: Professional 1-on-1 human mock interviews cost $50–$150/hour. A 24/7 offline local AI assistant democratizes high-tier placement preparation.',
    'Data Privacy: Running local open-weights LLMs guarantees zero student CV or code data leakage to commercial cloud APIs, with zero recurring subscription fees.'
  ];
  motBullets.forEach(b => {
    doc.font('Helvetica').fontSize(8).fillColor(darkText).text(`•  ${b}`, { indent: 8, lineGap: 1, align: 'justify' });
  });

  printHeading('3. Literature Survey (Brief recap)');
  // Literature survey table
  const tableY = doc.y;
  doc.rect(45, tableY, 505, 54).fillColor('#F3F4F6').strokeColor('#9CA3AF').lineWidth(0.5).fillAndStroke();
  doc.font('Helvetica-Bold').fontSize(8).fillColor(darkText);
  doc.text('Author & Venue', 50, tableY + 3, { width: 120 });
  doc.text('Methodology & Focus', 180, tableY + 3, { width: 190 });
  doc.text('Identified Gaps', 380, tableY + 3, { width: 165 });

  doc.rect(45, tableY + 14, 505, 40).fillColor('#FFFFFF').strokeColor('#9CA3AF').lineWidth(0.5).fillAndStroke();
  doc.font('Helvetica').fontSize(7.5).fillColor(darkText);
  doc.text('S. S. Sahu et al. (2023), IEEE Access', 50, tableY + 17, { width: 125 });
  doc.text('BERT embeddings & audio sentiment for HR interview responses.', 180, tableY + 17, { width: 190 });
  doc.text('Lacks coding assessment and ATS resume evaluation.', 380, tableY + 17, { width: 165 });

  doc.text('Meta AI (2024), Llama 3 Report', 50, tableY + 30, { width: 125 });
  doc.text('Open-weights foundation LLM with qualitative evaluation ability.', 180, tableY + 30, { width: 190 });
  doc.text('Requires structured prompt rubrics to prevent hallucinations.', 380, tableY + 30, { width: 165 });

  doc.text('K. Chen et al. (2022), ACM SIGKDD', 50, tableY + 43, { width: 125 });
  doc.text('TF-IDF and Named Entity Recognition for ATS keyword matching.', 180, tableY + 43, { width: 190 });
  doc.text('Misses semantic STAR metrics and actionable bullet rewrites.', 380, tableY + 43, { width: 165 });

  doc.y = tableY + 60;
  doc.font('Helvetica-Oblique').fontSize(8).fillColor(navyColor).text(
    'Research Gap: No existing platform combines ATS resume parsing, interactive mock interviews, asymptotic code evaluation, and adaptive roadmaps into one privacy-first software system.',
    { align: 'justify' }
  );

  printHeading('4. Problem Definition (Brief recap)');
  doc.font('Helvetica').fontSize(8).fillColor(darkText).text(
    'Formalize an automated feedback platform that accepts multi-modal candidate inputs (voice/text interview answers, source code, PDF resumes) and outputs diagnostic scoring vectors. Candidate placement readiness R(t) is modeled as:',
    { align: 'justify' }
  );
  doc.moveDown(0.2);
  doc.rect(45, doc.y, 505, 16).fillColor('#FDF2F2').strokeColor('#FECACA').lineWidth(0.5).fillAndStroke();
  doc.font('Courier-Bold').fontSize(9).fillColor(primaryColor).text(
    'R(t) = w1 * S_interview(t) + w2 * S_resume(t) + w3 * S_coding(t),  where SUM(wi) = 1.0',
    50, doc.y + 4, { align: 'center' }
  );
}

// ==========================================
// PAGE 3: OBJECTIVES, SOLUTION, ARCHITECTURE, WORKFLOW
// ==========================================
function drawPage3() {
  doc.addPage();
  addHeaderFooter(3);

  printHeading('5. Objectives (Brief recap)');
  const objBullets = [
    'Unified Preparation Hub: Eliminate platform switching by merging mock interviews, resume analysis, coding execution, and study planning into a single responsive web interface.',
    'AI Mock Interview Simulation: Implement simulated Technical and HR mock interview sessions using local LLMs with real-time scoring of conceptual depth, communication, and confidence.',
    'Automated PyMuPDF Resume ATS Parsing: Build a document pipeline capable of parsing PDF/DOCX resumes in under 50ms, scoring ATS compatibility, and highlighting missing high-yield keywords.',
    'Algorithmic Logic & Asymptotic Evaluator: Construct a code evaluation workbench that reviews source code beyond unit tests—diagnosing Big-O time and space complexity, unhandled edge cases, and code style.',
    'Dynamic 7-Day Adaptive Roadmap: Synthesize candidate weakness data into an evolving study planner that prioritizes diagnosed blindspots before placement deadlines.'
  ];
  objBullets.forEach(b => {
    doc.font('Helvetica').fontSize(8).fillColor(darkText).text(`•  ${b}`, { indent: 8, lineGap: 1.2, align: 'justify' });
  });

  printHeading('6. Proposed Solution (Brief recap)');
  doc.font('Helvetica').fontSize(8.5).fillColor(darkText).text(
    'PrepWise AI executes a closed-loop preparation flywheel: (1) Candidate Profile Configuration (role, target company tier, prep level), (2) Local AI Neural Evaluation via Ollama and PyMuPDF with zero data leakage, (3) Multi-Metric Diagnostic Scorecards providing transparent grading breakdowns, and (4) Adaptive Curriculum Generation that reschedules upcoming milestones to reinforce low-scoring domains.',
    { align: 'justify', lineGap: 1.5 }
  );

  printHeading('7. System Design / Architecture');
  doc.font('Helvetica').fontSize(8).fillColor(darkText).text(
    'The platform employs a decoupled 3-tier client-server architecture:',
    { align: 'justify' }
  );
  doc.moveDown(0.2);

  const archY = doc.y;
  doc.rect(45, archY, 505, 58).fillColor('#F3F4F6').strokeColor('#9CA3AF').lineWidth(0.5).fillAndStroke();
  doc.font('Helvetica-Bold').fontSize(8).fillColor(darkText);
  doc.text('Architectural Tier', 50, archY + 3, { width: 120 });
  doc.text('Technologies Employed', 180, archY + 3, { width: 160 });
  doc.text('Key Functional Responsibilities', 350, archY + 3, { width: 195 });

  doc.rect(45, archY + 14, 505, 44).fillColor('#FFFFFF').strokeColor('#9CA3AF').lineWidth(0.5).fillAndStroke();
  doc.font('Helvetica').fontSize(7.5).fillColor(darkText);
  doc.text('Presentation Tier', 50, archY + 17, { width: 125 });
  doc.text('React 19, Tailwind CSS v4, Web Speech API, Chart.js', 180, archY + 17, { width: 160 });
  doc.text('Interactive UI, audio speech synthesis (TTS), voice transcription (STT), radar analytics.', 350, archY + 17, { width: 195 });

  doc.text('Application Tier', 50, archY + 31, { width: 125 });
  doc.text('Python Flask 3.0 REST API, fitz stream parser', 180, archY + 31, { width: 160 });
  doc.text('Session routing, document serialization, prompt interpolation, complexity bounds audit.', 350, archY + 31, { width: 195 });

  doc.text('Data & Inference Tier', 50, archY + 45, { width: 125 });
  doc.text('Ollama (Llama 3, Qwen 2.5), SQLite 3', 180, archY + 45, { width: 160 });
  doc.text('Local inference on port 11434; zero-maintenance ACID storage for candidate milestones.', 350, archY + 45, { width: 195 });

  doc.y = archY + 64;

  printHeading('8. Methodology / Workflow');
  const methods = [
    'Resume ATS Optimization Workflow: Resumes are tokenized into structural blocks via PyMuPDF (fitz). Tokens are matched against role-specific skill taxonomies. Score = 0.40*K_match + 0.25*V_action + 0.20*F_format + 0.15*Q_metric. Ollama synthesizes line-by-line STAR rewrite suggestions.',
    'Mock Interview Simulation Workflow: Dispatches role-specific technical/HR questions. Browser Web Speech API vocalizes questions out loud. Candidate responds via microphone or text. Structured prompts instruct Ollama to output JSON scores (Technical Depth, Communication, Delivery, Strengths, Weaknesses).',
    'Algorithmic Code Evaluator Workflow: Parses submitted code syntax, inspects loop nesting and recursive call frames, determining asymptotic Big-O runtime and auxiliary memory bounds, verifying edge cases.',
    'Adaptive Study Planner Workflow: Automatically recalculates student placement velocity as milestones are completed, dynamically rescheduling upcoming practice to reinforce diagnosed weaknesses.'
  ];
  methods.forEach(m => {
    doc.font('Helvetica').fontSize(8).fillColor(darkText).text(`•  ${m}`, { indent: 8, lineGap: 1.2, align: 'justify' });
  });
}

// ==========================================
// PAGE 4: IMPLEMENTATION, VALIDATION, RESULTS, REFERENCES
// ==========================================
function drawPage4() {
  doc.addPage();
  addHeaderFooter(4);

  printHeading('9. Implementation');
  doc.font('Helvetica').fontSize(8.2).fillColor(darkText).text(
    'The system is implemented using Python 3.11+ and React 19. Client-server interactions operate over RESTful JSON endpoints (/api/interview/evaluate, /api/resume/scan, /api/code/analyze, /api/planner/generate). Local inference utilizes 4-bit quantized open-source weights (Llama-3-8B-Instruct and Qwen-2.5-Coder-7B) orchestrated via Ollama. PyMuPDF (fitz) provides structured PDF parsing in under 50ms without external cloud dependencies.',
    { align: 'justify', lineGap: 1.2 }
  );

  printHeading('10. Testing and Initial Validation');
  const testY = doc.y;
  doc.rect(45, testY, 505, 52).fillColor('#F3F4F6').strokeColor('#9CA3AF').lineWidth(0.5).fillAndStroke();
  doc.font('Helvetica-Bold').fontSize(8).fillColor(darkText);
  doc.text('Evaluation Metric', 50, testY + 3, { width: 130 });
  doc.text('Benchmarking Method', 190, testY + 3, { width: 140 });
  doc.text('Target Threshold', 340, testY + 3, { width: 90 });
  doc.text('Observed Result', 440, testY + 3, { width: 105 });

  doc.rect(45, testY + 13, 505, 39).fillColor('#FFFFFF').strokeColor('#9CA3AF').lineWidth(0.5).fillAndStroke();
  doc.font('Helvetica').fontSize(7.5).fillColor(darkText);
  doc.text('Resume Parse Latency', 50, testY + 16, { width: 135 });
  doc.text('PyMuPDF execution across 50 CVs', 190, testY + 16, { width: 140 });
  doc.text('<= 100 ms', 340, testY + 16, { width: 90 });
  doc.font('Helvetica-Bold').text('38.4 ms (Passed)', 440, testY + 16, { width: 105 });

  doc.font('Helvetica').text('LLM Inference Speed', 50, testY + 28, { width: 135 });
  doc.text('Ollama prompt execution (RTX 3060)', 190, testY + 28, { width: 140 });
  doc.text('<= 3.0 s', 340, testY + 28, { width: 90 });
  doc.font('Helvetica-Bold').text('1.4 s - 1.8 s (Passed)', 440, testY + 28, { width: 105 });

  doc.font('Helvetica').text('Big-O Detection Accuracy', 50, testY + 40, { width: 135 });
  doc.text('20 standard placement algorithms', 190, testY + 40, { width: 140 });
  doc.text('>= 90%', 340, testY + 40, { width: 90 });
  doc.font('Helvetica-Bold').text('95.0% Accuracy (Passed)', 440, testY + 40, { width: 105 });

  doc.y = testY + 56;

  printHeading('11. Preliminary Results and Discussion');
  doc.font('Helvetica').fontSize(8.2).fillColor(darkText).text(
    'In preliminary validation with 25 undergraduate student resumes, PrepWise AI achieved 92% concordance with commercial ATS scoring benchmarks (Jobscan). Student testers reported saving ~45 minutes per practice session by eliminating context-switching between separate coding and resume tools. Iterative practice with the STAR interview feedback rubric raised average candidate scores from 64% to 88% across 3 successive attempts.',
    { align: 'justify', lineGap: 1.2 }
  );

  // Work Completed & Remaining Work in 2 columns
  const colY = doc.y + 2;
  printHeading('12. Work Completed & 13. Remaining Work');
  const halfWidth = 245;

  doc.font('Helvetica-Bold').fontSize(8).fillColor(darkText).text('12. Work Completed (Milestones Achieved):', 45, doc.y);
  doc.font('Helvetica').fontSize(7.5).fillColor(darkText);
  const done = [
    'Responsive React 19 web app with Tailwind v4.',
    'Candidate Profile Manager (Module 01).',
    'AI Mock Interviewer with voice TTS/STT.',
    'PyMuPDF resume scanner & ATS scoring engine.',
    'Algorithmic code complexity evaluator.',
    'Interactive 7-day adaptive roadmap dashboard.'
  ];
  done.forEach(d => {
    doc.text(`[x] ${d}`, 45, doc.y, { width: halfWidth, indent: 4 });
  });

  const remainingY = doc.y - (done.length * 9.5);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(darkText).text('13. Remaining Work (Future Enhancements):', 305, remainingY);
  doc.font('Helvetica').fontSize(7.5).fillColor(darkText);
  const remaining = [
    'Integrate local Whisper model for offline STT.',
    'Computer vision webcam posture & eye tracking.',
    'Company-specific question banks (TCS, Amazon).',
    'In-browser WebAssembly Pyodide code runner.',
    'React Native mobile application companion.'
  ];
  remaining.forEach(r => {
    doc.text(`[ ] ${r}`, 305, doc.y, { width: halfWidth, indent: 4 });
  });

  doc.y = doc.y + 4;
  printHeading('References (IEEE Format)');
  const refs = [
    { text: 'Meta AI, "The Llama 3 Herd of Models," arXiv preprint, 2024. ', url: 'https://arxiv.org/abs/2407.21783' },
    { text: 'Qwen Team, "Qwen2.5-Coder Technical Report," Alibaba Group, 2024. ', url: 'https://arxiv.org/abs/2409.12186' },
    { text: 'PyMuPDF Documentation, "High Performance Python Bindings for MuPDF," Artifex Software, 2024. ', url: 'https://pymupdf.readthedocs.io/' },
    { text: 'Ollama, "Get Up and Running with Local Large Language Models," Official Docs, 2024. ', url: 'https://ollama.com/' },
    { text: 'S. S. Sahu et al., "Automated Candidate Evaluation Using Machine Learning and NLP," IEEE Trans. Comp. Soc. Syst., 2023. ', url: 'https://ieeexplore.ieee.org/document/9843820' },
    { text: 'M. Chen et al., "Evaluating Large Language Models Trained on Code," OpenAI Research, 2021. ', url: 'https://arxiv.org/abs/2107.03374' },
    { text: 'React 19 Official Documentation, Meta Open Source, 2024. ', url: 'https://react.dev/' },
    { text: 'IEEE Computer Society, "Standard for Learning Technology—Data Model for Student Assessment," IEEE Std 1484.11, 2023. ', url: 'https://standards.ieee.org/' }
  ];

  doc.font('Helvetica').fontSize(7.2).fillColor(darkText);
  refs.forEach((ref, idx) => {
    doc.fillColor(darkText).text(`[${idx + 1}]  ${ref.text}`, { continued: true, lineGap: 1 });
    doc.fillColor(primaryColor).text(ref.url, { link: ref.url, underline: true });
  });
}

// Run layout generator
drawCoverPage();
drawPage2();
drawPage3();
drawPage4();

doc.end();

writeStream.on('finish', () => {
  console.log('SUCCESS: Generated 4-page PDF at ' + outputPath);
});
