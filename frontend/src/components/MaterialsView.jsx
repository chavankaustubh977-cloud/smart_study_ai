import React, { useState } from 'react';

export function MaterialsView({
  materials,
  setMaterials,
  onNavigate,
  onOpenCitation
}) {
  const [formatFilter, setFormatFilter] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newFormat, setNewFormat] = useState('pdf');
  const [newFileMeta, setNewFileMeta] = useState('');

  const filteredMaterials = materials.filter((mat) => {
    if (formatFilter === 'all') return true;
    if (formatFilter === 'pdf') return mat.format === 'pdf';
    if (formatFilter === 'slides') return mat.format === 'slides' || mat.format === 'ppt';
    if (formatFilter === 'video') return mat.format === 'video';
    return true;
  });

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMat = {
      id: `mat-${Date.now()}`,
      title: newTitle.trim(),
      format: newFormat,
      meta: newFileMeta.trim() || (newFormat === 'pdf' ? '24 pages • Added today' : newFormat === 'slides' ? '32 slides • Added today' : '45 min • Added today'),
      badge: newFormat === 'pdf' ? 'Readings' : newFormat === 'slides' ? 'Class Slides' : 'Recording',
      highlight: newFormat === 'video' ? 'Audio transcript synced' : 'Indexed notes available',
      status: 'ready',
      citationRef: {
        type: newFormat,
        title: newTitle.trim(),
        location: newFormat === 'pdf' ? 'Page 1' : newFormat === 'slides' ? 'Slide 1' : '00:00',
        excerpt: `Passage excerpt extracted from ${newTitle.trim()}. Indexed and source-grounded for student tutor queries.`
      }
    };

    setMaterials([newMat, ...materials]);
    setNewTitle('');
    setNewFileMeta('');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="page-container-wide">
      {/* Top Academic Context Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--primary)', letterSpacing: '0.04em' }}>PSYC 304</span>
              <span style={{ color: 'var(--outline-variant)' }}>•</span>
              <span style={{ color: 'var(--on-surface-variant)' }}>Spring Quarter 2025</span>
              <span style={{ color: 'var(--outline-variant)' }}>•</span>
              <span className="pill-badge pill-primary" style={{ gap: '0.35rem', padding: '0.15rem 0.55rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                Live Syllabus
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
              Cognitive Psychology
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="btn-primary"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              <span>Add material</span>
            </button>
          </div>
        </div>

        {/* Course Navigation Bar */}
        <div className="course-tabs-bar">
          <button className="course-tab-btn" onClick={() => onNavigate('course-overview')}>
            Overview
          </button>
          <button className="course-tab-btn active" onClick={() => onNavigate('materials')}>
            Materials
          </button>
          <button className="course-tab-btn" onClick={() => onNavigate('tutor')}>
            <span>AI Tutor</span>
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--primary)' }}>auto_awesome</span>
          </button>
          <button className="course-tab-btn" onClick={() => onNavigate('practice')}>
            Practice
          </button>
          <button className="course-tab-btn" onClick={() => onNavigate('progress')}>
            Progress
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>verified_user</span>
            <span>Curated with Prof. Henderson</span>
          </div>
        </div>
      </div>

      {/* Course Summary Indicators (3 Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div
          style={{
            padding: '1.15rem 1.35rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--surface-container-low)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--secondary-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>auto_stories</span>
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--on-surface)', lineHeight: 1 }}>148</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', marginTop: '0.25rem' }}>Passages indexed &amp; searchable</div>
          </div>
        </div>

        <div
          style={{
            padding: '1.15rem 1.35rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--surface-container-low)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--secondary-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>quiz</span>
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--on-surface)', lineHeight: 1 }}>32</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', marginTop: '0.25rem' }}>Practice questions generated</div>
          </div>
        </div>

        <div
          style={{
            padding: '1.15rem 1.35rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--surface-container-low)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--secondary-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>bookmark_heart</span>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)', lineHeight: 1.2 }}>Unit 2: Working Memory</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', marginTop: '0.25rem' }}>Current focus for this week</div>
          </div>
        </div>
      </div>

      {/* Materials List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Filter Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)' }}>Curated Materials</span>
            <span className="pill-badge pill-neutral" style={{ padding: '0.15rem 0.55rem', fontSize: '0.75rem' }}>
              {filteredMaterials.length} items
            </span>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--surface-container)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setFormatFilter('all')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                backgroundColor: formatFilter === 'all' ? 'var(--surface-container-lowest)' : 'transparent',
                color: formatFilter === 'all' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                boxShadow: formatFilter === 'all' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer'
              }}
            >
              All formats
            </button>
            <button
              onClick={() => setFormatFilter('pdf')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                backgroundColor: formatFilter === 'pdf' ? 'var(--surface-container-lowest)' : 'transparent',
                color: formatFilter === 'pdf' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                boxShadow: formatFilter === 'pdf' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer'
              }}
            >
              PDFs
            </button>
            <button
              onClick={() => setFormatFilter('slides')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                backgroundColor: formatFilter === 'slides' ? 'var(--surface-container-lowest)' : 'transparent',
                color: formatFilter === 'slides' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                boxShadow: formatFilter === 'slides' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer'
              }}
            >
              Slides
            </button>
            <button
              onClick={() => setFormatFilter('video')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                backgroundColor: formatFilter === 'video' ? 'var(--surface-container-lowest)' : 'transparent',
                color: formatFilter === 'video' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                boxShadow: formatFilter === 'video' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer'
              }}
            >
              Lectures
            </button>
          </div>
        </div>

        {/* Materials Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="scholar-card"
              style={{
                padding: '1.15rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '240px' }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: item.status === 'processing'
                        ? 'var(--surface-container-high)'
                        : item.format === 'pdf'
                        ? 'var(--error-container)'
                        : item.format === 'slides' || item.format === 'ppt'
                        ? 'var(--secondary-container)'
                        : 'var(--secondary-fixed)',
                      color: item.status === 'processing'
                        ? 'var(--on-surface-variant)'
                        : item.format === 'pdf'
                        ? 'var(--error)'
                        : 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                      {item.status === 'processing'
                        ? 'sync'
                        : item.format === 'pdf'
                        ? 'picture_as_pdf'
                        : item.format === 'slides' || item.format === 'ppt'
                        ? 'slideshow'
                        : 'play_circle'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                        {item.title}
                      </span>
                      <span className="pill-badge pill-neutral" style={{ padding: '1px 6px', fontSize: '0.7rem' }}>
                        {item.badge}
                      </span>
                      {item.status === 'ready' && (
                        <span className="pill-badge pill-success" style={{ padding: '1px 6px', fontSize: '0.7rem' }}>
                          Ready
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.2rem' }}>
                      <span>{item.meta}</span>
                      <span>•</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                          {item.format === 'video' ? 'graphic_eq' : 'auto_stories'}
                        </span>
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {item.status === 'ready' ? (
                    <>
                      <button
                        className="btn-ghost"
                        onClick={() => onOpenCitation && onOpenCitation(item.citationRef)}
                      >
                        <span>
                          {item.format === 'pdf' ? 'Open source' : item.format === 'slides' || item.format === 'ppt' ? 'Open slides' : 'Open timestamp'}
                        </span>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                      </button>

                      <button
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => onNavigate('tutor')}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>auto_awesome</span>
                        <span>Ask tutor</span>
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                      Estimated time: ~3 mins
                    </span>
                  )}
                </div>
              </div>

              {/* Processing Bar if in progress */}
              {item.status === 'processing' && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>psychology</span>
                      <span>Processing... {item.progress || 72}% • Preparing lecture transcript &amp; key concepts</span>
                    </span>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.progress || 72}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${item.progress || 72}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Dropzone Section */}
      <div
        className="scholar-card"
        onClick={() => setIsUploadModalOpen(true)}
        style={{
          borderStyle: 'dashed',
          borderWidth: '1.5px',
          borderColor: 'var(--outline-variant)',
          backgroundColor: 'var(--surface-container-low)',
          padding: '2.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--secondary-container)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.85rem'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>upload_file</span>
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>
          Drag &amp; drop your course materials here
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', maxWidth: '440px', marginTop: '0.25rem' }}>
          Supports PDF textbooks, PPT/PPTX slide decks, and MP4 lecture recordings with clean source grounding.
        </p>
        <button className="btn-secondary" style={{ marginTop: '1rem' }}>
          Browse files
        </button>
      </div>

      {/* Upload Material Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)' }}>
                Add Course Material
              </h2>
              <button className="btn-ghost" onClick={() => setIsUploadModalOpen(false)} style={{ padding: '0.25rem' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  Material Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 5 — Attention & Perception"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  style={{
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--outline-variant)',
                    backgroundColor: 'var(--surface-container-low)',
                    color: 'var(--on-surface)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                    Format
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--outline-variant)',
                      backgroundColor: 'var(--surface-container-low)',
                      color: 'var(--on-surface)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="pdf">PDF Textbook / Paper</option>
                    <option value="slides">PPTX Slide Deck</option>
                    <option value="video">MP4 Lecture Recording</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                    Details / Length
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 35 pages or 45 min"
                    value={newFileMeta}
                    onChange={(e) => setNewFileMeta(e.target.value)}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--outline-variant)',
                      backgroundColor: 'var(--surface-container-low)',
                      color: 'var(--on-surface)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Upload &amp; Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
