import React from 'react';
import { mockProgressData } from '../mockData';

export function ProgressView({ onNavigate }) {
  const data = mockProgressData;

  return (
    <div className="page-container-wide">
      {/* Breadcrumb & Term Meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('courses')}>Courses</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('course-overview')}>{data.courseTitle}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Progress</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--secondary-container)', color: 'var(--on-secondary-fixed)', fontSize: '0.75rem', fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--primary)' }}>calendar_today</span>
          <span>{data.term}</span>
        </div>
      </div>

      {/* Page Title & Reassuring Intro */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
            Your Progress
          </h1>
          <span className="pill-badge pill-neutral" style={{ fontSize: '0.72rem' }}>
            Active Tracking
          </span>
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)' }}>
          Topic mastery and spaced retention for {data.courseTitle}
        </p>
      </div>

      {/* Top High-Level Summary Stat Row (3 Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {/* Metric 1: Overall Mastery */}
        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Overall Mastery</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-container-low)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
                {data.overallMastery}%
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_upward</span>
                {data.masteryDelta}
              </span>
            </div>

            <div className="progress-bar-wrap" style={{ marginTop: '0.65rem' }}>
              <div className="progress-bar-fill" style={{ width: `${data.overallMastery}%` }}></div>
            </div>
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
            {data.paceNote}
          </span>
        </div>

        {/* Metric 2: Current Focus Area */}
        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Current Focus Area</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-container)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>psychology</span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--on-surface)' }}>
              {data.currentFocus.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.2rem', lineHeight: 1.4 }}>
              {data.currentFocus.detail}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
            <span>{data.currentFocus.recommendation}</span>
          </div>
        </div>

        {/* Metric 3: Topics Needing Review */}
        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface-variant)' }}>Topics Needing Review</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>update</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
                {data.topicsNeedingReviewCount} Topics
              </span>
              <span className="pill-badge pill-primary" style={{ fontSize: '0.72rem' }}>
                Review suggested
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.35rem' }}>
              Memory traces showing natural 7-day decay curve
            </p>
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
            Target completion by Friday
          </span>
        </div>
      </div>

      {/* Main Content Layout (Double Column) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Topics Breakdown & Retention Curve */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Needs Practice Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>notification_important</span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>Needs Practice</h2>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>Spaced decay alerts</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.needsPractice.map((np) => (
                <div key={np.id} className="scholar-card" style={{ padding: '1.15rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--on-surface)' }}>{np.topic}</span>
                        <span className="pill-badge pill-neutral" style={{ fontSize: '0.7rem' }}>{np.badge}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.15rem' }}>{np.subtext}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)' }}>{np.retention}%</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)' }}>retention</span>
                    </div>
                  </div>

                  <div className="progress-bar-wrap" style={{ height: '6px' }}>
                    <div className="progress-bar-fill" style={{ width: `${np.retention}%`, backgroundColor: 'var(--secondary)' }}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>{np.lastRevised}</span>
                    <button className="btn-ghost" onClick={() => onNavigate('practice')}>
                      <span>Practice now</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong Topics Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--success)' }}>check_circle</span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--on-surface)' }}>Strong Topics</h2>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>High confidence &gt; 80%</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.strongTopics.map((st) => (
                <div key={st.id} className="scholar-card" style={{ padding: '1.15rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--on-surface)' }}>{st.topic}</span>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.15rem' }}>{st.subtext}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>{st.mastery}%</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)' }}>mastered</span>
                    </div>
                  </div>

                  <div className="progress-bar-wrap" style={{ height: '6px' }}>
                    <div className="progress-bar-fill" style={{ width: `${st.mastery}%` }}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--on-surface-variant)', paddingTop: '0.2rem' }}>
                    <span>{st.accuracy}</span>
                    <span>{st.reviewDue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Retention Sparkline & Weekly Study Consistency */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Retention Trajectory Card */}
          <div className="scholar-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)' }}>Retention Trajectory</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>Observed recall retention vs. predicted decay curve</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--on-surface-variant)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                  Your Recall
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '8px', height: '2px', backgroundColor: 'var(--outline-variant)' }}></span>
                  Baseline Decay
                </span>
              </div>
            </div>

            {/* Trajectory Graph SVG */}
            <div style={{ width: '100%', height: '140px', padding: '0.5rem 0' }}>
              <svg viewBox="0 0 400 130" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <line x1="20" y1="20" x2="380" y2="20" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="65" x2="380" y2="65" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="110" x2="380" y2="110" stroke="var(--border-subtle)" strokeWidth="1" />

                {/* Baseline Ebbinghaus decay curve */}
                <path
                  d="M20,25 C80,75 180,95 380,105"
                  fill="none"
                  stroke="var(--outline-variant)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Student Retention Path with Spaced Reinforcement */}
                <path
                  d="M20,25 C60,50 90,60 110,40 C140,55 170,65 190,30 C230,45 280,50 320,35 C350,38 370,40 380,38"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                />

                {/* Nodes */}
                {[
                  { cx: 20, cy: 25 },
                  { cx: 110, cy: 40 },
                  { cx: 190, cy: 30 },
                  { cx: 320, cy: 35 },
                  { cx: 380, cy: 38 }
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="var(--surface-container-lowest)" stroke="var(--primary)" strokeWidth="2" />
                ))}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--on-surface-variant)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem' }}>
              <span>Day 1 (Initial Encoding)</span>
              <span>Day 7 (Spaced Drill 1)</span>
              <span>Day 14 (Current Retention: 74%)</span>
            </div>
          </div>

          {/* Weekly Consistency Bar Card */}
          <div className="scholar-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>Study Consistency</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{data.weeklyStudyHours}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '70px', paddingTop: '0.5rem' }}>
              {data.weeklyActivity.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', gap: '4px' }}>
                  <div
                    style={{
                      width: '100%',
                      height: d.height,
                      borderRadius: '4px 4px 0 0',
                      backgroundColor: d.minutes >= 60 ? 'var(--primary)' : d.minutes > 0 ? 'var(--secondary-container)' : 'var(--surface-container)',
                      marginTop: 'auto'
                    }}
                  ></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)' }}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Action */}
          <div
            className="scholar-card"
            style={{
              backgroundColor: 'var(--surface-container-low)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>recommend</span>
              <span>Recommended Next Action</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', lineHeight: 1.45 }}>
              Take a short 5-minute practice session on <strong>Working Memory</strong> to boost your retention rate from 62% to over 80%.
            </p>
            <button
              className="btn-primary"
              style={{ alignSelf: 'flex-start', marginTop: '0.25rem', padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              onClick={() => onNavigate('practice')}
            >
              <span>Start recommended review</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
