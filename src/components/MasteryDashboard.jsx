import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Award, 
  AlertCircle, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  Target 
} from 'lucide-react';
import { mockLearnerProfile } from '../mockData';

export function MasteryDashboard({ onTakeTargetedQuiz }) {
  const profile = mockLearnerProfile;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Stats Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                Learner Mastery & Dynamic Student Model
              </h2>
              <span className="badge badge-indigo">{profile.studentId}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Course: <strong>{profile.course}</strong> • Continuous Bayesian & BKT Mastery Updates
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                <Flame size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{profile.streakDays} Days</div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Study Streak</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{profile.averageAccuracy}%</div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Avg. Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Topic Breakdown vs Forgetting Curve & Recommended Actions */}
      <div className="mastery-grid">
        {/* Left: Per-Topic Mastery Breakdown */}
        <div className="glass-card">
          <div className="glass-card-header">
            <div className="card-title-group">
              <TrendingUp size={20} color="#818cf8" />
              <div>
                <h3 className="card-title">Topic-Level Mastery Profiles</h3>
                <p className="card-subtitle">Updated adaptively after every diagnostic assessment</p>
              </div>
            </div>
          </div>

          <div className="topic-mastery-list">
            {profile.topicMastery.map((topic, tIdx) => {
              const isMastered = topic.mastery >= 85;
              const isProficient = topic.mastery >= 70 && topic.mastery < 85;
              const isNeedsPractice = topic.mastery >= 45 && topic.mastery < 70;
              const isCritical = topic.mastery < 45;

              const fillColor = isMastered 
                ? 'var(--accent-emerald)' 
                : isProficient 
                ? 'var(--accent-cyan)' 
                : isNeedsPractice 
                ? 'var(--accent-amber)' 
                : 'var(--accent-rose)';

              return (
                <div key={tIdx} className="topic-mastery-item">
                  <div className="topic-row-header">
                    <div>
                      <span className="topic-name">{topic.topic}</span>
                      {topic.weakAreas.length > 0 && (
                        <div style={{ fontSize: '0.72rem', color: '#fca5a5', marginTop: '0.2rem' }}>
                          ⚠️ Weak concepts: {topic.weakAreas.join(', ')}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge ${isMastered ? 'badge-emerald' : isProficient ? 'badge-cyan' : isNeedsPractice ? 'badge-amber' : 'badge-rose'}`}>
                        {topic.status}
                      </span>
                      <span className="mastery-score-tag" style={{ color: fillColor }}>
                        {topic.mastery}%
                      </span>
                    </div>
                  </div>

                  <div className="mastery-bar-track">
                    <div 
                      className="mastery-bar-fill" 
                      style={{ width: `${topic.mastery}%`, background: fillColor }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Forgetting Curve Schedule & Targeted Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Ebbinghaus Review Scheduler */}
          <div className="glass-card">
            <div className="glass-card-header">
              <div className="card-title-group">
                <Calendar size={18} color="#06b6d4" />
                <div>
                  <h3 className="card-title">Spaced Repetition Schedule</h3>
                  <p className="card-subtitle">Ebbinghaus forgetting curve intervals</p>
                </div>
              </div>
            </div>

            <div className="forgetting-curve-card">
              {profile.forgettingCurveSchedule.map((item, idx) => (
                <div key={idx} className="forgetting-item">
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{item.topic}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Source: {item.sourceRef}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${item.priority === 'High' ? 'badge-amber' : item.priority === 'Urgent' ? 'badge-rose' : 'badge-indigo'}`}>
                      {item.dueIn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Targeted Action Recommendation */}
          <div className="glass-card" style={{ border: '1px solid rgba(99, 102, 241, 0.4)', background: 'rgba(30, 27, 75, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <Target size={20} color="#818cf8" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                Targeted AI Recommendation
              </h4>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {profile.recommendedAction}
            </p>

            <button 
              id="btn-targeted-diagnostic"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={onTakeTargetedQuiz}
            >
              Start 5-Item Deadlock Diagnostic
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
