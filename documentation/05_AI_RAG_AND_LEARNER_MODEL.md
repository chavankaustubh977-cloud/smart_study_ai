# AI, RAG & Learner Model Design

## 1. RAG Strategy

RAG = Retrieval-Augmented Generation.

The system retrieves relevant course content before asking the LLM to answer.

### Ingestion

```text
Document
 ↓
Extract
 ↓
Clean
 ↓
Chunk
 ↓
Attach source metadata
 ↓
Embed
 ↓
Store in pgvector
```

### Retrieval

```text
Question
 ↓
Embedding
 ↓
Vector search
 ↓
Top-k candidates
 ↓
Cohere rerank
 ↓
Grounding decision
```

## 2. Chunking

Chunk by semantic boundaries where possible.

Avoid:
- extremely tiny chunks
- huge chunks containing many unrelated topics

Store overlap when needed.

Every chunk must retain source metadata.

## 3. Grounding Prompt

The tutor should receive:
- user question
- retrieved course excerpts
- source metadata
- learner state when relevant

Instruction:

```text
Answer using the supplied course evidence.
Do not invent course-specific facts.
If the evidence does not support the answer, say that the
uploaded material does not cover it.
Do not present external knowledge as course-backed knowledge.
Return source references for claims supported by the material.
```

## 4. Citation Validation

Before displaying an answer:
- ensure cited chunk IDs exist
- ensure chunk belongs to user's course
- ensure source location exists
- ensure citation matches retrieved evidence

## 5. Adaptive Assessment Engine

Question generation input:

```json
{
  "course": "...",
  "scope": ["Inheritance", "Polymorphism"],
  "difficulty": "medium",
  "student_mastery": {
    "Inheritance": 0.42,
    "Polymorphism": 0.31
  },
  "previous_question_ids": ["..."]
}
```

Question selection strategy:

```text
1. Identify weak topics
2. Select questions for weak topics
3. Avoid recently used questions
4. Match difficulty to mastery
5. Verify answer and source
6. Return quiz
```

## 6. Difficulty Strategy

Example:
- mastery < 40% → easy
- 40–70% → medium
- > 70% → harder

These thresholds are implementation choices and should be tuned during testing.

## 7. Learner Model

For MVP:

```text
performance = correct_answers / attempted_answers

new_mastery =
    0.7 * old_mastery
    + 0.3 * performance
```

Add confidence based on number of attempts.

Do not treat one answer as definitive mastery.

## 8. Diagnostic Assessment

For a new student:
- 5–10 questions per major topic
- broad coverage
- mixed difficulty
- use results to initialize mastery

## 9. Misconception Detection

Signals:
- repeated error pattern
- wrong answer paired with specific explanation
- confusion between closely related concepts
- repeated incorrect response despite prior explanation

Store a structured misconception record.

## 10. Personalization Loop

```text
Student
 ↓
Diagnostic
 ↓
Initial mastery
 ↓
Tutor / Quiz
 ↓
Answer data
 ↓
Mastery update
 ↓
Weak-topic detection
 ↓
Adaptive question selection
 ↓
New performance
 ↓
Repeat
```

This closed loop is the core differentiator from a generic chatbot.
