import React, { useState, useEffect } from 'react';
import { mockQuizQuestions } from '../mockData';

export function PracticeView({ onOpenCitation, onNavigate }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState("B");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);

  const q = mockQuizQuestions[currentIdx] || mockQuizQuestions[0];

  const handleSelectOption = (optId) => {
    setSelectedOption(optId);
    setHasSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < mockQuizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      onNavigate('progress');
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedOption("B");
      setHasSubmitted(true);
    }
  };

  // Keyboard shortcut support (1-4 select, Enter next)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionMap = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectOption(optionMap[e.key]);
      } else if (e.key === 'Enter') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  const progressPercent = Math.round(((q.number) / q.totalQuestions) * 100);

  return (
    <div className="page-container-standard">
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
          <button
            className="btn-ghost"
            style={{ padding: '2px 4px', fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}
            onClick={() => onNavigate('course-overview')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            <span>Back to Module</span>
          </button>
          <span style={{ opacity: 0.4 }}>•</span>
          <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Cognitive Psychology</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{q.unit}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="btn-secondary"
            style={{ padding: '0.35rem 0.5rem', color: isBookmarked ? 'var(--primary)' : 'var(--on-surface-variant)' }}
            onClick={() => setIsBookmarked(!isBookmarked)}
            title="Bookmark Question"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
          <button className="btn-secondary" style={{ padding: '0.35rem 0.5rem' }} title="Quiz Options">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>more_horiz</span>
          </button>
        </div>
      </div>

      {/* Quiz Progress Indicator Strip */}
      <div className="scholar-card" style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)' }}>
              Question {q.number} of {q.totalQuestions}
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--outline-variant)' }}></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
              Estimated remaining: {q.remainingTime}
            </span>
          </div>

          <span className="pill-badge pill-primary" style={{ fontSize: '0.72rem' }}>
            Adaptive: Standard Practice
          </span>
        </div>

        <div className="progress-bar-wrap" style={{ height: '6px' }}>
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Main Question Container */}
      <div className="scholar-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="pill-badge pill-neutral" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {q.category}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>psychology</span>
            <span>{q.tag}</span>
          </span>
        </div>

        <h1 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--on-surface)', lineHeight: 1.4 }}>
          {q.question}
        </h1>

        {/* Interactive Answer Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {q.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === q.correctOption;

            let bgColor = 'var(--surface-container-low)';
            let borderColor = 'transparent';
            let textColor = 'var(--on-surface)';

            if (isSelected) {
              bgColor = 'var(--secondary-container)';
              borderColor = 'var(--primary)';
              textColor = 'var(--primary)';
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                style={{
                  padding: '0.85rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-container-lowest)',
                      color: isSelected ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {isSelected ? (
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                    ) : (
                      opt.id
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: isSelected ? 600 : 500, color: textColor }}>
                      {opt.text}
                    </span>
                    {isSelected && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--primary)', opacity: 0.85 }}>Selected answer</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isSelected && (
                    <span className="pill-badge pill-primary" style={{ backgroundColor: 'var(--surface-container-lowest)', fontSize: '0.72rem' }}>
                      Your Choice
                    </span>
                  )}
                  <span
                    style={{
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--surface-container-lowest)',
                      fontSize: '0.75rem',
                      color: 'var(--on-surface-variant)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {opt.key}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validated Explanatory Feedback Block */}
        {hasSubmitted && (
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--surface-container-low)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>check</span>
                </span>
                <span>Correct Answer</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>Mastery score +15 XP</span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--on-surface)', lineHeight: 1.5 }}>
              {q.explanation}
            </p>

            {/* Reference Citation */}
            {q.sourceCitation && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-container-lowest)',
                  fontSize: '0.82rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>menu_book</span>
                  <span>Source: <strong style={{ color: 'var(--on-surface)' }}>{q.sourceCitation.book}</strong>, {q.sourceCitation.location}</span>
                </div>

                <button
                  className="btn-ghost"
                  style={{ fontSize: '0.8rem', padding: '0.2rem 0.4rem' }}
                  onClick={() => onOpenCitation && onOpenCitation({
                    type: "pdf",
                    title: q.sourceCitation.book,
                    location: q.sourceCitation.location,
                    excerpt: q.sourceCitation.excerpt
                  })}
                >
                  <span>Open source reference</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation & Bottom Actions Footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div
          className="scholar-card"
          style={{
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <button
            className="btn-ghost"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            style={{ opacity: currentIdx === 0 ? 0.4 : 1, color: 'var(--on-surface-variant)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            <span>Previous Question</span>
          </button>

          {/* Keyboard Hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <kbd style={{ padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', fontFamily: 'monospace' }}>1–4</kbd>
              select
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <kbd style={{ padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', fontFamily: 'monospace' }}>↵ Enter</kbd>
              continue
            </span>
          </div>

          <button
            className="btn-primary"
            onClick={handleNext}
          >
            <span>{currentIdx < mockQuizQuestions.length - 1 ? 'Next Question' : 'View Results'}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </div>

        {/* Spaced Repetition Notice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>update</span>
          <span>Spaced repetition schedule updated • Next review scheduled in <strong style={{ color: 'var(--on-surface)' }}>4 days</strong></span>
        </div>
      </div>
    </div>
  );
}
