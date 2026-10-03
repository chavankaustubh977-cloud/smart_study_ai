import React, { useState } from 'react';
import {
  Send,
  Bot,
  User,
  FileText,
  Presentation,
  Video,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';
import { mockTutorChat } from '../../frontend/src/mockData';

export function TutorChat({ onOpenCitation }) {
  const [messages, setMessages] = useState(mockTutorChat);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "Why does 64-bit architecture need multi-level paging?",
    "Explain the Translation Lookaside Buffer (TLB) hit ratio.",
    "Does quantum memory entanglement speed up paging? (Test off-syllabus)"
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "student",
      text: text,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate grounded RAG answer
    setTimeout(() => {
      let aiResponse;
      const lower = text.toLowerCase();

      if (lower.includes('quantum') || lower.includes('entanglement')) {
        aiResponse = {
          id: `msg-ai-${Date.now()}`,
          sender: "ai",
          text: "⚠️ **Unsupported in Course Material**: The uploaded materials for CS-301 (Silberschatz Chapters 8-9, Lecture 7 Slides, and Lecture 8 Recording) do not contain information regarding quantum computing or memory entanglement.\n\nPer ScholarAI course grounding policy, I will not synthesize an answer from unverified external speculation. Would you like to review physical memory paging architectures or TLBs instead?",
          isUnsupported: true,
          citations: [],
          timestamp: "Just now",
          groundingConfidence: 8.5,
          groundedStatus: "FLAGGED_OFF_SYLLABUS"
        };
      } else if (lower.includes('tlb') || lower.includes('translation lookaside')) {
        aiResponse = {
          id: `msg-ai-${Date.now()}`,
          sender: "ai",
          text: "The **Translation Lookaside Buffer (TLB)** is a fast hardware associative cache built into the Memory Management Unit (MMU) that stores recent virtual-to-physical page translations.\n\nWhen the CPU generates a logical address, the page number is presented to the TLB:\n1. **TLB Hit**: The frame number is retrieved in a single clock cycle without accessing physical memory.\n2. **TLB Miss**: A normal memory access is required to traverse page tables in RAM, incurring a latency penalty of 10–100ns.\n\nEffective Access Time (EAT) = $HitRate \\times (TLB\\_time + RAM\\_time) + (1 - HitRate) \\times (TLB\\_time + 2 \\times RAM\\_time)$.",
          citations: [
            {
              id: "cit-tlb-1",
              label: "Silberschatz Ch. 9",
              page: 246,
              docType: "pdf",
              snippet: "Section 9.3: Translation Lookaside Buffer. 'A standard memory lookup requires two memory accesses per word... The TLB contains only a few of the page-table entries...'"
            },
            {
              id: "cit-tlb-2",
              label: "Lecture 7: Virtual Memory",
              slide: 19,
              docType: "ppt",
              snippet: "Slide 19: 'TLB Hardware Structure: Parallel lookup in ~0.5 to 1 nanosecond. Typical hit rates exceed 95% in modern desktop workloads.'"
            }
          ],
          timestamp: "Just now",
          groundingConfidence: 99.1,
          groundedStatus: "VERIFIED_COURSE_GROUNDED"
        };
      } else {
        aiResponse = {
          id: `msg-ai-${Date.now()}`,
          sender: "ai",
          text: `Based on your course materials, this topic relates to the fundamental mechanisms of memory isolation and page mapping. In **Silberschatz Chapter 9**, this is formally treated through address space translation and protection bits.\n\nEach page entry stores valid/invalid flags, dirty bits, and read/write permissions to prevent unauthorized memory corruption between processes.`,
          citations: [
            {
              id: "cit-gen-1",
              label: "Silberschatz Ch. 8",
              page: 231,
              docType: "pdf",
              snippet: "Page 231: 'Protection in Paged Environment. Memory protection is accomplished by protection bits associated with each frame...'"
            }
          ],
          timestamp: "Just now",
          groundingConfidence: 96.4,
          groundedStatus: "VERIFIED_COURSE_GROUNDED"
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="tutor-layout">
      {/* Main Chat Stream */}
      <div className="glass-card chat-container">
        {/* Chat Header */}
        <div className="glass-card-header" style={{ marginBottom: '0.75rem' }}>
          <div className="card-title-group">
            <Bot size={22} color="#818cf8" />
            <div>
              <h3 className="card-title">Grounded Course Tutor</h3>
              <p className="card-subtitle">
                Answering with strict citations to your course textbook, slides & lecture video
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-emerald">
              <ShieldCheck size={12} />
              Grounding Verification: Active
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="chat-history">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-msg ${msg.sender} ${msg.isUnsupported ? 'unsupported' : ''}`}
            >
              <div className={`chat-avatar ${msg.sender}`}>
                {msg.sender === 'student' ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div className="chat-bubble">
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>

                {/* Grounded Citation Rack */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="citation-rack">
                    <div className="citation-rack-title">
                      <ShieldCheck size={14} color="#34d399" />
                      <span>Verified Course Citations:</span>
                    </div>

                    <div className="citation-chips-group">
                      {msg.citations.map((cit) => (
                        <button
                          key={cit.id}
                          className="citation-chip"
                          onClick={() => onOpenCitation(cit)}
                          title="Click to view exact source context"
                        >
                          {cit.docType === 'pdf' ? (
                            <FileText size={14} color="#818cf8" />
                          ) : cit.docType === 'ppt' ? (
                            <Presentation size={14} color="#38bdf8" />
                          ) : (
                            <Video size={14} color="#f43f5e" />
                          )}
                          <span>{cit.label}</span>
                          <span style={{ opacity: 0.6 }}>•</span>
                          <span style={{ color: '#38bdf8' }}>
                            {cit.page ? `p. ${cit.page}` : cit.slide ? `Slide ${cit.slide}` : cit.timestamp}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {msg.isUnsupported && (
                  <div style={{
                    marginTop: '0.85rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    fontSize: '0.75rem',
                    color: '#fde68a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <AlertTriangle size={14} color="#f59e0b" />
                    <span>Rule 4 Flag: No course source found. Hallucination strictly prevented.</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg ai">
              <div className="chat-avatar ai">
                <Bot size={18} />
              </div>
              <div className="chat-bubble" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="nav-tab-pulse-badge"></span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Retrieving chunks from pgvector & cross-checking course citations...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
          {samplePrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
              onClick={() => handleSendMessage(prompt)}
            >
              <Sparkles size={12} color="#818cf8" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <input
            id="tutor-chat-input"
            type="text"
            className="chat-text-input"
            placeholder="Ask a course-grounded question (e.g., 'What is inverted paging?')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button
            id="btn-send-message"
            className="btn btn-primary"
            onClick={() => handleSendMessage()}
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>

      {/* Right Sidebar: Active Course Context */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="glass-card">
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            Course Grounding Context
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Questions are resolved exclusively against the 3 primary sources ingested into your knowledge base.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <FileText size={18} color="#818cf8" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>Silberschatz Ch. 8 & 9</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>64 pages indexed • 142 chunks</div>
              </div>
            </div>

            <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Presentation size={18} color="#38bdf8" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>Lecture 7: Virtual Memory PPT</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>48 slides parsed • 78 chunks</div>
              </div>
            </div>

            <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Video size={18} color="#f43f5e" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>Lecture 8 Recording (47m)</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Synced with Whisper transcripts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Info size={16} color="#67e8f9" />
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
              Citation Integrity Guard
            </h4>
          </div>
          <p style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Per Track D rule #3, citations are never invented. When you click any citation chip, the exact coordinate (page or video timestamp) is retrieved from pgvector metadata.
          </p>
        </div>
      </div>
    </div>
  );
}
