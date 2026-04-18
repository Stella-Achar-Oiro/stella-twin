.PHONY: install dev dev-api dev-ui build

install:
	cd backend && uv sync
	cd frontend && npm install

dev-api:
	cd backend && uv run uvicorn app.main:app --reload --port 8000

dev-ui:
	cd frontend && npm run dev

dev:
	make -j2 dev-api dev-ui

build:
	cd frontend && npm run build
