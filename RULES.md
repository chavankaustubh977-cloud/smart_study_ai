# RULES.md — Mandatory Development Rules

This file is the final rulebook for Antigravity and the development team.

## 1. Follow the Track D problem statement
The Track D requirements are the product source of truth. Do not remove mandatory requirements just because they are harder to implement.

## 2. Do not build a generic chatbot
The product must be a course-grounded adaptive tutor.

The core loop is:

```text
Upload material
→ Build knowledge base
→ Retrieve course evidence
→ Cite source
→ Tutor
→ Assess
→ Update mastery
→ Personalize next step
```

## 3. Never hallucinate citations
Only cite source IDs that were actually retrieved and supplied to the model.

Never invent:
- page numbers
- slide numbers
- timestamps
- document names
- excerpts

## 4. Unsupported questions must be flagged
If the uploaded material does not contain enough evidence, the system must clearly say so.

Do not silently use general model knowledge as if it came from the course.

## 5. Preserve source metadata everywhere
Every chunk must retain its origin:
- PDF page
- PPT slide
- video timestamp

Never create a chunk without source metadata.

## 6. Frontend must never contain provider API keys
Correct:

```text
React → FastAPI → AI provider
```

Never:

```text
React → Groq/NVIDIA/Jina directly
```

## 7. Use the current environment baseline
Do not randomly add, rename or remove environment variables.

Current baseline:

```env
GROQ_API_KEY=

NVIDIA_API_KEY=
NVIDIA_MODEL=meta/llama-3.2-90b-vision-instruct

SAMBANOVA_API_KEY=

OPENROUTER_API_KEY=

GEMINI_API_KEY=

JINA_API_KEY=
EMBEDDING_PROVIDER=jina
EMBEDDING_MODEL=
RERANK_PROVIDER=jina
RERANK_MODEL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

API_BASE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

Fallback routing variables will be added separately later.

## 8. Do not hard-code fake data
Do not use fake:
- quiz scores
- mastery
- topic progress
- source citations
- course information
- AI answers

Development seed data is acceptable only when clearly separated from the real user workflow.

## 9. Do not break existing working features
Before changing existing code:
- inspect current implementation;
- understand dependencies;
- preserve working behavior;
- make focused changes.

## 10. Keep provider integrations modular
Create provider adapters behind a common interface.

Do not scatter Groq/NVIDIA/SambaNova/OpenRouter code throughout business logic.

## 11. Keep RAG modular
RAG should have separate stages:
- ingestion
- chunking
- embeddings
- retrieval
- reranking
- grounding
- generation
- citation validation

Do not combine everything into one giant function.

## 12. Validate generated assessments
Never trust generated questions blindly.

Verify:
- source support
- answer key
- topic
- difficulty
- ambiguity
- duplicates

## 13. Mastery must be dynamic
The dashboard cannot show hard-coded percentages.

Mastery must come from stored learner data and change after evaluated interactions.

## 14. Do not overuse LLM calls
Use normal code for deterministic tasks.

Use LLMs only where reasoning/generation is actually required.

Use local tools for:
- PDF extraction
- PPT parsing
- video/audio processing
- OCR where appropriate
- database operations
- basic validation.

## 15. Handle provider failures
A temporary provider failure should not crash the application.

Implement controlled:
- timeout
- retry
- fallback
- user-friendly error

Do not create infinite retry loops.

## 16. Handle partial ingestion failures
If one image/page fails, do not automatically discard the entire document.

Record the failure and continue when possible.

If the complete document fails, show a clear retryable error.

## 17. Security
Never commit:
- `.env`
- API keys
- Supabase service-role secrets
- private credentials

Ensure `.env` is in `.gitignore`.

## 18. Validate ownership
A user must only access courses, documents, chats, assessments and mastery belonging to them.

Never trust a client-supplied `student_id` as authorization.

## 19. UI must communicate system state
Every long-running action needs:
- loading state
- progress/status
- success state
- failure state

Never leave users staring at an unexplained blank screen.

## 20. Keep the UI practical
Prioritize:
- readability
- source visibility
- course context
- learning progress
- useful actions

Do not spend excessive development time on decorative animations before core functionality works.

## 21. Do not add unnecessary technologies
Use the documented stack unless there is a concrete technical reason to change it.

Avoid adding multiple overlapping:
- vector databases
- embedding providers
- LLM providers
- OCR systems
- frontend state libraries

More tools do not automatically mean a better hackathon project.

## 22. No silent architecture changes
If a developer wants to change:
- database
- provider
- model
- API contract
- ingestion strategy
- authentication
- RAG strategy

update the relevant documentation first.

## 23. Keep API contracts stable
Frontend and backend must use documented request/response structures.

If an API changes:
1. update backend;
2. update frontend types/client;
3. update documentation;
4. test end-to-end.

## 24. Test the complete learning loop
The final system must support:

```text
Login
→ Course
→ Upload
→ Process
→ Ask
→ Citation
→ Quiz
→ Answer
→ Feedback
→ Mastery
→ Recommendation
→ Adaptive next quiz
```

If this loop is broken, the project is not complete.

## 25. Build mandatory features before optional features
Priority:

```text
P0 — ingestion
P0 — source-grounded RAG
P0 — citations
P0 — assessment
P0 — learner model
P0 — dashboard
P0 — evaluation

P1 — visual course map
P1 — revision material
P1 — study schedule
P1 — Indian-language interaction
P1 — audio tutoring
```

## 26. Antigravity must inspect before modifying
Do not blindly overwrite existing code.

First identify:
- existing routes
- existing components
- existing database code
- existing environment handling
- existing Supabase integration
- existing API clients

Then integrate.

## 27. Final rule
When choosing between a flashy feature and a reliable core requirement, implement the reliable core requirement first.

The project should be judged by:

```text
Multimodal
+ Grounded
+ Cited
+ Adaptive
+ Personalized
+ Evaluated
```
