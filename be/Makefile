dev:
	go run cmd/server/main.go

clean:
	rm -rf tmp
	go clean

tidy:
	go mod tidy

DOCKER_COMPOSE_DEV=docker-compose.yml
DOCKER_COMPOSE_PROD=docker-compose.prod.yml

docker-dev:
	docker-compose -f $(DOCKER_COMPOSE_DEV) up --build

docker-prod:
	docker-compose -f $(DOCKER_COMPOSE_PROD) up --build -d

docker-down:
	docker-compose down