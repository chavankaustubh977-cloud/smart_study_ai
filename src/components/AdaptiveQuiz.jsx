import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  AlertOctagon, 
  Award,
  ChevronRight
} from 'lucide-react';
import { mockQuizQuestions } from '../mockData';

export function AdaptiveQuiz({ onOpenCitation }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = mockQuizQuestions[currentIdx];

  const handleSelectOption = (optionId) => {
    if (isSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctOption) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < mockQuizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Completed
      alert(`Diagnostic Quiz Finished! Your score: ${score + (selectedOption === question.correctOption ? 1 : 0)} / ${mockQuizQuestions.length}`);
      setCurrentIdx(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setScore(0);
    }
  };

  return (
    <div className="quiz-container">
      {/* Header card */}
      <div className="glass-card quiz-card">
        <div className="quiz-meta-row">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-indigo">
              {question.topic}
            </span>
            <span className={`badge ${question.difficulty === 'Easy' ? 'badge-emerald' : question.difficulty === 'Medium' ? 'badge-amber' : 'badge-rose'}`}>
              Difficulty: {question.difficulty}
            </span>
            <span className="badge badge-cyan">
              Bloom: {question.bloomLevel}
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Question {currentIdx + 1} of {mockQuizQuestions.length}
          </div>
        </div>

        {/* Question Text */}
        <h2 className="quiz-question-title">
          {question.question}
        </h2>

        {/* Options */}
        <div className="quiz-options-list">
          {question.options.map((opt) => {
            const isChosen = selectedOption === opt.id;
            let statusClass = '';
            if (isSubmitted) {
              if (opt.id === question.correctOption) {
                statusClass = 'correct';
              } else if (isChosen) {
                statusClass = 'incorrect';
              }
            } else if (isChosen) {
              statusClass = 'selected';
            }

            return (
              <button
                key={opt.id}
                id={`quiz-option-${opt.id}`}
                className={`quiz-option-btn ${statusClass}`}
                onClick={() => handleSelectOption(opt.id)}
              >
                <div className="option-letter-badge">
                  {opt.id}
                </div>
                <div style={{ flex: 1 }}>{opt.text}</div>
                {isSubmitted && opt.id === question.correctOption && (
                  <CheckCircle size={18} color="#34d399" />
                )}
                {isSubmitted && isChosen && opt.id !== question.correctOption && (
                  <XCircle size={18} color="#f43f5e" />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions bar */}
        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            ScholarAI Adaptive Engine dynamically calibrates difficulty from previous answer logs.
          </div>

          <div>
            {!isSubmitted ? (
              <button
                id="btn-submit-quiz-answer"
                className="btn btn-primary"
                disabled={!selectedOption}
                style={{ opacity: selectedOption ? 1 : 0.5 }}
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="btn-next-quiz-question"
                className="btn btn-primary"
                onClick={handleNext}
              >
                {currentIdx < mockQuizQuestions.length - 1 ? 'Next Adaptive Item' : 'Finish Diagnostic'}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Post-Submit Cited Feedback & Misconception Analysis */}
        {isSubmitted && (
          <div className="quiz-feedback-box" style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {selectedOption === question.correctOption ? (
                <>
                  <CheckCircle size={18} color="#34d399" />
                  <span style={{ fontWeight: 700, color: '#34d399', fontSize: '0.95rem' }}>
                    Correct! Concept Mastered
                  </span>
                </>
              ) : (
                <>
                  <AlertOctagon size={18} color="#f43f5e" />
                  <span style={{ fontWeight: 700, color: '#f43f5e', fontSize: '0.95rem' }}>
                    Incorrect — Conceptual Gap Detected
                  </span>
                </>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>
              {question.explanation}
            </p>

            {/* Source Reference */}
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#c7d2fe' }}>
                <BookOpen size={16} color="#818cf8" />
                <span>Source Grounding: <strong>{question.sourceCitation.docName}</strong> ({question.sourceCitation.location})</span>
              </div>

              <span className="badge badge-indigo">
                {question.sourceCitation.slideRef}
              </span>
            </div>

            {/* Misconception Diagnostic */}
            <div style={{
              background: 'rgba(244, 63, 94, 0.08)',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              fontSize: '0.8rem',
              color: '#fda4af'
            }}>
              <strong>Misconception Alert:</strong> {question.commonMisconception}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
