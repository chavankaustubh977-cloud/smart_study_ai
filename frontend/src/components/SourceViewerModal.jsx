import React from 'react';

export function SourceViewerModal({ citation, onClose }) {
  if (!citation) return null;

  const docType = citation.type || citation.docType || 'pdf';
  const title = citation.title || citation.book || citation.label || "Course Material";
  const location = citation.location || (citation.page ? `Page ${citation.page}` : citation.slide ? `Slide ${citation.slide}` : citation.timestamp || "Reference");
  const excerpt = citation.excerpt || citation.snippet || "Course reference text.";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--secondary-container)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                {docType === 'video' ? 'play_circle' : docType === 'ppt' || docType === 'slides' ? 'slideshow' : 'picture_as_pdf'}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--on-surface)' }}>
                Course Reference
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
                {title}
              </p>
            </div>
          </div>

          <button
            className="btn-ghost"
            onClick={onClose}
            style={{ padding: '0.25rem', color: 'var(--on-surface-variant)' }}
            title="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Location & Context */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>Location:</span>
            <span className="pill-badge pill-primary">
              {location}
            </span>
          </div>

          <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>verified</span>
            <span>Course Grounded</span>
          </span>
        </div>

        {/* Excerpt Display */}
        {docType === 'video' ? (
          <div
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--surface-container-low)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.75rem'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary-container)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>play_circle</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)' }}>
              Lecture playback synced to {location}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', maxWidth: '420px', lineHeight: 1.45 }}>
              "{excerpt}"
            </p>
          </div>
        ) : (
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--surface-container-low)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Document Excerpt
            </div>
            <div
              style={{
                fontSize: '0.92rem',
                color: 'var(--on-surface)',
                lineHeight: 1.6,
                borderLeft: '3px solid var(--primary)',
                paddingLeft: '0.85rem'
              }}
            >
              {excerpt}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
