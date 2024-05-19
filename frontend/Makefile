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

.PHONY: linux-build
linux-build:
	make linux-down
	rm -r node_modules
	sudo docker compose run --rm code_smell_app npm ci --build
 
.PHONY: linux-up
linux-up:
	sudo docker compose up

.PHONY: linux-task
linux-task:
	sudo docker compose exec code_smell_app npm run task

.PHONY: linux-shell	
linux-shell:
	sudo docker compose exec code_smell_app sh

.PHONY: linux-down
linux-down:
	sudo docker compose down --remove-orphans | true

