Grading schema for non-deterministic answers.

                    ┌──────────────┐
                    │   Student    │
                    │  submission  │
                    └──────┬───────┘
                           │
                 ┌─────────┼─────────┐
                 │         │         │
              text      image      audio
                 │         │         │
                 │      vision/OCR   │
                 │         │       speech
                 │         │         │
                 └─────────┼─────────┘
                           ▼
                       normalized
                         answer
                           │
                           ▼
                     ┌───────────┐
                     │ Grading   │
                     │  router   │
                     └─────┬─────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Exact         Math           LLM
           grading       engine        grading
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                     rubric scores
                           │
                           ▼
                  ┌─────────────────┐
                  │ Final score +   │
                  │ feedback +      │
                  │ confidence      │
                  └─────────────────┘
