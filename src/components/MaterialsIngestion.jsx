import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Presentation, 
  Video, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  FolderPlus,
  Sparkles,
  Layers,
  Database
} from 'lucide-react';
import { mockMaterials } from '../mockData';

export function MaterialsIngestion({ onStartGeneration }) {
  const [materials, setMaterials] = useState(mockMaterials);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: `mat-${Date.now()}`,
        name: "Lecture_09_Inverted_Page_Tables_and_Hashing.pptx",
        type: "ppt",
        size: "12.4 MB",
        slides: 34,
        status: "indexed",
        topicsExtracted: 4,
        chunks: 52,
        uploadedAt: "Just now"
      };
      setMaterials(prev => [newDoc, ...prev]);
      setIsUploading(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Upload Zone */}
      <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', border: '2px dashed rgba(99, 102, 241, 0.4)' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          color: '#818cf8'
        }}>
          <Upload size={28} />
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
          Upload Course Material (Multimodal Ingestion)
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 1.25rem' }}>
          Upload PDF textbooks, PowerPoint slide decks (.pptx), or lecture video recordings (.mp4). Automatic PyMuPDF parsing, PaddleOCR diagram recognition, and Whisper transcript sync will run automatically.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button 
            id="btn-upload-file-sim"
            className="btn btn-primary"
            onClick={handleSimulateUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <RefreshCw size={16} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} />
                Processing Ingestion Pipeline...
              </>
            ) : (
              <>
                <FolderPlus size={16} />
                Upload New Course File
              </>
            )}
          </button>

          <button 
            id="btn-launch-generating-screen"
            className="btn btn-outline-indigo"
            onClick={onStartGeneration}
          >
            <Sparkles size={16} />
            Generate Knowledge Base
          </button>
        </div>
      </div>

      {/* Materials Table Card */}
      <div className="glass-card">
        <div className="glass-card-header">
          <div className="card-title-group">
            <Database size={20} color="#818cf8" />
            <div>
              <h3 className="card-title">Indexed Course Sources</h3>
              <p className="card-subtitle">Every chunk retains strict source coordinates for zero-hallucination citations</p>
            </div>
          </div>
          <span className="badge badge-indigo">{materials.length} Sources Active</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {materials.map((mat) => (
            <div 
              key={mat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                background: 'rgba(31, 41, 55, 0.45)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: mat.type === 'pdf' ? 'rgba(99, 102, 241, 0.15)' : mat.type === 'ppt' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: mat.type === 'pdf' ? '#818cf8' : mat.type === 'ppt' ? '#67e8f9' : '#f43f5e'
                }}>
                  {mat.type === 'pdf' ? <FileText size={20} /> : mat.type === 'ppt' ? <Presentation size={20} /> : <Video size={20} />}
                </div>

                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>{mat.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {mat.size} • {mat.pages ? `${mat.pages} Pages` : mat.slides ? `${mat.slides} Slides` : `Duration: ${mat.duration}`} • Uploaded {mat.uploadedAt}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c7d2fe', fontFamily: 'monospace' }}>
                    {mat.chunks || mat.transcriptChunks} Grounded Chunks
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    pgvector index status
                  </div>
                </div>

                <span className={`badge ${mat.status === 'indexed' ? 'badge-emerald' : 'badge-amber'}`}>
                  {mat.status === 'indexed' ? (
                    <>
                      <CheckCircle2 size={12} />
                      Indexed
                    </>
                  ) : (
                    <>
                      <Clock size={12} />
                      Processing
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
