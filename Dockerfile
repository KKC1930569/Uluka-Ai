# Multi-stage production Dockerfile for ULUKA AI (Frontend + FastAPI Backend)
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM python:3.11-slim AS production
WORKDIR /app

# Environment configuration
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Install Python requirements
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and compiled frontend assets
COPY server/ ./server/
COPY --from=frontend-builder /app/dist ./dist

EXPOSE 8000

# Run FastAPI backend with Uvicorn (serves both API and Vite UI)
WORKDIR /app/server
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
