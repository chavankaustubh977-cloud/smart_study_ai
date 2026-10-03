import React, { useState, useEffect } from 'react';
import { checkBackendHealth } from '../services/api';

export function SettingsView({ theme, setTheme }) {
  const [dailyGoal, setDailyGoal] = useState("45");
  const [repetitionInterval, setRepetitionInterval] = useState("smart");
  const [notifications, setNotifications] = useState(true);
  const [backendStatus, setBackendStatus] = useState({ online: false });

  useEffect(() => {
    checkBackendHealth().then((status) => {
      setBackendStatus(status);
    });
  }, []);

  return (
    <div className="page-container-standard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingTop: '0.5rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
          Settings &amp; Preferences
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)' }}>
          Manage your personal study workspace, appearance, and learning preferences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Appearance & Theme Section */}
        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>palette</span>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)' }}>Appearance</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--on-surface)' }}>Interface Theme</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                Choose between warm academic light mode or eye-comfort dark mode.
              </div>
            </div>

            <div className="theme-toggle-group">
              <button
                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <span className="material-symbols-outlined">light_mode</span>
                <span>Light</span>
              </button>
              <button
                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <span className="material-symbols-outlined">dark_mode</span>
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Study Preferences Section */}
        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>school</span>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)' }}>Study Preferences</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--on-surface)' }}>Daily Study Target</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                Target daily focus minutes for consistency tracking.
              </div>
            </div>

            <select
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface-container-low)',
                border: '1px solid var(--outline-variant)',
                color: 'var(--on-surface)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="30">30 minutes / day</option>
              <option value="45">45 minutes / day</option>
              <option value="60">60 minutes / day</option>
              <option value="90">90 minutes / day</option>
            </select>
          </div>

          <div className="divider-clean"></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--on-surface)' }}>Spaced Repetition Schedule</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                Frequency of decay review alerts for weak topics.
              </div>
            </div>

            <select
              value={repetitionInterval}
              onChange={(e) => setRepetitionInterval(e.target.value)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface-container-low)',
                border: '1px solid var(--outline-variant)',
                color: 'var(--on-surface)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="smart">Adaptive Ebbinghaus Curve (Recommended)</option>
              <option value="daily">Daily Review</option>
              <option value="weekly">Weekly Review</option>
            </select>
          </div>

          <div className="divider-clean"></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--on-surface)' }}>Study Reminders</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                Gentle browser notifications when review cards are due.
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Backend & System Integration Status */}
        <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>dns</span>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)' }}>Backend Integration</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                ScholarAI FastAPI Backend (localhost:8000)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                {backendStatus.online
                  ? `Service Online: ${backendStatus.service || 'ScholarAI Backend'}`
                  : 'FastAPI Backend can be started with "uvicorn main:app --reload" in /backend'}
              </div>
            </div>

            <span className={`pill-badge ${backendStatus.online ? 'pill-success' : 'pill-neutral'}`}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: backendStatus.online ? 'var(--success)' : 'var(--on-surface-variant)'
                }}
              ></span>
              {backendStatus.online ? 'Connected' : 'Standalone Mode'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
