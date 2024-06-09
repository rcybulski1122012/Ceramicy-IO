.PHONY: help
help: ## Show this help (usage: make help)
	@echo "Usage: make [target]"
	@echo "Targets:"
	@awk '/^[a-zA-Z0-9_-]+:.*?##/ { \
		helpMessage = match($$0, /## (.*)/); \
		if (helpMessage) { \
			target = $$1; \
			sub(/:/, "", target); \
			printf "  \033[36m%-20s\033[0m %s\n", target, substr($$0, RSTART + 3, RLENGTH); \
		} \
	}' $(MAKEFILE_LIST)


.PHONY: build
build:	## Build project with docker-compose and generate node_modeules module for local development
	make down
	rm -r node_modules
	docker-compose run --rm code_smell_app npm ci --build

.PHONY: up
up:	## Run project with docker-compose up - start local server
	docker-compose up

.PHONY: task
task:	## Run project with docker-compose up - start local server
	docker-compose exec code_smell_app npm run task

.PHONY: shell
shell:	## Run project with docker-compose up - start local server
	docker-compose exec code_smell_app sh

.PHONY: down
down: ## Stop project with docker-compose and remove containers and networks
	docker-compose down --remove-orphans | true


.PHONY: build-linux
build-linux:	## Build project with docker compose and generate node_modeules module for local development
	make down-linux
	rm -rf node_modules
	docker compose run --rm code_smell_app npm ci --build

.PHONY: up-linux
up-linux:	## Run project with docker compose up - start local server
	docker compose up

.PHONY: task-linux
task-linux:	## Run project with docker compose up - start local server
	docker compose exec code_smell_app npm run task

.PHONY: shell-linux
shell-linux:	## Run project with docker compose up - start local server
	docker compose exec code_smell_app sh

.PHONY: down-linux
down-linux: ## Stop project with docker compose and remove containers and networks
	docker compose down --remove-orphans | true