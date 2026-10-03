import React, { useState } from 'react';

export function Sidebar({
  currentView,
  setCurrentView,
  isMobileNavOpen,
  setIsMobileNavOpen
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'courses', label: 'Courses', icon: 'menu_book' },
    { id: 'tutor', label: 'AI Tutor', icon: 'auto_awesome' },
    { id: 'practice', label: 'Practice', icon: 'task_alt' },
    { id: 'progress', label: 'Progress', icon: 'trending_up' },
  ];

  return (
    <aside className={`app-sidebar ${isMobileNavOpen ? 'open' : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Brand Logo */}
        <div
          className="sidebar-brand"
          onClick={() => {
            setCurrentView('home');
            setIsMobileNavOpen(false);
          }}
        >
          <div className="brand-icon-box">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>school</span>
          </div>
          <div>
            <div className="brand-title">ScholarAI</div>
            <div className="brand-subtext">Study Workspace</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id || (item.id === 'courses' && currentView === 'course-overview') ? 'active' : ''}`}
              onClick={() => {
                setCurrentView(item.id);
                setIsMobileNavOpen(false);
              }}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-bottom">
        <button
          className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('settings');
            setIsMobileNavOpen(false);
          }}
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </button>

        {/* User Badge */}
        <div
          className="user-profile-badge"
          onClick={() => {
            setCurrentView('settings');
            setIsMobileNavOpen(false);
          }}
        >
          <div className="user-avatar">M</div>
          <div className="user-meta">
            <span className="user-name">Mayur</span>
            <span className="user-role">Student</span>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
            unfold_more
          </span>
        </div>
      </div>
    </aside>
  );
}

export function Header({
  selectedCourse,
  setSelectedCourse,
  courses,
  theme,
  setTheme,
  onToggleMobileMenu,
  onNavigate
}) {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCourseDropdownOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        {/* Mobile hamburger menu */}
        <button
          className="mobile-menu-trigger"
          onClick={onToggleMobileMenu}
          title="Toggle Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Course Breadcrumb & Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>Course</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--outline-variant)' }}>/</span>

          <div
            className="header-course-selector"
            onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
          >
            <span>{selectedCourse?.title || "Select Course"}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
              arrow_drop_down
            </span>
          </div>

          {/* Course Selector Dropdown */}
          {courseDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '0.4rem',
                backgroundColor: 'var(--surface-container-lowest)',
                border: '1px solid var(--outline-variant)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-modal)',
                minWidth: '240px',
                zIndex: 60,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Enrolled Courses
              </div>
              {courses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelectCourse(c)}
                  style={{
                    padding: '0.6rem 0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    cursor: 'pointer',
                    backgroundColor: c.id === selectedCourse?.id ? 'var(--secondary-container)' : 'transparent',
                    color: c.id === selectedCourse?.id ? 'var(--primary)' : 'var(--on-surface)',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{c.title}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)' }}>{c.code} • {c.mastery}% complete</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="header-search">
        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
          search
        </span>
        <input
          type="text"
          placeholder="Search course materials or topics... ⌘K"
          aria-label="Search topics"
        />
      </div>

      {/* Header Right Actions */}
      <div className="header-right">
        {/* Light / Dark Mode Toggle */}
        <div className="theme-toggle-group">
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            title="Light theme"
          >
            <span className="material-symbols-outlined">light_mode</span>
            <span>Light</span>
          </button>
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
            title="Dark theme"
          >
            <span className="material-symbols-outlined">dark_mode</span>
            <span>Dark</span>
          </button>
        </div>

        {/* User Avatar Circle */}
        <div
          className="user-avatar"
          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
          onClick={() => onNavigate('settings')}
          title="Account"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-primary)' }}>
            person
          </span>
        </div>
      </div>
    </header>
  );
}
