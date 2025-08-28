# Dockerfile para Dashboard OpenWebUI Bancamía
FROM python:3.11-slim

# Configurar directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivos de dependencias
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar aplicación y base de datos
COPY dashboard.py .
COPY webui.db .

# Crear usuario no-root para seguridad
RUN useradd --create-home --shell /bin/bash bancamia
RUN chown -R bancamia:bancamia /app
USER bancamia

# Exponer puerto 8501
EXPOSE 8501

# Variables de entorno por defecto
ENV STREAMLIT_SERVER_PORT=8501
ENV STREAMLIT_SERVER_ADDRESS=0.0.0.0
ENV STREAMLIT_SERVER_HEADLESS=true
ENV STREAMLIT_BROWSER_GATHER_USAGE_STATS=false

# Comando de inicio
CMD ["streamlit", "run", "dashboard.py", "--server.address", "0.0.0.0", "--server.port", "8501"]