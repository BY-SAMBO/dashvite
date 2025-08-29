# 📊 Dashboard OpenWebUI Bancamía - Guía Rápida

## 🚀 Inicio Rápido (3 pasos)

### 1. **📥 Preparar Archivos**
- Descargar toda la carpeta del dashboard
- Copiar `webui.db` de OpenWebUI a esta carpeta

### 2. **▶️ Ejecutar Dashboard**
- **Windows:** Doble click en `ejecutar_dashboard.bat`
- **Mac/Linux:** Doble click en `ejecutar_dashboard.sh`
- Esperar a que se instalen las dependencias

### 3. **🌐 Acceder al Dashboard**
- Se abre automáticamente en el navegador
- URL: http://localhost:8501
- ¡Listo para analizar!

---

## 📋 ¿Qué hace este Dashboard?

### **📊 Métricas Principales:**
- Total usuarios Bancamía registrados
- Número de conversaciones creadas
- Mensajes intercambiados
- Tasa de productividad general

### **🎯 Clasificación de Chats:**
- **🔴 Triviales:** Menos de 3 mensajes
- **🟡 Exploratorios:** Entre 3-10 mensajes
- **🟢 Productivos:** Entre 11-20 mensajes
- **💚 Extensivos:** Más de 20 mensajes

### **👥 Análisis de Usuarios:**
- Ranking por productividad
- Top usuarios más activos
- Distribución por roles
- Última actividad

### **💬 Explorador de Chats:**
- Ver conversaciones individuales
- Filtrar por usuario/calidad
- Preview del contenido
- Fechas de creación/actualización

---

## 🔍 Cómo Usar los Filtros

### **📅 Filtros de Tiempo:**
- Último mes
- Últimos 7 días
- Todo el tiempo
- Período personalizado

### **👤 Filtros de Usuario:**
- Seleccionar usuarios específicos
- Filtrar por rol (admin/user)
- Ver solo empleados Bancamía

### **💬 Filtros de Chat:**
- Por calidad (trivial/productivo/etc.)
- Por usuario específico
- Combinaciones múltiples

---

## ❓ Solución de Problemas

### **🚫 Error: "No se encontró webui.db"**
**Solución:**
1. Localizar archivo `webui.db` en servidor OpenWebUI
2. Copiarlo a la carpeta del dashboard
3. Ejecutar nuevamente

### **🚫 Error: "Puerto ocupado"**
**Solución:**
```bash
streamlit run dashboard.py --server.port 8502
```

### **🚫 Error: "Python no encontrado"**
**Solución:**
- Windows: Descargar de python.org
- Mac: `brew install python3`
- Linux: `sudo apt install python3`

---

## 📞 Contacto y Soporte

**Para actualizaciones de datos:**
- Reemplazar `webui.db` cuando sea necesario
- El dashboard se actualiza automáticamente

**Para problemas técnicos:**
- Verificar que Python esté instalado
- Ejecutar terminal como administrador
- Revisar que el archivo webui.db esté presente

---

## 🎯 Casos de Uso Principales

### **📈 Reportes Ejecutivos:**
- Métricas de adopción
- ROI de la plataforma IA
- Identificación de usuarios champions

### **🎓 Gestión de Entrenamiento:**
- Usuarios que necesitan capacitación
- Identificar mejores prácticas
- Patrones de uso exitosos

### **📊 Análisis de Contenido:**
- Calidad de las interacciones
- Temas más consultados
- Efectividad de los modelos IA

**¡El dashboard está diseñado para ser autosuficiente y fácil de usar! 🎉**