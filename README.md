# Ceramicy-IO

## Getting Started

# Backend Development

For backend development, follow the steps below to set up a consistent environment for local development.

## Create a `.env` file

Copy the content of  `.env.example` and adjust the values as needed.
The `docker-compose` file will automatically load the environment variables from the file.
If you want to run the application without `Docker` you can use `direnv` or load the environment variables manually.

```shell
source .env
```

## Run the database and the application

All you need to do is run the following command:

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
```

## Points scoring system:

- base point value is the amount of code smells
- for every missing smell -> -1 point.
- for every 'extra'(not correct) smell -> -1 point.
- no negative points

## Required JSON format to add new quiz
```json
{
    "smell_types": ["Unnecessary Comment", "Logic Error", "Incorect Typing"],
    "files": [
        {
            "file_id": "path",
            "smells": [
                {"start": 5, "end": 5, "type": "Unnecessary Comment"},
                {"start": 3, "end": 9, "type": "Logic Error"}
            ]
        },
        {
            "file_id": "path2",
            "smells": [
                {"start": 1, "end": 3, "type": "Unnecessary Comment"},
                {"start": 8, "end": 10, "type": "Unnecessary Comment"}
            ]
        },
        {
            "file_id": "path3", 
            "smells": []
        }
    ]
}
```

## Definition of done

- At least one person must review before merging
- Depending on the priority of the task, the number of people involved in the review varies - no strict criteria.
- After each pull request, additional information to the rest of the team about its completion - if there is no review after a day, another message should be sent to the team.
- Pull requests must be tested
- Pull request needs to be merged

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
