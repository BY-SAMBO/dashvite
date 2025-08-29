# Dockerfile simplificado para debugging
FROM python:3.11-slim

WORKDIR /app

# Instalar solo lo esencial
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copiar requirements y instalar
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copiar archivos necesarios
COPY dashboard.py .
COPY webui.db .

# Variables de entorno básicas
ENV STREAMLIT_SERVER_PORT=8501
ENV STREAMLIT_SERVER_ADDRESS=0.0.0.0
ENV STREAMLIT_SERVER_HEADLESS=true

# Exponer puerto
EXPOSE 8501

# Comando directo sin usuario ni health check
CMD ["streamlit", "run", "dashboard.py", "--server.address=0.0.0.0", "--server.port=8501", "--server.headless=true"]