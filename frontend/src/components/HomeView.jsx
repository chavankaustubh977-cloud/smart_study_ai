import React from 'react';

export function HomeView({ onNavigate, selectedCourse }) {
  return (
    <div className="page-container-standard">
      {/* Warm Academic Greeting */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.5rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Good morning, Mayur.
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>
          Ready to continue your study session for today?
        </p>
      </header>

      {/* Continue Learning Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>
          Continue learning
        </h2>

        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <span className="pill-badge pill-primary">
              {selectedCourse?.title || "Cognitive Psychology"}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>schedule</span>
              {selectedCourse?.timeRemaining || "15m remaining"}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}>
              {selectedCourse?.currentTopic || "Working Memory"}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
              Central executive coordination, phonological loops, and visuospatial sketchpad retention.
            </p>
          </div>

          {/* Progress Bar & Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="progress-bar-wrap">
              <div
                className="progress-bar-fill"
                style={{ width: `${selectedCourse?.mastery || 74}%` }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>
              <span>{selectedCourse?.mastery || 74}% complete</span>
              <span>Module 3 of 4</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
            <button
              className="btn-primary"
              onClick={() => onNavigate('course-overview')}
            >
              <span>Continue</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Clean Divider */}
      <div className="divider-clean"></div>

      {/* Needs Practice Section (Spaced Repetition) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>
            Needs practice
          </h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Spaced Repetition
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {/* Row 1 */}
          <div
            className="scholar-card"
            style={{
              padding: '0.85rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                Working Memory
              </span>
              <span className="pill-badge pill-error">
                Recall priority
              </span>
            </div>
            <button
              className="btn-ghost"
              onClick={() => onNavigate('practice')}
            >
              <span>Practice now</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </button>
          </div>

          {/* Row 2 */}
          <div
            className="scholar-card"
            style={{
              padding: '0.85rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                Long-Term Memory
              </span>
              <span className="pill-badge pill-primary">
                Decaying review
              </span>
            </div>
            <button
              className="btn-ghost"
              onClick={() => onNavigate('practice')}
            >
              <span>Practice now</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Clean Divider */}
      <div className="divider-clean"></div>

      {/* Recent Activity Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>
            Recent activity
          </h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Last 7 Days
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {/* Activity Item 1 */}
          <div
            className="scholar-card"
            style={{
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-container-low)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--on-surface-variant)',
                  flexShrink: 0
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  Memory Quiz
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                  Yesterday
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-container)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  color: 'var(--on-surface)'
                }}
              >
                8/10
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>80%</span>
            </div>
          </div>

          {/* Activity Item 2 */}
          <div
            className="scholar-card"
            style={{
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-container-low)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--on-surface-variant)',
                  flexShrink: 0
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  Attention Quiz
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                  3 days ago
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-container)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  color: 'var(--on-surface)'
                }}
              >
                9/10
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>90%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
