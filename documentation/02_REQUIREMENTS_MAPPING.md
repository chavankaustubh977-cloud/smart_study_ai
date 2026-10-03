# Requirements Mapping

This document maps every requirement in Track D to a planned implementation.

## 1. Multimodal Knowledge Base

### 1a. Ingest videos, textbooks, slides without manual preprocessing

### Implementation
- PDF: PyMuPDF
- PPT/PPTX: python-pptx
- Video: FFmpeg + Whisper through Groq
- Scanned/image content: PaddleOCR
- Images/diagrams: multimodal model when interpretation is needed

### User flow
Upload file → detect type → process automatically → chunk → tag → embed → store.

### Acceptance test
A user uploads a PDF, PPT, and lecture video and receives searchable course content without manually converting files.

---

### 1b. Link every unit to page/slide/timestamp

Every chunk must carry metadata:

```json
{
  "course_id": "...",
  "document_id": "...",
  "content_type": "pdf",
  "text": "...",
  "source_page": 17,
  "source_slide": null,
  "start_time": null,
  "end_time": null,
  "topic_id": "...",
  "concept_ids": ["..."]
}
```

For video:

```json
{
  "content_type": "video",
  "start_time": 502.0,
  "end_time": 530.0
}
```

The frontend must turn citations into clickable source locations.

---

### 1c. Identify topics, subtopics and concepts

Pipeline:

```text
Extracted content
      ↓
Topic extraction
      ↓
Subtopic extraction
      ↓
Concept extraction
      ↓
Prerequisite inference
      ↓
Content tagging
```

Store:
- topics
- subtopics
- concepts
- prerequisites
- source relationships

---

### 1d. Images, diagrams and figures

OCR handles readable text.

A vision-capable model handles semantic interpretation of diagrams and figures.

Do not treat OCR output as complete diagram understanding.

---

## 2. Source Grounding

### 2a. Cited answers

Tutor pipeline:

```text
Question
  ↓
Query embedding
  ↓
Vector retrieval
  ↓
Reranking
  ↓
Relevant course chunks
  ↓
LLM
  ↓
Answer + source citations
```

Citation must preserve:
- document
- page OR slide OR timestamp
- relevant excerpt/chunk

### 2b. Unsupported queries

The system must distinguish:

1. Supported by uploaded course material
2. Partially supported
3. Not covered

Recommended behavior:

> "I couldn't find this in your uploaded course material. I can either leave it unanswered or search external sources."


---

## 3. Adaptive Assessment

### 3a. Question types

Support:
- MCQ
- short answer
- numerical/problem-solving

Each question stores:

```json
{
  "topic_id": "...",
  "source_chunk_ids": ["..."],
  "difficulty": "medium",
  "question_type": "mcq",
  "question": "...",
  "options": [],
  "answer": "...",
  "explanation": "..."
}
```

### 3b. Verification and novelty

Question generation should use:
- answer verification
- source verification
- optional second-model validation
- duplicate/similarity detection

Do not show a question unless:
- answer is valid
- source exists
- topic exists
- difficulty is assigned

### 3c. Feedback and report

After each answer:
- correct/incorrect
- cited explanation
- misconception signal if possible

After assessment:
- score
- topic performance
- weak topics
- likely misconceptions
- recommended next actions

---

## 4. Learner Model

Maintain a mastery score per topic.

Example:

```text
Inheritance       42%
Polymorphism      31%
Encapsulation     88%
Abstraction       67%
```

The score updates after:
- quiz answers
- diagnostic assessment
- relevant tutor interactions

### Initial student

If no history exists:
- diagnostic quiz OR
- intake conversation

### Simple MVP update model

A practical hackathon implementation:

```text
new_mastery =
    old_mastery * 0.7
    + current_performance * 0.3
```

This is a simple implementation, not a claim that it is equivalent to Bayesian Knowledge Tracing.

A more advanced version can implement:
- Bayesian Knowledge Tracing
- IRT-style estimation
- spaced repetition

---

## 5. System Evaluation

Use RAGAS or a similar framework.

Required metrics:
- faithfulness
- answer relevancy
- context precision
- context recall

Build a team-owned test set containing:
- questions with known source locations
- supported questions
- partially supported questions
- off-material questions

Also evaluate personalization:
- simulated student profiles
- multiple sessions
- mastery gain
- question repetition rate

---

## 6. Technical Constraints

Generated content must remain grounded in uploaded material.

Question metadata and answer keys must be accurate enough to support the learner model.

Personalization must show measurable improvement as more student data is collected.

No fixed dataset is required. Suitable material may come from MIT OpenCourseWare, NPTEL, public textbooks, or self-created content.
