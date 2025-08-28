# 🚀 Dashboard OpenWebUI Bancamía - Guía de Despliegue

## 📋 Estrategias de Publicación

### **Opción 1: Despliegue Local Simple (RECOMENDADO)**
*Ideal para reportes internos y presentaciones*

#### Preparación:
1. **Descargar archivos del dashboard:**
   - `dashboard.py` - Aplicación principal
   - `requirements.txt` - Dependencias
   - `webui.db` - Base de datos (copiar desde OpenWebUI)

2. **Instalar Python y dependencias:**
   ```bash
   # Instalar Python 3.8 o superior
   pip install -r requirements.txt
   ```

3. **Copiar base de datos:**
   ```bash
   # Copiar webui.db al mismo directorio que dashboard.py
   cp /ruta/hacia/webui.db ./webui.db
   ```

4. **Ejecutar dashboard:**
   ```bash
   streamlit run dashboard.py
   ```

5. **Acceder al dashboard:**
   - Se abrirá automáticamente en: `http://localhost:8501`
   - Compartir URL en red local: `http://[IP-DE-TU-PC]:8501`

---

### **Opción 2: Streamlit Cloud (GRATIS)**
*Para acceso remoto y colaboración*

#### Pasos:
1. **Subir a GitHub:**
   - Crear repositorio privado en GitHub
   - Subir archivos: `dashboard.py`, `requirements.txt`, `webui.db`

2. **Desplegar en Streamlit Cloud:**
   - Ir a [share.streamlit.io](https://share.streamlit.io)
   - Conectar con GitHub
   - Seleccionar repositorio
   - Deploy automático

3. **Obtener URL pública:**
   - Streamlit generará URL tipo: `https://usuario-dashboard-bancamia-xyz.streamlit.app`

---

### **Opción 3: Servidor Interno Bancamía**
*Para uso corporativo permanente*

#### Requerimientos del servidor:
- **OS:** Linux/Windows Server
- **Python:** 3.8+
- **RAM:** 2GB mínimo
- **Storage:** 1GB
- **Puertos:** 8501 (configurable)

#### Instalación:
```bash
# En servidor Bancamía
git clone [repositorio-interno]
cd dashboard-bancamia
pip install -r requirements.txt

# Configurar como servicio
sudo systemctl create dashboard-bancamia.service
sudo systemctl enable dashboard-bancamia
sudo systemctl start dashboard-bancamia
```

---

## 📦 Kit de Distribución

### **Para el Usuario Final (Responsable del Reporte):**

#### **📁 Carpeta "Dashboard-Bancamia":**
```
📁 Dashboard-Bancamia/
├── 🐍 dashboard.py
├── 📋 requirements.txt  
├── 📊 webui.db (copiar desde OpenWebUI)
├── 📖 INSTRUCCIONES_RAPIDAS.md
├── 🚀 ejecutar_dashboard.bat (Windows)
└── 🚀 ejecutar_dashboard.sh (Mac/Linux)
```

#### **📄 Scripts de Ejecución Automática:**

**ejecutar_dashboard.bat (Windows):**
```batch
@echo off
echo 🚀 Iniciando Dashboard Bancamia...
pip install -r requirements.txt
streamlit run dashboard.py
pause
```

**ejecutar_dashboard.sh (Mac/Linux):**
```bash
#!/bin/bash
echo "🚀 Iniciando Dashboard Bancamía..."
pip3 install -r requirements.txt
streamlit run dashboard.py
```

---

## 📖 Instrucciones Rápidas para el Usuario

### **Pasos Simples:**

1. **📥 Descargar carpeta "Dashboard-Bancamia"**

2. **📊 Copiar base de datos:**
   - Ubicar archivo `webui.db` de OpenWebUI
   - Copiarlo a la carpeta del dashboard

3. **▶️ Ejecutar:**
   - **Windows:** Doble click en `ejecutar_dashboard.bat`
   - **Mac/Linux:** Doble click en `ejecutar_dashboard.sh`

4. **🌐 Acceder:**
   - Se abrirá navegador automáticamente
   - URL: `http://localhost:8501`

5. **🔄 Actualizar datos:**
   - Copiar nueva versión de `webui.db` cuando sea necesario
   - Streamlit detecta cambios automáticamente

---

## 🔧 Configuración Avanzada

### **Variables de Entorno:**
```bash
# Puerto personalizado
export STREAMLIT_SERVER_PORT=8502

# Configurar para acceso externo
export STREAMLIT_SERVER_ADDRESS=0.0.0.0
```

### **Personalización:**
- **Logo:** Agregar logo Bancamía en línea 15 del dashboard.py
- **Colores:** Modificar CSS en línea 13-50
- **Métricas:** Agregar nuevas métricas en función `main()`

---

## 🔐 Consideraciones de Seguridad

### **Para Datos Sensibles:**
1. **No subir webui.db a repositorios públicos**
2. **Usar repositorios privados en GitHub**
3. **Configurar autenticación si es necesario**
4. **Limitar acceso por IP si se despliega en servidor**

### **Autenticación Opcional:**
```python
# Agregar al inicio del dashboard.py
import streamlit_authenticator as stauth

# Configurar usuarios autorizados
names = ['Admin Bancamía']
usernames = ['admin']
passwords = ['password_seguro']
```

---

## 📞 Soporte y Actualizaciones

### **Actualizaciones de Datos:**
- **Automática:** Configurar tarea programada para copiar webui.db
- **Manual:** Reemplazar webui.db cuando sea necesario
- **Tiempo real:** Cache de 5 minutos (configurable)

### **Resolución de Problemas:**
- **Puerto ocupado:** Cambiar puerto con `streamlit run dashboard.py --server.port 8502`
- **Dependencias:** Reinstalar con `pip install -r requirements.txt --upgrade`
- **Permisos:** Ejecutar terminal como administrador

---

## 📈 Métricas de Uso del Dashboard

El dashboard incluye:
- ✅ **Filtros dinámicos** (usuario, fecha, rol)
- ✅ **Visualizaciones interactivas** (gráficos clickeables)
- ✅ **Explorador de chats** (ver contenido completo)
- ✅ **Exportación de datos** (CSV/Excel)
- ✅ **Actualizaciones en tiempo real**
- ✅ **Responsive design** (móvil/tablet/desktop)

**¡El dashboard está listo para usar! 🎉**