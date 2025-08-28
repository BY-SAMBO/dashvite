# 📊 Dashboard OpenWebUI Bancamía

Dashboard interactivo para análisis de uso de la plataforma OpenWebUI durante el Bootcamp de Innovación con IA de Bancamía.

## 🚀 Despliegue Rápido en Coolify

### 1. Configurar en GitHub
1. Crear nuevo repositorio privado
2. Subir archivos de esta carpeta
3. Copiar URL del repositorio

### 2. Desplegar en Coolify
1. **New Project** → **Git Repository**
2. **Repository URL:** `https://github.com/tu-usuario/dashboard-bancamia`
3. **Branch:** `main`
4. **Build Pack:** `Docker`

### 3. Variables de Entorno en Coolify
```bash
DASHBOARD_USER=bancamia_admin
DASHBOARD_PASSWORD=tu_password_seguro
```

### 4. ¡Listo!
- El dashboard estará disponible en la URL que genere Coolify
- Acceso con las credenciales configuradas

## 🔐 Credenciales por Defecto

**Usuario:** `bancamia_admin`  
**Contraseña:** `bootcamp2025!`

*Cambiar estas credenciales en las variables de entorno de Coolify*

## 📊 Características

### **Métricas Principales**
- Total usuarios Bancamía registrados
- Conversaciones y mensajes totales
- Tasa de productividad de uso
- Usuarios activos por período

### **Análisis de Calidad**
- **🔴 Triviales:** < 3 mensajes
- **🟡 Exploratorios:** 3-10 mensajes
- **🟢 Productivos:** 11-20 mensajes
- **💚 Extensivos:** > 20 mensajes

### **Filtros Interactivos**
- Por período de tiempo
- Por usuario específico
- Por rol (admin/user)
- Por calidad de conversación

### **Explorador de Chats**
- Ver contenido completo de conversaciones
- Preview de mensajes de usuarios
- Metadatos de creación y actualización

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales

# Ejecutar dashboard
streamlit run dashboard.py
```

## 📁 Estructura de Archivos

```
📁 dashboard-bancamia/
├── 🐍 dashboard.py         # Aplicación principal
├── 📊 webui.db            # Base de datos SQLite
├── 📋 requirements.txt    # Dependencias Python
├── 🐳 Dockerfile          # Configuración Docker
├── 🔧 .env.example        # Variables de entorno
├── 🚫 .gitignore          # Archivos a ignorar
└── 📖 README.md           # Este archivo
```

## 🔒 Seguridad

- ✅ Autenticación básica implementada
- ✅ Variables de entorno para credenciales
- ✅ Usuario no-root en contenedor Docker
- ✅ Base de datos de solo lectura
- ✅ Acceso restringido por login

## 📞 Soporte

Para problemas o preguntas:
1. Verificar variables de entorno en Coolify
2. Revisar logs del contenedor
3. Confirmar que la base de datos está incluida en el repositorio

---

**🎯 Desarrollado para el Bootcamp de Innovación con IA - Bancamía 2025**