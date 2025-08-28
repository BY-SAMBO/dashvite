# Dockerfile para Dashboard OpenWebUI Bancamía
FROM python:3.11-slim

# Configurar directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivos de dependencias
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar aplicación y base de datos
COPY dashboard.py .
COPY webui.db .
COPY start.sh .
COPY .streamlit/ .streamlit/

# Variables de entorno por defecto
ENV STREAMLIT_SERVER_PORT=8501
ENV STREAMLIT_SERVER_ADDRESS=0.0.0.0
ENV STREAMLIT_SERVER_HEADLESS=true
ENV STREAMLIT_BROWSER_GATHER_USAGE_STATS=false
ENV STREAMLIT_SERVER_ENABLE_CORS=false
ENV STREAMLIT_SERVER_ENABLE_XSRF_PROTECTION=false

# Dar permisos de ejecución
RUN chmod +x start.sh

# Crear usuario no-root para seguridad
RUN useradd --create-home --shell /bin/bash bancamia
RUN chown -R bancamia:bancamia /app
USER bancamia

# Exponer puerto 8501
EXPOSE 8501

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8501/_stcore/health || exit 1

# Comando de inicio con script robusto
CMD ["./start.sh"]