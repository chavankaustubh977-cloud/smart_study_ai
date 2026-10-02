# PRD.md — Product Requirements Document

# Track D: Personalized Tutoring & Adaptive Learning

## 1. Product Summary

Build an AI study companion that unifies:

- lecture videos
- textbooks
- slide decks

into a **source-cited multimodal knowledge base**.

The system then uses that knowledge base to provide:

- source-grounded tutoring
- adaptive assessments
- personalized feedback
- per-topic learner mastery
- weak-topic identification
- personalized study recommendations

The product must not behave like a generic chatbot. Its main value is that it understands the student's uploaded course material and adapts to the student's learning state.

---

# 2. Problem Statement

Students often study from lecture videos, textbooks and slides that are scattered across different places.

General-purpose AI chatbots can provide useful explanations, but their answers may not be tied to:

- the student's actual course material;
- the exact page or slide where information appears;
- the student's current level of understanding.

The product should create a trustworthy course-specific AI companion that combines **multimodal course understanding + source grounding + adaptive assessment + learner modeling**.

---

# 3. Product Goal

The product should allow a student to:

1. create/select a course;
2. upload course material;
3. automatically process that material;
4. build a searchable multimodal knowledge base;
5. ask questions about the course;
6. receive answers grounded in the uploaded material;
7. open exact source citations;
8. generate assessments for selected topics;
9. receive cited feedback;
10. identify weak topics and misconceptions;
11. maintain a per-topic mastery profile;
12. receive future questions/recommendations based on that profile.

---

# 4. Target User

## Primary user

A student studying from:

- college lecture notes;
- textbooks;
- lecture slides;
- recorded lectures.

The student may have little or no previous interaction history with the system.

---

# 5. Core User Journey

```text
User Login
    ↓
Create / Select Course
    ↓
Upload Material
    ↓
Automatic Processing
    ↓
Multimodal Knowledge Base
    ↓
Topic / Concept Organization
    ↓
Grounded Tutor Chat
    ↓
Adaptive Assessment
    ↓
Answer Evaluation
    ↓
Cited Feedback
    ↓
Mastery Update
    ↓
Weak Topic / Misconception Detection
    ↓
Personalized Recommendation
    ↓
Next Study Session
```

This loop is the central product experience.

---

# 6. Functional Requirements

## FR-01 — Authentication

The system must allow students to:

- create an account;
- log in;
- log out;
- access their own courses and learning data.

Authentication should use Supabase Auth.

A student must not be able to access another student's course data.

### Acceptance Criteria

- Student can sign up.
- Student can log in.
- Student can log out.
- Protected pages require authentication.
- Course data is scoped to the authenticated user.

---

# 7. Course Management

## FR-02 — Create Course

A student must be able to create a course.

Course information:

```text
Course Name
Description
```

Example:

```text
Object Oriented Programming
B.Tech Semester 3
```

A course can contain multiple uploaded documents.

### Acceptance Criteria

- Course can be created.
- Course appears on dashboard.
- Course has a unique ID.
- Only the owner can modify/delete it.

---

# 8. Multimodal Knowledge Base

## FR-03 — Upload Course Material

The system must allow uploading:

- PDF textbooks/notes;
- PPT/PPTX slide decks;
- lecture videos.

The user should not manually preprocess the files.

### Acceptance Criteria

- User selects a file.
- File uploads successfully.
- Processing begins automatically.
- User can see processing status.

---

# 9. PDF Processing

## FR-04 — Process Textbooks/PDFs

For PDFs the system should:

1. extract text;
2. preserve page numbers;
3. identify sections/headings where possible;
4. extract meaningful images;
5. OCR image text when necessary;
6. create searchable chunks;
7. generate embeddings;
8. store source metadata.

Every chunk must retain its originating page.

Example:

```text
OOP_Notes.pdf
Page: 42
```

---

# 10. Slide Processing

## FR-05 — Process PPT/PPTX

For slide decks the system should:

1. extract slide text;
2. preserve slide number;
3. extract images;
4. process meaningful diagrams/figures;
5. OCR text embedded inside images when required;
6. create searchable chunks;
7. generate embeddings;
8. preserve slide metadata.

Example:

```text
OOP_Lecture.pptx
Slide: 18
```

---

# 11. Lecture Video Processing

## FR-06 — Process Lecture Videos

The system should:

1. extract audio;
2. transcribe the lecture;
3. preserve transcript timestamps;
4. divide transcript into meaningful chunks;
5. create embeddings;
6. store timestamp metadata.

Example:

```text
Lecture_05.mp4
00:14:32 – 00:15:08
```

The citation should be able to take the user to that timestamp.

---

# 12. Images, Diagrams and Figures

## FR-07 — Multimodal Visual Understanding

The system must not discard visual information from course material.

It should process relevant:

- diagrams;
- figures;
- charts;
- images;
- screenshots;
- text contained inside images.

The system may use OCR and/or a vision model.

The original visual source must remain linked to its page or slide.

---

# 13. Topic and Concept Organization

## FR-08 — Automatic Topic Extraction

The system must identify:

- major topics;
- subtopics;
- key concepts;
- prerequisites.

Example:

```text
Object Oriented Programming
├── Classes and Objects
├── Inheritance
│   ├── Types of Inheritance
│   └── Method Overriding
├── Polymorphism
└── Encapsulation
```

The system should avoid creating unnecessarily tiny topics.

---

# 14. Source Metadata

## FR-09 — Preserve Source Location

Every searchable content unit must retain its origin.

Supported source types:

```text
PDF → page
PPT → slide
Video → timestamp
Image → page/slide
```

This metadata must survive:

```text
Extraction
→ Chunking
→ Embedding
→ Retrieval
→ LLM generation
→ Citation
```

Losing source metadata is a critical failure.

---

# 15. Source-Grounded Tutor

## FR-10 — Tutor Chat

The student must be able to ask questions about the course.

Example:

```text
Explain method overriding with an example.
```

The system should:

```text
Question
→ Retrieve relevant course content
→ Rerank evidence
→ Check grounding
→ Generate explanation
→ Attach citations
```

---

# 16. Grounding Requirement

## FR-11 — Course-Grounded Answers

The tutor must prioritize uploaded course material.

The system must not present unsupported information as if it came from the student's material.

If the material is insufficient, the system must clearly flag that.

### Supported

```text
The uploaded material explains inheritance as...
Source: OOP Notes — Page 42
```

### Unsupported

```text
I couldn't find enough information about this topic
in the uploaded course material.
```

The system must never invent a citation.

---

# 17. Citation System

## FR-12 — Exact Source Citations

Each grounded answer should provide clickable citations.

Citation should contain:

```text
Document
Page / Slide / Timestamp
Relevant excerpt
```

Examples:

```text
OOP Notes.pdf — Page 42
```

```text
OOP Lecture.pptx — Slide 18
```

```text
Lecture_05.mp4 — 14:32
```

### Acceptance Criteria

- Citation corresponds to a real source.
- Citation contains valid location metadata.
- User can open/view the relevant source.
- Invalid citations are not displayed.

---

# 18. Adaptive Assessment

## FR-13 — Generate Assessments

The student must be able to generate assessments based on selected scope.

Supported question types:

- MCQ;
- short answer;
- numerical problems.

The student should be able to choose:

- topic;
- subtopic;
- question count;
- difficulty;
- question type.

---

# 19. Question Metadata

## FR-14 — Question Tagging

Every generated question must contain:

```text
Question
Type
Topic
Concept
Difficulty
Correct Answer
Explanation
Source
```

The question must be traceable to the course material.

---

# 20. Question Verification

## FR-15 — Verify Questions

Generated questions must be checked before being shown to the student.

Validation should verify:

- source supports question;
- answer key is correct;
- question is understandable;
- MCQ has a valid answer;
- numerical answer is valid;
- difficulty is reasonable;
- question is not ambiguous.

Cross-model verification may be used.

---

# 21. Question Repetition

## FR-16 — Avoid Repeated Questions

The system should avoid asking the same question repeatedly.

Use:

- exact question hash;
- semantic similarity;
- student's previous question history.

The system should distinguish between:

```text
Exact duplicate
```

and

```text
Near-duplicate
```

---

# 22. Answer Evaluation

## FR-17 — Evaluate Student Answers

The system must evaluate:

- MCQ answers;
- short answers;
- numerical answers.

For short answers, the system should compare the response with the expected answer/concepts rather than relying only on exact string matching.

---

# 23. Cited Feedback

## FR-18 — Feedback

After every answer, provide:

- correct/incorrect status;
- expected answer;
- explanation;
- source citation;
- misconception when relevant.

Example:

```text
Incorrect.

Correct Answer:
Method overriding occurs when...

Why:
...

Source:
OOP Notes — Page 42
```

---

# 24. Assessment Report

## FR-19 — Post-Assessment Analysis

After completing an assessment, show:

- score;
- topic performance;
- weak topics;
- likely misconceptions;
- recommended next action.

Example:

```text
Strong:
Encapsulation

Needs Practice:
Inheritance
Polymorphism

Likely Misconception:
Confusing overriding with overloading
```

---

# 25. Learner Model

## FR-20 — Per-Topic Mastery

The system must maintain mastery for each topic.

Example:

```text
Inheritance      43%
Polymorphism     72%
Encapsulation    88%
```

Mastery must be stored in the database.

It must not be hard-coded.

---

# 26. Mastery Updates

## FR-21 — Update Learner State

Mastery should update after meaningful learning evidence.

MVP model:

```text
new_mastery =
0.70 × old_mastery
+
0.30 × performance
```

Where performance may be:

```text
Correct → high performance
Incorrect → low performance
Partial → intermediate performance
```

Difficulty and confidence can be incorporated without allowing a single answer to completely change mastery.

---

# 27. Diagnostic Assessment

## FR-22 — New Student Initialization

A new student has no history.

The system should support:

```text
Course
→ Diagnostic Assessment
→ Topic-level performance
→ Initial Mastery
→ First Recommendation
```

The diagnostic should cover representative course topics.

---

# 28. Personalized Recommendations

## FR-23 — Recommend Next Study Action

Recommendations should consider:

- mastery;
- recent incorrect answers;
- misconceptions;
- topic importance;
- prerequisites;
- review history.

Example:

```text
You should revise Method Overriding next.
Your mastery is currently 43% and you recently
missed two questions on this concept.
```

---

# 29. Adaptive Assessment Selection

## FR-24 — Adapt Future Questions

Future questions should use learner state.

Example:

```text
Low mastery
→ easier questions + more practice

Medium mastery
→ medium questions

High mastery
→ harder questions / mixed assessment
```

Weak topics should receive more attention than already-mastered topics.

---

# 30. Dashboard

## FR-25 — Student Dashboard

Dashboard should display:

- courses;
- uploaded material;
- processing status;
- overall progress;
- per-topic mastery;
- weak topics;
- recent assessments;
- recommendations.

The dashboard should represent actual database state.

---

# 31. RAG Architecture

## FR-26 — Retrieval Pipeline

Required conceptual flow:

```text
User Question
↓
Query Embedding
↓
Vector Search
↓
Top-K Candidates
↓
Jina Reranking
↓
Grounding Decision
↓
LLM
↓
Citation Validation
↓
Answer
```

The frontend must not implement this logic.

---

# 32. AI Provider Architecture

## FR-27 — AI Provider Router

The backend should use a provider abstraction.

Current providers:

```text
Groq
NVIDIA
SambaNova
OpenRouter
Gemini
```

Current NVIDIA model:

```text
meta/llama-3.2-90b-vision-instruct
```

Current intended roles:

```text
Groq
→ Primary LLM

NVIDIA
→ Multimodal + fallback

SambaNova
→ Fallback

OpenRouter
→ Emergency fallback

Gemini
→ Optional multimodal specialist
```

The exact fallback routing configuration will be added separately.

---

# 33. RAG Providers

## FR-28 — Embedding and Reranking

Primary RAG provider:

```text
Jina
```

Use Jina for:

- embeddings;
- reranking.

Local fallback:

```text
FastEmbed / Sentence Transformers
```

Vector storage:

```text
Supabase PostgreSQL + pgvector
```

---

# 34. Processing Tools

Use local tools where appropriate:

```text
PyMuPDF
→ PDF extraction

python-pptx
→ PPT/PPTX extraction

FFmpeg
→ video/audio processing

PaddleOCR
→ OCR

FastEmbed / Sentence Transformers
→ local embedding fallback
```

Do not use an LLM for tasks that deterministic/local tools can perform.

---

# 35. Data Persistence

All important user state must persist.

Persist:

- users;
- courses;
- documents;
- chunks;
- topics;
- concepts;
- questions;
- quiz attempts;
- answers;
- mastery;
- misconceptions;
- chat sessions;
- chat messages.

Do not rely on an in-memory Python dictionary for important production data.

---

# 36. Non-Functional Requirements

## NFR-01 — Security

- API keys must remain server-side.
- `.env` must not be committed.
- Supabase service-role key must never be exposed to the frontend.
- Users must only access their own data.

## NFR-02 — Reliability

Provider failure must not unnecessarily crash the application.

Use:
- timeout;
- controlled retry;
- fallback;
- user-friendly errors.

## NFR-03 — Traceability

Every AI-generated course answer and assessment should be traceable to its supporting source material.

## NFR-04 — Usability

The user should always know:

- what course they are studying;
- what material is loaded;
- whether processing is complete;
- where an answer came from;
- what they should study next.

## NFR-05 — Maintainability

Keep:

- provider integrations modular;
- RAG stages modular;
- ingestion modules separated;
- frontend API calls centralized;
- configuration environment-based.

---

# 37. MVP Scope

## Must Have

```text
Authentication
Course creation
PDF ingestion
PPT/PPTX ingestion
Video ingestion
Topic extraction
Source metadata
RAG
Jina embedding/reranking
Grounded tutor
Citations
Unsupported-query handling
MCQ
Short answer
Numerical questions
Question verification
Duplicate avoidance
Answer feedback
Weak topics
Mastery
Diagnostic
Dashboard
Evaluation
```

## Optional After MVP

```text
Visual course flow map
Flashcards
Revision slides
Audio briefs
Study schedule
Indian-language interaction
Audio tutoring
Advanced BKT/IRT
```

Do not implement optional features at the cost of mandatory requirements.

---

# 38. Acceptance Test

A fresh student should be able to complete:

```text
1. Sign up
2. Create course
3. Upload course material
4. Wait for processing
5. View topics
6. Ask a course question
7. Receive grounded answer
8. Open exact citation
9. Ask an unsupported question
10. See unsupported warning
11. Generate assessment
12. Answer questions
13. Receive cited feedback
14. See weak topics
15. See mastery update
16. Receive recommendation
17. Generate another adaptive assessment
18. Observe changed topic/difficulty selection
```

If this complete flow works reliably, the core product is considered functional.

---

# 39. Product Success Criteria

The prototype should demonstrate that it can:

### Understand
Uploaded multimodal course material.

### Ground
Answers in that material.

### Cite
The exact source location.

### Assess
The student's knowledge.

### Adapt
Question selection based on learner state.

### Personalize
Recommendations based on weaknesses.

### Measure
Retrieval quality and learning-state changes.

---

# 40. Implementation Priority

Build in this order:

```text
P0
Authentication
↓
Course Management
↓
File Upload
↓
PDF/PPT/Video Ingestion
↓
Source-Aware Chunks
↓
Embeddings + pgvector
↓
RAG Retrieval + Reranking
↓
Grounded Tutor + Citations
↓
Assessment Generator
↓
Answer Evaluation
↓
Learner Model
↓
Dashboard
↓
Evaluation

P1
Optional enhancements
```

Do not skip the P0 sequence just to build optional UI features.
