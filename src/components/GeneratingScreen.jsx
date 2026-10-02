import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Zap, 
  RefreshCw, 
  Play, 
  Pause, 
  ChevronRight, 
  Terminal, 
  FileText, 
  Video, 
  Presentation, 
  Database,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code
} from 'lucide-react';
import { mockGeneratingPipeline } from '../mockData';

export function GeneratingScreen({ onNavigateToTutor, onNavigateToQuiz }) {
  const [pipeline, setPipeline] = useState(mockGeneratingPipeline);
  const [activeStageIndex, setActiveStageIndex] = useState(3); // stage 4 is currently processing
  const [selectedStage, setSelectedStage] = useState(mockGeneratingPipeline.stages[3]);
  const [isPaused, setIsPaused] = useState(false);
  const [liveLogs, setLiveLogs] = useState(mockGeneratingPipeline.liveLogs);
  const [tokensCount, setTokensCount] = useState(mockGeneratingPipeline.totalTokensGenerated);

  // Simulate real-time generation activity
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTokensCount(prev => prev + Math.floor(Math.random() * 14) + 6);
      
      // Occasionally add a new log line
      if (Math.random() > 0.65) {
        const sampleLogs = [
          `[00:${Math.floor(Math.random()*40 + 25)}.8] Reranker validation: cross-encoder similarity score = 0.942`,
          `[00:${Math.floor(Math.random()*40 + 25)}.2] Source Grounding check: [Silberschatz p.245] mapped to diagnostic question`,
          `[00:${Math.floor(Math.random()*40 + 25)}.9] Prerequisite validation: verified acyclic concept graph`,
          `[00:${Math.floor(Math.random()*40 + 25)}.4] Token stream active: synthesizing explanation rationale...`
        ];
        const nextLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        setLiveLogs(prev => [...prev.slice(-12), nextLog]);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSimulateFinish = () => {
    setPipeline(prev => ({
      ...prev,
      progressPercent: 100,
      status: "completed",
      estimatedRemaining: 0,
      stages: prev.stages.map(st => ({ ...st, status: "completed" }))
    }));
    setLiveLogs(prev => [
      ...prev,
      "[COMPLETE] All 5 pipeline stages finished. Knowledge base & adaptive assessments ready for student interaction."
    ]);
  };

  const handleResetSimulation = () => {
    setPipeline(mockGeneratingPipeline);
    setLiveLogs(mockGeneratingPipeline.liveLogs);
    setTokensCount(mockGeneratingPipeline.totalTokensGenerated);
  };

  return (
    <div className="generating-container">
      {/* Stitch Design Spec Header Banner */}
      <div className="generating-banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div className="stitch-project-pill">
            <Code size={14} color="#818cf8" />
            <span>Stitch Project ID: <strong>{pipeline.projectId}</strong></span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
            <span>Screen ID: <strong>{pipeline.screenId}</strong></span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-indigo">
              <Sparkles size={12} />
              ScholarAI Adaptive Engine
            </span>
            <span className={`badge ${pipeline.status === 'completed' ? 'badge-emerald' : 'badge-cyan'}`}>
              {pipeline.status === 'completed' ? (
                <>
                  <CheckCircle2 size={12} />
                  Generation Ready
                </>
              ) : (
                <>
                  <span className="nav-tab-pulse-badge"></span>
                  Active Synthesis ({pipeline.progressPercent}%)
                </>
              )}
            </span>
          </div>
        </div>

        <div className="generating-header-row" style={{ marginTop: '0.85rem' }}>
          <div>
            <h1 className="generating-main-title">
              <Cpu size={32} color="#818cf8" />
              Generating Screen...
            </h1>
            <p className="generating-target-desc">
              Currently generating multimodal knowledge nodes, topic prerequisite graph, and source-grounded diagnostic questions for <strong>{pipeline.targetUnit}</strong> in <em>{pipeline.targetCourse}</em>.
            </p>
          </div>

          <div className="generating-actions">
            <button 
              id="btn-pause-simulation"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>

            {pipeline.status !== 'completed' ? (
              <button 
                id="btn-fast-forward"
                className="btn btn-primary btn-sm"
                onClick={handleSimulateFinish}
              >
                <Zap size={14} />
                Instant Complete
              </button>
            ) : (
              <button 
                id="btn-reset-generation"
                className="btn btn-secondary btn-sm"
                onClick={handleResetSimulation}
              >
                <RefreshCw size={14} />
                Restart Pipeline
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Track */}
        <div className="overall-progress-track">
          <div 
            className="overall-progress-fill" 
            style={{ width: `${pipeline.progressPercent}%` }}
          ></div>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="progress-metrics-bar">
          <div className="metric-pill">
            <span className="metric-label">Pipeline Progress</span>
            <span className="metric-val" style={{ color: '#67e8f9' }}>
              {pipeline.progressPercent}%
            </span>
          </div>
          <div className="metric-pill">
            <span className="metric-label">Tokens Synthesized</span>
            <span className="metric-val" style={{ color: '#c7d2fe' }}>
              {tokensCount.toLocaleString()}
            </span>
          </div>
          <div className="metric-pill">
            <span className="metric-label">Active Engine</span>
            <span className="metric-val" style={{ fontSize: '1rem', color: '#a7f3d0' }}>
              <ShieldCheck size={16} color="#34d399" />
              Groq + pgvector
            </span>
          </div>
          <div className="metric-pill">
            <span className="metric-label">Estimated Time Left</span>
            <span className="metric-val" style={{ color: '#fde047' }}>
              <Clock size={16} />
              {pipeline.status === 'completed' ? '0s (Done)' : `${pipeline.estimatedRemaining}s`}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Stages Pipeline vs Live Terminal & Graph */}
      <div className="generating-grid">
        {/* Left: Stages Pipeline Accordion */}
        <div className="glass-card pipeline-steps-card">
          <div className="glass-card-header">
            <div className="card-title-group">
              <Layers size={20} color="#818cf8" />
              <div>
                <h3 className="card-title">Generation & Ingestion Stages</h3>
                <p className="card-subtitle">Click any stage to inspect verified outputs and source links</p>
              </div>
            </div>
            <span className="badge badge-indigo">5 Stages</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {pipeline.stages.map((stage, idx) => {
              const isSelected = selectedStage?.id === stage.id;
              const isProcessing = stage.status === 'processing';
              const isCompleted = stage.status === 'completed';

              return (
                <div 
                  key={stage.id}
                  id={`stage-card-${stage.id}`}
                  className={`stage-item ${isSelected ? 'stage-active' : ''}`}
                  onClick={() => setSelectedStage(stage)}
                >
                  <div className="stage-icon-col">
                    <div className={`stage-circle ${stage.status}`}>
                      {isCompleted ? (
                        <CheckCircle2 size={18} />
                      ) : isProcessing ? (
                        <RefreshCw size={16} className="animate-spin" style={{ animation: 'spin 2s linear infinite' }} />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  <div className="stage-content-col">
                    <div className="stage-title-row">
                      <span className="stage-label">{stage.label}</span>
                      <span className="stage-items-badge">{stage.duration}</span>
                    </div>
                    <p className="stage-subtext">{stage.subtext}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.75rem', color: isProcessing ? '#38bdf8' : '#9ca3af', fontFamily: 'monospace' }}>
                        {stage.itemsProcessed}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>
                        {isSelected ? 'Viewing Details ▼' : 'Click to inspect ▶'}
                      </span>
                    </div>

                    {/* Expandable details when selected */}
                    {isSelected && stage.details && stage.details.length > 0 && (
                      <div className="stage-expanded-drawer">
                        {stage.details.map((detail, dIdx) => (
                          <div key={dIdx} className="stage-drawer-item">
                            <span className="stage-drawer-bullet">•</span>
                            <div>
                              <strong style={{ color: '#fff' }}>{detail.name}:</strong>{' '}
                              <span>{detail.result}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA to transition to Tutor or Quiz */}
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button 
              id="cta-open-grounded-tutor"
              className="btn btn-secondary btn-sm"
              onClick={onNavigateToTutor}
            >
              Open Grounded Tutor Chat
              <ArrowRight size={14} />
            </button>
            <button 
              id="cta-open-adaptive-quiz"
              className="btn btn-primary btn-sm"
              onClick={onNavigateToQuiz}
            >
              Start Adaptive Diagnostic
              <Sparkles size={14} />
            </button>
          </div>
        </div>

        {/* Right: Live Terminal & Source Grounding Verifier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Terminal Window */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot dot-red"></div>
                <div className="terminal-dot dot-yellow"></div>
                <div className="terminal-dot dot-green"></div>
              </div>
              <div className="terminal-title">scholar-ai-worker@generation-node:~$</div>
              <Terminal size={14} color="#64748b" />
            </div>

            <div className="terminal-body" id="live-terminal-body">
              <div style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>
                === SCHOLARAI MULTIMODAL INGESTION & ASSESSMENT PIPELINE ===
              </div>
              {liveLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`terminal-line ${index === liveLogs.length - 1 ? 'active' : ''}`}
                >
                  {log}
                </div>
              ))}
              <div>
                <span style={{ color: '#818cf8' }}>&gt;</span> worker executing active synthesis
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>

          {/* Source Grounding Assurance Card (Mandatory Rule 3 & 4) */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <ShieldCheck size={20} color="#34d399" />
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                  Track D Grounding & Citation Guarantees
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Strict adherence to course material (Silberschatz + Lecture 7 & 8)
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <FileText size={16} color="#818cf8" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>100% Grounded</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Zero invented pages</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <Presentation size={16} color="#67e8f9" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Slide Bounds</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Exact slide # preserved</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <Video size={16} color="#f43f5e" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Whisper Sync</div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>0.1s audio stamps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
