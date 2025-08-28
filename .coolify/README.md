# 🚀 Boilerplate Streamlit + Coolify

Este es un template base que funciona garantizado en Coolify.

## 📋 Configuración en Coolify

### Opción 1: Dockerfile (Recomendado)
1. **Build Pack:** Dockerfile
2. **Puerto:** 8501
3. **Variables de entorno:**
   ```
   DASHBOARD_USER=bancamia_admin
   DASHBOARD_PASSWORD=tu_password
   ```

### Opción 2: Docker Compose
1. **Build Pack:** Docker Compose
2. **Archivo:** docker-compose.yml
3. Las variables se configuran automáticamente

## 🔧 Archivos del Template

- `Dockerfile.official` - Basado en template oficial Streamlit
- `streamlit_app.py` - App base simplificada
- `docker-compose.yml` - Para deployment con compose
- `requirements.txt` - Solo dependencias esenciales

## 🎯 Una Vez que Funcione

1. Reemplazar `streamlit_app.py` con `dashboard.py`
2. Agregar `webui.db` y dependencias adicionales
3. Mantener la estructura base que funciona

## ✅ Características del Template

- ✅ Health check oficial de Streamlit
- ✅ Puerto 8501 estándar  
- ✅ Variables de entorno configurables
- ✅ Restart automático
- ✅ Template oficial Dockerfile
- ✅ Dependencias mínimas

¡Este template debe funcionar en Coolify sin problemas!