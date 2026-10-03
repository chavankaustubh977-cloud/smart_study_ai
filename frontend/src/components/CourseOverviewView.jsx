import React from 'react';

export function CourseOverviewView({
  selectedCourse,
  onNavigate
}) {
  const course = selectedCourse || {
    title: "Cognitive Psychology",
    summary: "Exploration of human mental architecture: sensory encoding, structural limits of working memory, and neural models.",
    currentTopic: "Working Memory",
    mastery: 74
  };

  return (
    <div className="page-container-wide">
      {/* Minimal Context Sub-bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('courses')}
        >
          Courses
        </span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{course.title}</span>
      </div>

      {/* Primary Headline Grouping */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ maxWidth: '680px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {course.title}
          </h1>
          <p style={{ marginTop: '0.4rem', fontSize: '0.95rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
            {course.summary}
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.45rem 0.95rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--surface-container-low)',
            fontSize: '0.82rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
            <span>Semester 1</span>
          </div>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ color: 'var(--on-surface-variant)' }}>4 Modules Active</span>
        </div>
      </div>

      {/* Quiet Navigation Tabs */}
      <div className="course-tabs-bar">
        <button className="course-tab-btn active" onClick={() => onNavigate('course-overview')}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>dashboard</span>
          <span>Overview</span>
        </button>
        <button className="course-tab-btn" onClick={() => onNavigate('materials')}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>folder</span>
          <span>Materials</span>
        </button>
        <button className="course-tab-btn" onClick={() => onNavigate('tutor')}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>smart_toy</span>
          <span>AI Tutor</span>
          <span className="pill-badge pill-primary" style={{ padding: '1px 6px', fontSize: '0.7rem' }}>Active</span>
        </button>
        <button className="course-tab-btn" onClick={() => onNavigate('practice')}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit_note</span>
          <span>Practice</span>
        </button>
        <button className="course-tab-btn" onClick={() => onNavigate('progress')}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bar_chart</span>
          <span>Progress</span>
        </button>
      </div>

      {/* Main Structured Surface */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* 1. CURRENT STUDY FOCUS (Calm Focal Block) */}
        <div
          className="scholar-card"
          style={{
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '580px', flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <span className="pill-badge pill-neutral" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Current Topic
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--primary)' }}>schedule</span>
                Estimated 25m left
              </span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}>
              {course.currentTopic || "Working Memory"}
            </h2>
            <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
              Baddeley &amp; Hitch model, phonological loop, and visuospatial sketchpad.
            </p>

            {/* Progress Bar */}
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Overall mastery</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{course.mastery || 74}%</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${course.mastery || 74}%` }}></div>
              </div>
            </div>
          </div>

          {/* Call to Action Side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <button
              className="btn-primary"
              style={{ padding: '0.75rem 1.4rem' }}
              onClick={() => onNavigate('tutor')}
            >
              <span>Continue studying</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
            <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
              Resume Module 3.2 • Baddeley Matrix
            </span>
          </div>
        </div>

        {/* Gentle Tonal Separation */}
        <div className="divider-clean"></div>

        {/* Dual Workspace Columns: Review Needs + Recent Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Left Column: Weak Topics / Needs Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--error)' }}></span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  Topics needing review
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>Based on recent quizzes</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                className="scholar-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-container)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--on-surface-variant)',
                      flexShrink: 0
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>psychology</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)' }}>Working Memory</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
                      Phonological loop capacity retention falls below 65%
                    </span>
                  </div>
                </div>
                <button className="btn-ghost" onClick={() => onNavigate('practice')}>
                  <span>Practice now</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </button>
              </div>

              <div
                className="scholar-card"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-container)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--on-surface-variant)',
                      flexShrink: 0
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>database</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)' }}>Long-Term Memory</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
                      Encoding specificity &amp; state-dependent recall heuristics
                    </span>
                  </div>
                </div>
                <button className="btn-ghost" onClick={() => onNavigate('practice')}>
                  <span>Practice now</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Contextual Helper Banner */}
            <div
              style={{
                padding: '0.9rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface-container-low)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)', flexShrink: 0 }}>
                lightbulb
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>
                15 minutes of spaced flashcard drills typically restores recall scores to over 85%.
              </p>
            </div>
          </div>

          {/* Right Column: Recent Activity Log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                Recent activity
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                View full log
              </span>
            </div>

            <div className="scholar-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Activity 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--secondary-container)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>quiz</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>Quiz — Memory</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>Yesterday</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span className="pill-badge pill-neutral" style={{ padding: '1px 6px', fontSize: '0.72rem' }}>
                      Score: 8 / 10
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>80% Proficiency</span>
                  </div>
                </div>
              </div>

              <div className="divider-clean"></div>

              {/* Activity 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-container)',
                    color: 'var(--on-surface-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_lesson</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>Lecture 05: Sensory Registers</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>3 days ago</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                      Completed
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>• 42 mins watched</span>
                  </div>
                </div>
              </div>

              {/* Weekly Study Consistency Bar Graph */}
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-container-low)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
                  <span>Study consistency</span>
                  <span style={{ fontWeight: 600, color: 'var(--on-surface)' }}>4.2 hrs this week</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.35rem', height: '36px', paddingTop: '4px' }}>
                  {[
                    { day: "M", h: "35%" },
                    { day: "T", h: "60%" },
                    { day: "W", h: "100%", primary: true },
                    { day: "T", h: "70%" },
                    { day: "F", h: "20%" },
                    { day: "S", h: "90%", primary: true },
                    { day: "S", h: "10%" }
                  ].map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', height: '100%' }}>
                      <div
                        style={{
                          width: '100%',
                          height: d.h,
                          borderRadius: '2px 2px 0 0',
                          backgroundColor: d.primary ? 'var(--primary)' : 'var(--outline-variant)',
                          marginTop: 'auto'
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Resource Card */}
        <div
          className="scholar-card"
          style={{
            backgroundColor: 'var(--surface-container-low)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface-container-lowest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                flexShrink: 0
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>menu_book</span>
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                Curated Reading: Baddeley (2000)
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
                "The episodic buffer: a new component of working memory?" — Trends in Cognitive Sciences.
              </div>
            </div>
          </div>

          <button className="btn-secondary" onClick={() => onNavigate('materials')}>
            <span>View reading</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
