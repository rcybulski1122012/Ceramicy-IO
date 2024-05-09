# Ceramicy-IO

## Getting Started

To just run the backend app, the only command you have to execute is:
```shell
make build
```

## Definition of done

- Przed zmergowaniem co najmniej jedna osoba musi ocenić
- W zależności od priorytetu zadania zmienna ilość osób uczestniczących w ocenie - brak ścisłych kryteriów.
- Po każdym pull requeście dodatkowa informacja o jego wykonaniu - w razie braku oceny po upływie dnia, ponowna wiadomość do zespołu.
- Pull request musi przechodzić testy
- Pull request musi być zmergowany

## Database schema

```mermaid
erDiagram
    QUIZ {
        string id PK
        string name
        string author_id FK
        string main_language
        array file_urls
        string code_smells
        timestamp created_at
    }
    
    USER {
        string id PK
        string name
        string email UK
        string password
        string role
        timestamp created_at
    }
    
    USER_QUIZ {
        string id PK
        string user_id FK
        string quiz_id FK
        string session_id FK
        string solution
        string score
        timestamp created_at
    }
    
    
    SESSION {
        string id PK
        string host_id FK
        string quiz_id FK
        string invite_link
        timestamp created_at
    }
    
    USER_SESSION {
        string user_name PK
        string session_id PK
        string solution
        timestamp created_at
    }
    
    
    USER ||--o{ QUIZ : "creates"
    USER ||--o{ USER_QUIZ : "solves"
    QUIZ ||--o{ USER_QUIZ : "solved by"
    USER ||--o{ SESSION : "hosts"
%%    SESSION ||--o{ QUIZ : ""
    USER_QUIZ ||--o| SESSION : "part of"
    USER_SESSION ||--o{ SESSION : ""
    
    
```
