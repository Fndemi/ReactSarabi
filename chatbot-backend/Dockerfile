# Use Python 3.13.5 slim image for a small, secure base
FROM python:3.13.5-slim

# Set working directory
WORKDIR /app

# Install minimal system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src/ ./src/
COPY prompts/ ./prompts/

# Create directory for ChromaDB persistence
RUN mkdir -p /app/src/chroma_langchain_db

# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONPATH=/app/src:/app
ENV PYTHONUNBUFFERED=1

# Run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
