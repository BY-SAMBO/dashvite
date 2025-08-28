# 🚀 Guía de Despliegue en Coolify

## Proceso Paso a Paso

### **1. 📁 Preparar Repositorio en GitHub**

1. **Crear repositorio privado** en GitHub:
   - Nombre: `dashboard-bancamia` (o similar)
   - Visibilidad: **Private** (recomendado)

2. **Subir archivos** necesarios:
   ```
   📁 dashboard-bancamia/
   ├── dashboard.py
   ├── webui.db          # ⚠️ INCLUIR este archivo
   ├── requirements.txt
   ├── Dockerfile
   ├── .dockerignore
   ├── .env.example
   ├── .gitignore
   └── README.md
   ```

3. **Hacer commit y push:**
   ```bash
   git add .
   git commit -m "Dashboard inicial para Bancamía"
   git push origin main
   ```

---

### **2. 🛠️ Configurar en Coolify**

#### **Crear Nuevo Proyecto:**
1. Acceder a panel de Coolify
2. Click en **"New Project"**
3. Seleccionar **"Git Repository"**

#### **Configuración del Repositorio:**
```
Repository URL: https://github.com/TU-USUARIO/dashboard-bancamia
Branch: main
Build Pack: Docker
```

#### **Variables de Entorno:**
En la sección **Environment Variables**, agregar:

```bash
# Credenciales de acceso (REQUERIDAS)
DASHBOARD_USER=bancamia_admin
DASHBOARD_PASSWORD=TU_PASSWORD_SEGURO_AQUI

# Configuración Streamlit (opcional)
STREAMLIT_SERVER_PORT=8501
STREAMLIT_SERVER_ADDRESS=0.0.0.0
```

#### **Configuración de Red:**
```
Port: 8501
Protocol: HTTP
```

---

### **3. 🚀 Deploy y Verificación**

1. **Click en "Deploy"**
2. **Monitorear logs** para verificar build exitoso
3. **Acceder a URL generada** por Coolify
4. **Probar login** con credenciales configuradas

---

## 🔧 Configuración Avanzada

### **Custom Domain (opcional):**
```
Domain: dashboard-bancamia.tudominio.com
SSL: Auto (Let's Encrypt)
```

### **Health Check:**
```
Path: /
Port: 8501
Interval: 30s
```

### **Resource Limits:**
```
Memory: 512MB (mínimo recomendado)
CPU: 0.5 cores
```

---

## 🔒 Seguridad

### **Recomendaciones:**
1. **Cambiar credenciales por defecto**
2. **Usar repositorio privado**
3. **No exponer variables de entorno en logs**
4. **Configurar SSL/TLS automático**

### **Credenciales por Defecto:**
```
Usuario: bancamia_admin
Contraseña: bootcamp2025!
```

**⚠️ IMPORTANTE:** Cambiar estas credenciales en las variables de entorno de Coolify

---

## 📊 Monitoreo y Logs

### **Ver Logs en Coolify:**
1. Ir a proyecto desplegado
2. Tab **"Logs"**
3. Filtrar por **"Application"** para ver logs de Streamlit

### **Logs Típicos de Inicio Exitoso:**
```
2025-01-28 10:30:15 [INFO] Streamlit server starting...
2025-01-28 10:30:16 [INFO] Server listening on 0.0.0.0:8501
2025-01-28 10:30:17 [INFO] Dashboard Bancamía ready!
```

---

## 🔄 Actualizaciones

### **Actualizar Dashboard:**
1. **Modificar código** localmente
2. **Hacer commit y push** a GitHub
3. **Coolify detectará cambios** automáticamente
4. **Re-deploy automático** se ejecutará

### **Actualizar Base de Datos:**
1. **Reemplazar webui.db** en repositorio
2. **Commit y push** cambios
3. **Esperar re-deploy** automático

---

## ❗ Troubleshooting

### **Error: "No se encontró webui.db"**
- ✅ Verificar que webui.db esté en el repositorio
- ✅ Confirmar que no esté en .gitignore
- ✅ Check build logs para errores de copia

### **Error: "Port already in use"**
- ✅ Verificar configuración de puertos
- ✅ Usar puerto 8501 (por defecto de Streamlit)
- ✅ Check si hay otros servicios usando el puerto

### **Error de Autenticación**
- ✅ Verificar variables de entorno en Coolify
- ✅ Confirmar que DASHBOARD_USER y DASHBOARD_PASSWORD están configuradas
- ✅ Probar con credenciales por defecto

### **Build Fails**
- ✅ Verificar Dockerfile syntax
- ✅ Check requirements.txt dependencies
- ✅ Review build logs en Coolify

---

## 📈 Monitoreo de Uso

El dashboard incluye métricas automáticas:
- ✅ Número de usuarios únicos
- ✅ Sesiones activas
- ✅ Tiempo de uso promedio
- ✅ Páginas más visitadas

---

## 🎯 URLs Finales

Una vez desplegado tendrás:

```
🌐 URL Principal: https://tu-proyecto.coolify.host
🔐 Login: /
📊 Dashboard: / (después del login)
💡 Health: /healthz (automático)
```

**¡Tu dashboard estará listo para usar en minutos! 🎉**