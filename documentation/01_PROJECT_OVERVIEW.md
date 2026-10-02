# Track D — Personalized Tutoring & Adaptive Learning

## 1. Problem Statement

Build an AI study companion that unifies lecture videos, textbooks, and slide decks into a source-cited knowledge base and uses that knowledge base to provide adaptive assessments and personalized tutoring.

The system must be course-grounded: answers should be supported by uploaded material, with citations pointing to the exact page, slide, or video timestamp. It must also model the learner's topic-level mastery and adapt assessments and recommendations based on the learner's state.

## 2. Core Problem

Students often study from:
- lecture videos
- textbooks
- PPT/slide decks

These resources are scattered across locations. A general chatbot can answer questions, but its answers may not be tied to the student's course material or to what the student already understands.

Our product solves this by combining:
1. multimodal course ingestion
2. source-grounded RAG
3. adaptive assessment
4. learner modeling
5. personalized recommendations
6. measurable evaluation

## 3. Product Vision

> A source-grounded AI tutor that understands a student's complete course material, tracks what the student knows, identifies weaknesses, and continuously adapts what it teaches and tests.

## 4. Target User

Primary user:
- college/university student

Typical workflow:
1. Create an account.
2. Create a course.
3. Upload textbook PDFs, lecture slides, and lecture videos.
4. System processes and organizes the material.
5. Student asks questions in the tutor.
6. Tutor answers using course sources and citations.
7. Student takes a diagnostic or adaptive quiz.
8. System updates topic mastery.
9. Dashboard identifies weak topics.
10. System recommends targeted revision and questions.

## 5. MVP

The minimum strong demo should implement:

- PDF/PPT/video ingestion
- topic and concept extraction
- source metadata preservation
- OCR for scanned/image content
- transcript generation for videos
- vector retrieval
- grounded tutor chat
- exact source citations
- unsupported-query handling
- diagnostic quiz
- adaptive MCQ/short-answer assessment
- question metadata: topic/source/difficulty
- answer verification
- duplicate-question prevention
- per-topic mastery
- post-quiz weakness/misconception report
- dashboard

## 6. Optional Enhancements

After the MVP is stable:
- visual prerequisite/course-flow map
- flashcards
- revision slides
- audio briefs
- personalized study schedule
- forgetting-curve-based revision
- Hindi/Indian-language interaction
- audio/voice tutoring

## 7. Non-Goals

Do not make the project primarily:
- a generic chatbot
- a web-search chatbot
- a PDF summarizer
- a static quiz generator

The differentiator is the complete learning loop:

Upload → Retrieve → Teach → Test → Diagnose → Update mastery → Adapt → Repeat
