# Database & Data Model

## 1. profiles

```text
id
email
name
created_at
```

## 2. courses

```text
id
user_id
name
description
created_at
```

## 3. documents

```text
id
course_id
name
type
storage_path
processing_status
created_at
```

Types:
- pdf
- ppt
- video

## 4. document_chunks

```text
id
document_id
course_id
content
embedding
page_number
slide_number
start_time
end_time
metadata
created_at
```

## 5. topics

```text
id
course_id
name
description
```

## 6. concepts

```text
id
topic_id
name
description
```

## 7. topic_prerequisites

```text
topic_id
prerequisite_topic_id
confidence
```

## 8. questions

```text
id
course_id
topic_id
type
difficulty
question_text
options
correct_answer
explanation
created_at
```

## 9. question_sources

```text
question_id
chunk_id
```

## 10. quiz_attempts

```text
id
user_id
course_id
score
total
started_at
completed_at
```

## 11. answers

```text
id
attempt_id
question_id
user_answer
is_correct
feedback
created_at
```

## 12. mastery

```text
id
user_id
course_id
topic_id
mastery_score
attempt_count
correct_count
updated_at
```

## 13. misconceptions

```text
id
user_id
course_id
topic_id
description
confidence
status
created_at
updated_at
```

## 14. chat_sessions

```text
id
user_id
course_id
created_at
```

## 15. chat_messages

```text
id
session_id
role
content
source_chunk_ids
created_at
```

## Security

- Row Level Security should restrict user-owned data.
- Never expose Supabase service-role credentials to the browser.
- API keys stay in environment variables.
- Validate uploaded file types and sizes.
- Sanitize extracted content before passing it into prompts.
