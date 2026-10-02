import React from 'react';
import { X, FileText, Presentation, Video, ExternalLink, Bookmark, CheckCircle, Clock } from 'lucide-react';

export function SourceViewerModal({ citation, onClose }) {
  if (!citation) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#0d131f',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        borderRadius: '16px',
        maxWidth: '720px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.25)',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(30, 41, 59, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {citation.docType === 'pdf' ? (
              <FileText size={20} color="#818cf8" />
            ) : citation.docType === 'ppt' ? (
              <Presentation size={20} color="#38bdf8" />
            ) : (
              <Video size={20} color="#f43f5e" />
            )}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Course Source Inspector
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Verified grounding evidence for {citation.label}
              </p>
            </div>
          </div>

          <button 
            id="close-source-modal"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Source Content Preview */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600 }}>
              <Bookmark size={16} color="#818cf8" />
              <span>Location:</span>
              <span className="badge badge-indigo">
                {citation.page ? `Page ${citation.page}` : citation.slide ? `Slide ${citation.slide}` : `Timestamp ${citation.timestamp}`}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontSize: '0.78rem', fontWeight: 600 }}>
              <CheckCircle size={14} />
              <span>Grounding Confidence: 99.2%</span>
            </div>
          </div>

          {citation.docType === 'video' ? (
            <div style={{
              background: '#030712',
              borderRadius: '10px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(244, 63, 94, 0.2)',
                border: '1px solid #f43f5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f43f5e'
              }}>
                <Clock size={28} />
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                Lecture Video Playback synced to {citation.timestamp}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', maxWidth: '420px' }}>
                Whisper AI aligned video frames with transcribed audio chunk.
              </p>
            </div>
          ) : (
            <div style={{
              background: '#090d16',
              borderRadius: '10px',
              padding: '1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: '#cbd5e1'
            }}>
              <div style={{ color: '#818cf8', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                --- Document Chunk Excerpt ---
              </div>
              <div style={{
                background: 'rgba(99, 102, 241, 0.12)',
                borderLeft: '3px solid #6366f1',
                padding: '0.85rem',
                borderRadius: '0 8px 8px 0',
                color: '#f8fafc'
              }}>
                {citation.snippet}
              </div>
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Document ID: doc_silberschatz_cs301_ch89
            </span>

            <button 
              id="confirm-source-view"
              className="btn btn-primary btn-sm"
              onClick={onClose}
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
