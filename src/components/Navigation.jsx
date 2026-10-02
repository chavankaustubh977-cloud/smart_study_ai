import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  GraduationCap, 
  BarChart3, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export function Navigation({ activeTab, setActiveTab, activeCourse, courses, setActiveCourse }) {
  return (
    <header className="top-nav">
      <div className="brand-section">
        <div className="brand-icon-wrapper">
          <GraduationCap size={24} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="brand-title">ScholarAI</span>
            <span className="brand-badge">Track D Adaptive</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            Stitch ID: 4675670754854073210
          </div>
        </div>
      </div>

      <nav className="nav-tabs">
        <button 
          id="nav-generating-screen"
          className={`nav-tab-btn ${activeTab === 'generating' ? 'active' : ''}`}
          onClick={() => setActiveTab('generating')}
        >
          <span className="nav-tab-pulse-badge"></span>
          <Cpu size={16} />
          <span>Generating Screen...</span>
        </button>

        <button 
          id="nav-tutor-chat"
          className={`nav-tab-btn ${activeTab === 'tutor' ? 'active' : ''}`}
          onClick={() => setActiveTab('tutor')}
        >
          <MessageSquare size={16} />
          <span>Grounded Tutor</span>
        </button>

        <button 
          id="nav-adaptive-quiz"
          className={`nav-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <Sparkles size={16} />
          <span>Adaptive Quiz</span>
        </button>

        <button 
          id="nav-mastery-dashboard"
          className={`nav-tab-btn ${activeTab === 'mastery' ? 'active' : ''}`}
          onClick={() => setActiveTab('mastery')}
        >
          <BarChart3 size={16} />
          <span>Learner Mastery</span>
        </button>

        <button 
          id="nav-materials"
          className={`nav-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          <Layers size={16} />
          <span>Knowledge Ingestion</span>
        </button>
      </nav>

      <div className="user-status-section">
        <select 
          id="course-dropdown"
          className="course-selector"
          value={activeCourse.id}
          onChange={(e) => {
            const selected = courses.find(c => c.id === e.target.value);
            if (selected) setActiveCourse(selected);
          }}
        >
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.code} • {course.title}
            </option>
          ))}
        </select>

        <div className="student-avatar" title="Kaustubh Chavan (Student Profile)">
          KC
        </div>
      </div>
    </header>
  );
}
