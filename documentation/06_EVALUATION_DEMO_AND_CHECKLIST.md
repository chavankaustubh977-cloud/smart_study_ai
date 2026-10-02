# Evaluation, Demo & Submission Checklist

## 1. Required Deliverables

### Working Software Prototype

Must demonstrate:
- multimodal ingestion workflow
- source-grounded tutor chat
- adaptive assessment generator
- dashboard

### Project Documentation

Document:
- architecture
- grounding method
- learner-model approach

### Evaluation & Benchmarking

Report:
- framework-based RAG metrics
- simulated student results
- team-chosen course material

### Demonstration Video

Length:
- 3–10 minutes

Must demonstrate:
- source uploading workflow
- grounded chat interactions
- assessment pipeline
- technical architecture implementation

---

## 2. RAG Evaluation Dataset

Create a test set with:

### Supported questions

```text
Question
Expected source page/slide/timestamp
Expected answer
```

### Off-material questions

Questions intentionally outside the uploaded material.

Expected behavior:
- decline or flag
- do not falsely claim course support

### Difficult retrieval questions

Questions where relevant information is distributed across multiple chunks.

---

## 3. Metrics

Report:
- faithfulness
- answer relevancy
- context precision
- context recall

Do not fabricate results.

Show:
- test-set size
- metric definitions
- evaluation method
- known limitations

---

## 4. Personalization Experiment

Create simulated profiles.

Example:

### Student A
- strong in basics
- weak in polymorphism

### Student B
- weak in basics
- strong in advanced topics

Run several sessions for each.

Measure:
- initial mastery
- final mastery
- mastery gain
- repeated question rate
- weak-topic recommendation accuracy

---

## 5. Example Results Table

```text
Metric                    Result
Faithfulness              XX
Answer Relevancy          XX
Context Precision         XX
Context Recall            XX
Average Mastery Gain      XX
Question Repetition Rate  XX
```

Replace XX only with measured results.

---

## 6. Evaluation Criteria Mapping

### Knowledge Base & Grounding — 20%

Demonstrate:
- accurate extraction
- source preservation
- citation accuracy
- unsupported-query handling

### Assessment Quality — 15%

Demonstrate:
- correct questions
- novel questions
- topic/source/difficulty tags
- useful feedback
- analysis reports

### Personalization — 20%

Demonstrate:
- learner model
- measurable mastery gain
- recommendations changing with student state

### UX & Demo — 15%

Demonstrate:
- clear dashboard
- simple upload flow
- clean tutor
- usable quiz flow
- strong 3–10 minute demo

### System Evaluation — 15%

Demonstrate:
- appropriate framework
- quality test set
- honest metrics
- limitations

### Technical Implementation — 15%

Demonstrate:
- clean architecture
- modular backend
- reliable API routing
- secure credentials
- maintainable code

---

## 7. Suggested Demo Story

### Minute 0–1
Create course and upload:
- textbook PDF
- lecture PPT
- lecture video

### Minute 1–2
Show automatic processing:
- topics
- concepts
- source locations

### Minute 2–3
Ask tutor question.

Show:
- grounded answer
- page citation
- timestamp citation

Ask an off-material question.

Show:
- material-not-covered response

### Minute 3–5
Start diagnostic/adaptive quiz.

Show:
- question difficulty
- topic
- source

Answer some correctly and some incorrectly.

### Minute 5–6
Show post-assessment:
- score
- weak topics
- misconceptions

### Minute 6–7
Return to tutor.

Show that the tutor/recommendations now reflect the learner state.

### Minute 7–8
Show mastery dashboard and mastery change.

### Minute 8–10
Show architecture and evaluation results.

---

## 8. Final Development Checklist

### Knowledge Base
- [ ] PDF upload
- [ ] PPT upload
- [ ] Video upload
- [ ] PDF page metadata
- [ ] PPT slide metadata
- [ ] Video timestamp metadata
- [ ] OCR
- [ ] diagram/image handling
- [ ] topic extraction
- [ ] concept extraction
- [ ] prerequisite relationships

### Grounding
- [ ] vector search
- [ ] reranking
- [ ] source citations
- [ ] clickable source locations
- [ ] unsupported-query detection

### Assessment
- [ ] MCQ
- [ ] short answer
- [ ] numerical/problem type
- [ ] topic tags
- [ ] source tags
- [ ] difficulty tags
- [ ] answer verification
- [ ] duplicate prevention
- [ ] cited feedback
- [ ] post-quiz report

### Learner Model
- [ ] diagnostic mode
- [ ] per-topic mastery
- [ ] update after quiz
- [ ] update from relevant conversations
- [ ] weak-topic detection
- [ ] misconception tracking
- [ ] adaptive question selection

### Evaluation
- [ ] RAGAS/DeepEval/TruLens
- [ ] supported test set
- [ ] off-material test set
- [ ] source-location test set
- [ ] faithfulness
- [ ] relevancy
- [ ] context precision
- [ ] context recall
- [ ] simulated student profiles
- [ ] mastery gain
- [ ] repetition rate

### Security
- [ ] .env
- [ ] .env in .gitignore
- [ ] service-role key backend-only
- [ ] RLS policies
- [ ] upload validation
- [ ] API rate limiting
- [ ] provider fallback
- [ ] caching

### Submission
- [ ] working prototype
- [ ] architecture documentation
- [ ] grounding documentation
- [ ] learner-model documentation
- [ ] evaluation report
- [ ] 3–10 minute YouTube demo
