# Dockerfile basado en template oficial de Streamlit + best practices Coolify
FROM python:3.11-slim

# Configurar working directory
WORKDIR /app

# Instalar dependencias del sistema (template oficial Streamlit)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements y instalar dependencias Python
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copiar aplicación base
COPY streamlit_app.py .
COPY .streamlit/ .streamlit/

# Exponer puerto estándar de Streamlit
EXPOSE 8501

# Health check oficial de Streamlit
HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

# Comando de inicio con configuración oficial
ENTRYPOINT ["streamlit", "run", "streamlit_app.py", "--server.port=8501", "--server.address=0.0.0.0"]