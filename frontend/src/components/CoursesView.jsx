import React, { useState } from 'react';

export function CoursesView({
  courses,
  setCourses,
  onSelectCourse,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState('3');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newCourse = {
      id: `course-${Date.now()}`,
      code: newCourseCode.trim() || `CRSE ${Math.floor(100 + Math.random() * 800)}`,
      title: newCourseTitle.trim(),
      term: "Spring Quarter 2025",
      credits: parseInt(newCourseCredits) || 3,
      instructor: "Staff Instructor",
      mastery: 0,
      currentTopic: "Introduction & Unit 1 Foundations",
      activeModules: 1,
      timeRemaining: "New Course",
      summary: "Course materials and lectures uploaded."
    };

    setCourses([newCourse, ...courses]);
    setNewCourseTitle('');
    setNewCourseCode('');
    setIsModalOpen(false);
    onSelectCourse(newCourse);
    onNavigate('course-overview');
  };

  return (
    <div className="page-container-wide">
      {/* Top Action Bar & Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: 'var(--on-surface-variant)', fontWeight: 600 }}>
            <span>ACADEMIC TERM</span>
            <span>•</span>
            <span style={{ color: 'var(--primary)' }}>SPRING 2025</span>
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
            My Courses
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Active / Archived Filter Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface-container-low)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setActiveTab('active')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                backgroundColor: activeTab === 'active' ? 'var(--surface-container-lowest)' : 'transparent',
                color: activeTab === 'active' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                boxShadow: activeTab === 'active' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Active ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                backgroundColor: activeTab === 'archived' ? 'var(--surface-container-lowest)' : 'transparent',
                color: activeTab === 'archived' ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                boxShadow: activeTab === 'archived' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Archived
            </button>
          </div>

          {/* New Course Primary Action Button */}
          <button
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* Quick Progress Glance Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--surface-container-low)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            TOTAL CREDITS
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--on-surface)' }}>10</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>Credits Enrolled</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            STUDY STREAK
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--primary)' }}>14 Days</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>local_fire_department</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AI TUTOR SESSIONS
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--on-surface)' }}>28</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>Completed</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AVG. PROGRESSION
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--on-surface)' }}>44.6%</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>On track</span>
          </div>
        </div>
      </div>

      {/* Course List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activeTab === 'active' && courses.map((course) => (
          <div
            key={course.id}
            className="scholar-card scholar-card-interactive"
            onClick={() => {
              onSelectCourse(course);
              onNavigate('course-overview');
            }}
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.15rem', minWidth: '280px', flex: 1 }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--secondary-container)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                    {course.code.includes('PSYC') ? 'psychology' : course.code.includes('CS') ? 'hub' : 'neurology'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <span className="pill-badge pill-neutral" style={{ fontSize: '0.72rem' }}>
                      {course.code}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>•</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>{course.credits} Credits</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>•</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>{course.term}</span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                    {course.title}
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem', color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>play_circle</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>Current Topic:</span>
                    <span style={{ color: 'var(--on-surface)', fontWeight: 500 }}>{course.currentTopic}</span>
                  </div>
                </div>
              </div>

              {/* Right Progress & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', minWidth: '260px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '160px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--on-surface-variant)' }}>Overall Mastery</span>
                    <span style={{ fontWeight: 600, color: 'var(--on-surface)' }}>{course.mastery}% complete</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${course.mastery}%` }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    className="btn-secondary"
                    style={{ padding: '0.45rem 0.65rem' }}
                    title="Course materials"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(course);
                      onNavigate('materials');
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>folder</span>
                  </button>
                  <button
                    className="btn-primary"
                    style={{ padding: '0.45rem 1rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(course);
                      onNavigate('course-overview');
                    }}
                  >
                    <span>Continue</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'archived' && (
          <div className="scholar-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', marginBottom: '0.5rem' }}>archive</span>
            <p>No archived courses found for this term.</p>
          </div>
        )}
      </div>

      {/* Enroll Prompt Section */}
      <div
        className="scholar-card"
        onClick={() => setIsModalOpen(true)}
        style={{
          cursor: 'pointer',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--surface-container-low)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-container-lowest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--on-surface-variant)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>upload_file</span>
          </div>
          <div>
            <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--on-surface)' }}>
              + Enroll via syllabus or code
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
              Upload course PDF syllabus, enter an institution code, or sync with Canvas / Blackboard
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>
          <span>Get started</span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
        </div>
      </div>

      {/* Supplementary Study Companion Tray */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', paddingTop: '0.5rem' }}>
        <div className="scholar-card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>auto_stories</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>Auto Flashcards</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>
              142 pending review cards generated from lecture transcripts.
            </span>
          </div>
        </div>

        <div className="scholar-card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>schedule</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>Upcoming Quiz</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>
              CS 320 Midterm Review scheduled in 3 days.
            </span>
          </div>
        </div>

        <div className="scholar-card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-container)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>smart_toy</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>AI Study Sync</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>
              Knowledge model is up to date with Spring syllabus.
            </span>
          </div>
        </div>
      </div>

      {/* New Course Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)' }}>
                Create New Course
              </h2>
              <button
                className="btn-ghost"
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '0.25rem' }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Molecular Biology, Modern World History"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                    Course Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BIO 201"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                    Credits
                  </label>
                  <select
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(e.target.value)}
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
