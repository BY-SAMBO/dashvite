# 🔍 Debug Error 503 en Coolify - Guía Específica

## 1. Problemas Comunes de 503 en Coolify

### A. Configuración de Puerto Incorrecta
**Problema más común:** Coolify no sabe qué puerto usar

**Solución:**
1. En Coolify → Tu proyecto → **"Settings"**
2. Buscar **"Port"** o **"Exposed Port"**
3. Asegurar que está configurado: **8501**
4. Verificar **"Protocol"**: HTTP (no HTTPS internamente)

### B. Contenedor No Inicia Correctamente
**Síntoma:** Contenedor se crea pero no responde

**Debug en Coolify:**
1. Ir a **"Deployments"** → Último deployment
2. Click en **"Application Logs"**
3. Buscar errores de Python/Streamlit

### C. Health Check Fallando
**Síntoma:** Coolify mata el contenedor porque no pasa health checks

**Solución temporal:**
1. En Settings → **"Health Check"** 
2. Deshabilitar o cambiar endpoint a `/health`

## 2. Test con Contenedor Básico

He creado un Dockerfile.test que corre Flask simple:
- Puerto 8501 ✅
- Endpoint `/` con mensaje básico ✅  
- Endpoint `/health` para health checks ✅
- Sin dependencias complejas ✅

**Si este test funciona:** El problema es Streamlit/dashboard
**Si este test falla:** El problema es configuración Coolify

## 3. Configuración Específica para Coolify

### Variables de Entorno Requeridas:
```
PORT=8501                    # Puerto interno
DASHBOARD_USER=bancamia_admin
DASHBOARD_PASSWORD=bootcamp2025!
```

### Configuración de Red en Coolify:
- **Internal Port:** 8501
- **External Port:** 80 (HTTP) o 443 (HTTPS)
- **Protocol:** HTTP
- **Health Check Path:** `/health` o deshabilitar

### Build Settings:
- **Build Pack:** Docker (no Nixpacks)
- **Dockerfile:** Dockerfile (default)
- **Build Context:** . (root directory)

## 4. Pasos de Diagnóstico en Orden

### Paso 1: Verificar Container Status
En Coolify Dashboard:
1. ¿El contenedor está "Running"?
2. ¿Muestra color verde?
3. ¿Hay restarts constantes?

### Paso 2: Ver Application Logs
Buscar estos errores típicos:
```
❌ "Address already in use"      → Puerto mal configurado
❌ "Permission denied"           → Problema de permisos
❌ "No module named 'streamlit'" → Build falló
❌ "Database locked"             → SQLite en modo solo lectura
```

### Paso 3: Test Manual del Puerto
Si tienes acceso SSH al servidor Coolify:
```bash
# Ver si el puerto está abierto
docker ps | grep kkogs
docker port CONTAINER_ID
curl -I http://localhost:MAPPED_PORT
```

### Paso 4: Verificar Proxy Config
En algunos casos, el problema es el proxy reverso de Coolify:
- ¿La URL está configurada correctamente?
- ¿Hay conflicto de SSL/TLS?
- ¿El dominio resuelve al servidor correcto?

## 5. Soluciones por Orden de Probabilidad

### 1. Puerto mal configurado (80% casos)
**Fix:** Configurar port 8501 en Coolify Settings

### 2. Health check fallando (15% casos)  
**Fix:** Deshabilitar health check temporalmente

### 3. Variables de entorno faltantes (3% casos)
**Fix:** Agregar DASHBOARD_USER y DASHBOARD_PASSWORD

### 4. Problema de proxy/dominio (2% casos)
**Fix:** Verificar configuración DNS y SSL

## 6. Test Actual con Flask

El Dockerfile.test actual debería mostrar:
```
🚀 Test Coolify OK!
Puerto 8501 funcionando
```

**Si ves esto:** Coolify funciona, el problema era Streamlit
**Si sigue 503:** El problema es configuración de Coolify (puerto/proxy)

## 7. Comandos Útiles en Coolify SSH

```bash
# Ver contenedores del proyecto
docker ps --filter "name=kkogs44ckkc00ow4swo0s8cg"

# Ver logs en tiempo real
docker logs -f CONTAINER_NAME

# Test conectividad interna
docker exec CONTAINER_NAME curl http://localhost:8501

# Ver configuración de red
docker inspect CONTAINER_NAME | grep -i port
```