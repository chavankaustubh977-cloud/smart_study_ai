import React, { useState, useEffect } from 'react';
import { Sidebar, Header } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { CourseOverviewView } from './components/CourseOverviewView';
import { MaterialsView } from './components/MaterialsView';
import { TutorView } from './components/TutorView';
import { PracticeView } from './components/PracticeView';
import { ProgressView } from './components/ProgressView';
import { SettingsView } from './components/SettingsView';
import { SourceViewerModal } from './components/SourceViewerModal';
import { mockCourses, mockMaterials } from './mockData';

export function App() {
  // Navigation states: 'home' | 'courses' | 'course-overview' | 'materials' | 'tutor' | 'practice' | 'progress' | 'settings'
  const [currentView, setCurrentView] = useState('home');
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
  const [materials, setMaterials] = useState(mockMaterials);
  const [activeCitation, setActiveCitation] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Persistent Light / Dark Mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('scholar_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('scholar_theme', theme);
  }, [theme]);

  return (
    <div className="app-layout">
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileNavOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Left Sidebar (fixed width, sticky in flow on desktop) */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />

      {/* Main Content Area (occupies remaining width, flex: 1, min-width: 0) */}
      <div className="app-main">
        {/* Top Header (begins immediately at the sidebar boundary) */}
        <Header
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          courses={courses}
          theme={theme}
          setTheme={setTheme}
          onToggleMobileMenu={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onNavigate={setCurrentView}
        />

        {/* Page Content Viewport */}
        <main className="page-content">
          {currentView === 'home' && (
            <HomeView
              onNavigate={setCurrentView}
              selectedCourse={selectedCourse}
            />
          )}

          {currentView === 'courses' && (
            <CoursesView
              courses={courses}
              setCourses={setCourses}
              onSelectCourse={setSelectedCourse}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'course-overview' && (
            <CourseOverviewView
              selectedCourse={selectedCourse}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'materials' && (
            <MaterialsView
              materials={materials}
              setMaterials={setMaterials}
              onNavigate={setCurrentView}
              onOpenCitation={(cit) => setActiveCitation(cit)}
            />
          )}

          {currentView === 'tutor' && (
            <TutorView
              onOpenCitation={(cit) => setActiveCitation(cit)}
              onNavigate={setCurrentView}
              selectedCourse={selectedCourse}
            />
          )}

          {currentView === 'practice' && (
            <PracticeView
              onOpenCitation={(cit) => setActiveCitation(cit)}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'progress' && (
            <ProgressView
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </main>
      </div>

      {/* Verified Grounded Source Inspector Modal */}
      {activeCitation && (
        <SourceViewerModal
          citation={activeCitation}
          onClose={() => setActiveCitation(null)}
        />
      )}
    </div>
  );
}

export default App;
