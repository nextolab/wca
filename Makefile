.PHONY: init run

init:
	@read -p "Enter walletconnect projectId: " project_id; echo "WC_PROJECT_ID=$$project_id" > .env
	@echo ".env file was created"
	docker-compose up -d --build
	docker-compose exec app npm ci
	docker-compose down

run:
	docker-compose up -d
	docker-compose exec app node app.js
