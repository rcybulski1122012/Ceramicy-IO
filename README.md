# Ceramicy-IO

## Getting Started

# Backend Development
To just run the backend app, the only command you have to execute is:
```shell
make build
```

# Frontend Development

For frontend development, follow the steps below to set up a consistent environment for local development.

## Setup Environment

#### To build the container image and replace/add `node_modules` installed from within the container, run:

```shell
make build
```

#### Start Local Server
```shell
make up
```

#### Interactive Shell Session
```shell
make shell
```

#### Tests, linter, type-checking and formatter:
```shell
make task

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
        double score
        timestamp created_at
    }
    
    
    SESSION {
        string id PK
        string host_id FK
        string quiz_id FK
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
