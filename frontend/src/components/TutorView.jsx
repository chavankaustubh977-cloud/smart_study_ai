import React, { useState } from 'react';
import { sendTestMessage } from '../services/api';

export function TutorView({
  onOpenCitation,
  onNavigate,
  selectedCourse
}) {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "student",
      time: "10:42 AM",
      text: "Can you explain the difference between the phonological loop and visuospatial sketchpad?"
    },
    {
      id: "msg-2",
      sender: "tutor",
      time: "10:43 AM",
      title: "ScholarAI Tutor",
      badge: "Textbook Verified",
      lead: "In Alan Baddeley's model of working memory, both components function as domain-specific buffers coordinated by the central executive:",
      comparison: [
        {
          icon: "graphic_eq",
          title: "Phonological Loop",
          description: "Dedicated to speech-based, verbal, and acoustic inputs. Comprises an inner voice (articulatory rehearsal) and an inner ear (phonological store) with a decay window of ~2 seconds."
        },
        {
          icon: "view_in_ar",
          title: "Visuospatial Sketchpad",
          description: "Responsible for visual patterns, spatial positions, and kinetic imagery. Handles both static form identification and dynamic mental spatial navigation."
        }
      ],
      showDiagram: true,
      citation: {
        type: "pdf",
        title: "Cognitive Psychology (8th Ed.)",
        location: "Chapter 4, Page 12",
        sourceLabel: "Source · Chapter 4, Page 12",
        bookTitle: "(Cognitive Psychology, 8th Ed.)",
        excerpt: "In Alan Baddeley's model of working memory, both components function as domain-specific buffers coordinated by the central executive. The phonological loop retains speech-based acoustic representations with a decay window of ~2 seconds."
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const studentMsg = {
      id: `std-${Date.now()}`,
      sender: "student",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages((prev) => [...prev, studentMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Call backend API test if available
    sendTestMessage(query, { course: selectedCourse?.title || "Cognitive Psychology" });

    // Respond with grounded answer matching query
    setTimeout(() => {
      let reply;
      const lower = query.toLowerCase();

      if (lower.includes("quantum") || lower.includes("crypto") || lower.includes("stock")) {
        reply = {
          id: `tut-${Date.now()}`,
          sender: "tutor",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: "ScholarAI Tutor",
          badge: "Off-Syllabus Check",
          lead: `The current syllabus for ${selectedCourse?.title || "Cognitive Psychology"} focuses on human cognitive architecture, sensory processing, and memory consolidation. This topic is not covered in your uploaded textbooks or lecture slides.`,
          comparison: null,
          showDiagram: false,
          citation: null
        };
      } else if (lower.includes("attention") || lower.includes("filter")) {
        reply = {
          id: `tut-${Date.now()}`,
          sender: "tutor",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: "ScholarAI Tutor",
          badge: "Lecture Verified",
          lead: "Broadbent's Early Selection Filter model posits that sensory inputs are held briefly in sensory buffers before an all-or-none bottleneck filter allows only attended channel features into higher perceptual processing:",
          comparison: [
            {
              icon: "filter_alt",
              title: "Early Selection (Broadbent)",
              description: "Filtering occurs prior to semantic analysis based purely on physical characteristics (pitch, ear location)."
            },
            {
              icon: "tune",
              title: "Attenuation Model (Treisman)",
              description: "Unattended stimuli are not completely blocked, but attenuated (turned down in volume), allowing high-priority words (e.g. your name) to trigger awareness."
            }
          ],
          showDiagram: false,
          citation: {
            type: "ppt",
            title: "Lecture 04 Slides",
            location: "Slide 18",
            sourceLabel: "Source · Slide 18",
            bookTitle: "(Class Slides 4 — Attention)",
            excerpt: "Slide 18: Treisman's Attenuation Theory. The selective filter attenuates rather than obliterates unattended acoustic channels."
          }
        };
      } else {
        reply = {
          id: `tut-${Date.now()}`,
          sender: "tutor",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: "ScholarAI Tutor",
          badge: "Textbook Verified",
          lead: `Regarding "${query}", your course materials highlight that retention in working memory relies on active coordination by the Central Executive, backed by continuous rehearsal within domain-specific slave subsystems:`,
          comparison: null,
          showDiagram: false,
          citation: {
            type: "pdf",
            title: "Chapter 4 — Memory",
            location: "Page 18",
            sourceLabel: "Source · Chapter 4, Page 18",
            bookTitle: "(Cognitive Psychology, 8th Ed.)",
            excerpt: "Page 18: 'Effective memory consolidation requires linking short-term sensory traces to existing long-term conceptual schemata through elaborative encoding.'"
          }
        };
      }

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="page-container-wide">
      {/* Session Context Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="pill-badge pill-primary" style={{ gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
            {selectedCourse?.title || "Cognitive Psychology"} • {selectedCourse?.code || "PSYC 304"}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
            • Live Knowledge Base (Spring 2025)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.02em' }}>
            Ask your tutor
          </h1>
          <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
            3 sources indexed: Baddeley (2020), Lecture Slides 1-8, Seminar Notes
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
          Ask questions grounded directly in your syllabus, textbook, and lecture notes.
        </p>
      </div>

      {/* Primary Interactive Canvas Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left / Conversation Flow Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {messages.map((msg) => {
              if (msg.sender === 'student') {
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '85%' }}>
                      <div
                        style={{
                          backgroundColor: 'var(--surface-container-high)',
                          color: 'var(--on-surface)',
                          padding: '0.85rem 1.15rem',
                          borderRadius: 'var(--radius-lg)',
                          fontSize: '0.95rem',
                          lineHeight: 1.5,
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        {msg.text}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem', marginRight: '0.25rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)' }}>{msg.time}</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--primary)' }}>done_all</span>
                      </div>
                    </div>

                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--on-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      M
                    </div>
                  </div>
                );
              }

              // Tutor Message
              return (
                <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--secondary-container)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '0.25rem'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>auto_awesome</span>
                  </div>

                  <div className="scholar-card" style={{ flex: 1, padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)' }}>{msg.title}</span>
                        {msg.badge && (
                          <span className="pill-badge pill-neutral" style={{ fontSize: '0.72rem' }}>
                            {msg.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--on-surface-variant)' }}>
                        <button className="btn-ghost" style={{ padding: '4px' }} title="Read aloud">
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>volume_up</span>
                        </button>
                        <button className="btn-ghost" style={{ padding: '4px' }} title="Save note">
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bookmark_border</span>
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--on-surface)', lineHeight: 1.55 }}>
                      {msg.lead}
                    </p>

                    {/* Semantic Contrast Grid if available */}
                    {msg.comparison && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                        {msg.comparison.map((c, i) => (
                          <div
                            key={i}
                            style={{
                              padding: '0.85rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: 'var(--surface-container-low)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.35rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
                                {c.icon}
                              </span>
                              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                                {c.title}
                              </span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', lineHeight: 1.45 }}>
                              {c.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Schematic Diagram if available */}
                    {msg.showDiagram && (
                      <div
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--surface-container-low)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                          <span>Cognitive Architecture Schematic</span>
                          <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Zoom diagram</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                          <svg viewBox="0 0 460 110" style={{ width: '100%', maxWidth: '420px', height: '90px' }}>
                            <rect x="155" y="6" width="150" height="34" rx="6" fill="var(--surface-container-high)" />
                            <text x="230" y="27" textAnchor="middle" fill="var(--on-surface)" fontSize="12" fontWeight="600" fontFamily="sans-serif">
                              Central Executive
                            </text>
                            <path d="M190 40 L110 74" stroke="var(--on-surface-variant)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                            <path d="M270 40 L350 74" stroke="var(--on-surface-variant)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                            <rect x="30" y="72" width="160" height="32" rx="6" fill="var(--secondary-container)" />
                            <text x="110" y="92" textAnchor="middle" fill="var(--primary)" fontSize="11" fontWeight="600" fontFamily="sans-serif">
                              Phonological Loop
                            </text>
                            <rect x="270" y="72" width="160" height="32" rx="6" fill="var(--secondary-container)" />
                            <text x="350" y="92" textAnchor="middle" fill="var(--primary)" fontSize="11" fontWeight="600" fontFamily="sans-serif">
                              Visuospatial Sketchpad
                            </text>
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Source Citation Bar */}
                    {msg.citation && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '0.75rem',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
                            library_books
                          </span>
                          <span style={{ fontWeight: 600, color: 'var(--on-surface)' }}>{msg.citation.sourceLabel}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>{msg.citation.bookTitle}</span>
                        </div>

                        <button
                          className="btn-ghost"
                          onClick={() => onOpenCitation && onOpenCitation(msg.citation)}
                        >
                          <span>Open source</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                        </button>
                      </div>
                    )}

                    {/* Follow-up Drill Card */}
                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--surface-container)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>quiz</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--on-surface)' }}>
                          Would you like to test your understanding with a quick 3-question drill?
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button className="btn-primary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }} onClick={() => onNavigate('practice')}>
                          Start drill
                        </button>
                        <button className="btn-ghost" style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                          Skip
                        </button>
                      </div>
                    </div>

                    {/* Reaction micro-controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.78rem', color: 'var(--on-surface-variant)', paddingTop: '0.25rem' }}>
                      <span>Was this helpful?</span>
                      <button className="btn-ghost" style={{ padding: '2px 4px', fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>thumb_up</span>
                        <span>Yes</span>
                      </button>
                      <button className="btn-ghost" style={{ padding: '2px 4px', fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>thumb_down</span>
                        <span>Clarify</span>
                      </button>
                      <span>•</span>
                      <button className="btn-ghost" style={{ padding: '2px 4px', fontSize: '0.78rem', color: 'var(--primary)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>add_notes</span>
                        <span>Add to Flashcard Deck</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>auto_awesome</span>
                <span>ScholarAI is reviewing course notes...</span>
              </div>
            )}
          </div>

          {/* Prompt Suggestions & Persistent Input Box */}
          <div style={{ position: 'sticky', bottom: '1rem', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {/* Suggested Prompts Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '2px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>tips_and_updates</span>
                Prompts:
              </span>
              {[
                "Explain working memory",
                "Quiz me on attention",
                "Explain this diagram",
                "What am I weak at?"
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--surface-container-lowest)',
                    border: '1px solid var(--outline-variant)',
                    fontSize: '0.78rem',
                    color: 'var(--on-surface)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form Box */}
            <div
              className="scholar-card"
              style={{
                padding: '0.5rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-hover)'
              }}
            >
              <button className="btn-ghost" style={{ padding: '6px' }} title="Attach note">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>attach_file</span>
              </button>

              <input
                type="text"
                placeholder="Ask anything about your course..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--on-surface)',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit'
                }}
              />

              <button className="btn-ghost" style={{ padding: '6px' }} title="Dictate">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>mic</span>
              </button>

              <button
                className="btn-primary"
                onClick={() => handleSend()}
                style={{ padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-md)' }}
                title="Send query"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_upward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Rail: Study Diagnostic Anchor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: '240px' }}>
          {/* Unit 3 Mastery Card */}
          <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>insights</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)' }}>Unit 3 Mastery</span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>74%</span>
            </div>

            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: '74%' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--on-surface)' }}>Working Memory</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Strong</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--on-surface)' }}>Selective Attention</span>
                <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Reviewing</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--on-surface)' }}>Executive Function</span>
                <span style={{ color: 'var(--error)', fontWeight: 600 }}>Needs Practice</span>
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{ width: '100%', fontSize: '0.82rem', padding: '0.45rem' }}
              onClick={() => onNavigate('progress')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>tune</span>
              <span>View study breakdown</span>
            </button>
          </div>

          {/* Quick References Card */}
          <div className="scholar-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--on-surface)' }}>
              Course References
            </span>

            {[
              { title: "Chapter 4 — Memory", loc: "Page 12", type: "pdf" },
              { title: "Week 04 Slides", loc: "Slide 18", type: "ppt" },
              { title: "Lecture 05 Audio", loc: "14:32", type: "video" }
            ].map((ref, i) => (
              <div
                key={i}
                onClick={() => onOpenCitation && onOpenCitation({
                  type: ref.type,
                  title: ref.title,
                  location: ref.loc,
                  excerpt: `Grounded reference from ${ref.title} at ${ref.loc}.`
                })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.65rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-container-low)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>
                    {ref.type === 'pdf' ? 'picture_as_pdf' : ref.type === 'ppt' ? 'slideshow' : 'play_circle'}
                  </span>
                  <span style={{ color: 'var(--on-surface)', fontWeight: 500 }}>{ref.title}</span>
                </div>
                <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem' }}>{ref.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
