import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { GeneratingScreen } from './components/GeneratingScreen';
import { TutorChat } from './components/TutorChat';
import { AdaptiveQuiz } from './components/AdaptiveQuiz';
import { MasteryDashboard } from './components/MasteryDashboard';
import { MaterialsIngestion } from './components/MaterialsIngestion';
import { SourceViewerModal } from './components/SourceViewerModal';
import { mockCourses } from './mockData';

export function App() {
  const [activeTab, setActiveTab] = useState('generating'); // Default to designated Stitch primary screen
  const [courses, setCourses] = useState(mockCourses);
  const [activeCourse, setActiveCourse] = useState(mockCourses[0]);
  const [activeCitation, setActiveCitation] = useState(null);

  return (
    <div className="app-layout">
      {/* Dynamic Background Atmosphere */}
      <div className="app-atmosphere"></div>

      {/* Top Header & Screen Switcher */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        courses={courses}
        activeCourse={activeCourse}
        setActiveCourse={setActiveCourse}
      />

      {/* Main Screen Viewport */}
      <main className="main-viewport">
        {activeTab === 'generating' && (
          <GeneratingScreen 
            onNavigateToTutor={() => setActiveTab('tutor')}
            onNavigateToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'tutor' && (
          <TutorChat 
            onOpenCitation={(cit) => setActiveCitation(cit)} 
          />
        )}

        {activeTab === 'quiz' && (
          <AdaptiveQuiz 
            onOpenCitation={(cit) => setActiveCitation(cit)} 
          />
        )}

        {activeTab === 'mastery' && (
          <MasteryDashboard 
            onTakeTargetedQuiz={() => setActiveTab('quiz')} 
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsIngestion 
            onStartGeneration={() => setActiveTab('generating')} 
          />
        )}
      </main>

      {/* Source Citation Inspector Modal */}
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
