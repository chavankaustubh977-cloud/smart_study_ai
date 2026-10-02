# System Architecture

## 1. High-Level Architecture

```text
                         React Frontend
                              |
                         FastAPI Backend
                              |
              +---------------+----------------+
              |               |                |
          Auth/API       Ingestion         Tutor API
              |               |                |
          Supabase       Processing          RAG
              |               |                |
              |       +-------+-------+        |
              |       |       |       |        |
              |      PDF     PPT    Video      |
              |       |       |       |        |
              |   PyMuPDF  pptx    FFmpeg      |
              |                       |        |
              |                    Whisper      |
              |                       |        |
              |                    Transcript  |
              |                       |        |
              |                  PaddleOCR      |
              |                       |        |
              +------------- Content Store -----+
                              |
                         Chunking + Metadata
                              |
                        Embeddings
                              |
                       pgvector/RAG
                              |
                           Reranker
                              |
                         LLM Router
                              |
          +-------------------+--------------------+
          |                   |                    |
         Groq              NVIDIA             SambaNova
          |                   |                    |
          +-------------------+--------------------+
                              |
                        Grounded Answer
                              |
                    Citation + Tutor UI
                              |
                     Adaptive Assessment
                              |
                       Learner Model
                              |
                       Mastery Dashboard
```

## 2. Frontend

Recommended:
- React
- Vite
- TypeScript
- Tailwind CSS
- lightweight component library

Main screens:
1. Login/signup
2. Course dashboard
3. Course upload
4. Processing status
5. Knowledge base/topic explorer
6. AI tutor
7. Quiz configuration
8. Quiz
9. Results/weakness report
10. Mastery dashboard
11. Source viewer

## 3. Backend

Recommended:
- Python
- FastAPI

Core modules:

```text
backend/
  api/
  auth/
  ingestion/
    pdf/
    ppt/
    video/
    ocr/
  rag/
    chunking/
    embeddings/
    retrieval/
    reranking/
  tutor/
  assessment/
  learner_model/
  evaluation/
  database/
  services/
```

## 4. AI Router

Never hard-code the frontend to a provider.

Expose:

```http
POST /api/ai/chat
POST /api/ai/generate-quiz
POST /api/ai/verify-question
```

The backend selects a provider.

Recommended:
- Groq: primary
- NVIDIA: fallback
- SambaNova: fallback
- OpenRouter: emergency fallback
- Gemini: specialist for selected multimodal tasks

## 5. RAG Pipeline

```text
User question
  ↓
Normalize query
  ↓
Create embedding
  ↓
Vector search
  ↓
Retrieve top-k chunks
  ↓
Cohere reranking
  ↓
Grounding threshold
  ↓
LLM
  ↓
Structured answer
  ↓
Citation validation
```

If retrieval confidence is too low:

```text
No reliable course evidence
        ↓
Flag as not covered
        ↓
Do not generate a course-grounded answer
```

## 6. Storage

Supabase:
- Auth
- PostgreSQL
- pgvector
- optional file storage

Recommended tables:

```text
profiles
courses
documents
document_chunks
topics
concepts
topic_prerequisites
questions
question_sources
quiz_attempts
answers
mastery
misconceptions
chat_sessions
chat_messages
study_recommendations
```

## 7. Source Metadata

Every chunk should preserve enough information to reconstruct its source.

Example:

```json
{
  "document_id": "doc_123",
  "page": 17,
  "slide": null,
  "video_start": null,
  "video_end": null,
  "excerpt": "..."
}
```

For video:

```json
{
  "document_id": "lecture_04",
  "page": null,
  "slide": null,
  "video_start": 1240,
  "video_end": 1274,
  "excerpt": "..."
}
```

## 8. Caching

To survive public demos:
- cache repeated questions
- cache embeddings
- cache document processing
- avoid repeated OCR
- avoid unnecessary LLM calls
- rate-limit users
- use provider fallback

Never make every frontend interaction an LLM request.
