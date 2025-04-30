FROM python:3.11-slim

WORKDIR /app

COPY ../pyproject.toml .

RUN pip install --upgrade pip && \
    pip install uv

# Skopiuj kod źródłowy aplikacji
COPY ../src/ ./src/

# Ustaw katalog roboczy do uruchamiania
WORKDIR /app/src/who_ring_api

# Uruchom FastAPI z Uvicorn
CMD ["uv", "run","uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
