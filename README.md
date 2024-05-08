# Ceramicy-IO

## Getting Started

To just run the backend app, the only command you have to execute is:
```shell
make build
```


## Database schema

```mermaid
erDiagram
    QUIZ {
        string id PK
        string name
        string author_id FK
        string main_language
        timestamp created_at
    }
    
    FILE {
        string id PK
        string name
        string quiz_d FK
        string solution
        string url
        int code_smells_count
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
        string user_id PK
        string quiz_id PK
        string session_id FK
        string solutions
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
        string user_id PK
        string session_id PK
        boolean is_finished 
        timestamp created_at
    }
    
    
    QUIZ ||--|{ FILE : "has"
    USER ||--o{ QUIZ : "creates"
    USER ||--o{ USER_QUIZ : "solves"
    QUIZ ||--o{ USER_QUIZ : "solved by"
    USER ||--o{ SESSION : "hosts"
%%    SESSION ||--o{ QUIZ : ""
    USER_QUIZ ||--o| SESSION : "part of"
    USER ||--o{ USER_SESSION : "participates"
    USER_SESSION ||--o{ SESSION : ""
    
    
```