# 🔍 Debug del Error 503 - Pasos de Diagnóstico

## 1. Verificar Estado del Contenedor en Coolify

### En el panel de Coolify:
1. Ir a tu proyecto dashboard
2. Click en "Logs" 
3. Seleccionar "Application Logs"
4. Buscar errores en el startup

### Comandos útiles desde Coolify SSH:
```bash
# Ver contenedores activos
docker ps | grep kkogs44ckkc00ow4swo0s8cg

# Ver logs del contenedor
docker logs kkogs44ckkc00ow4swo0s8cg-195705374545 --tail 50

# Verificar si el puerto está escuchando
docker exec kkogs44ckkc00ow4swo0s8cg-195705374545 netstat -tulpn | grep 8501

# Test de conectividad interno
docker exec kkogs44ckkc00ow4swo0s8cg-195705374545 curl -I http://localhost:8501

# Ver procesos en el contenedor
docker exec kkogs44ckkc00ow4swo0s8cg-195705374545 ps aux
```

## 2. Posibles Causas del 503

### Causa 1: Streamlit no inició correctamente
- **Síntoma:** Logs muestran error en start.sh
- **Solución:** Revisar database path y permisos

### Causa 2: Puerto incorrecto
- **Síntoma:** Coolify mapea puerto diferente
- **Solución:** Verificar configuración de puerto en Coolify

### Causa 3: Health check fallando
- **Síntoma:** Contenedor se reinicia constantemente
- **Solución:** Revisar endpoint `/_stcore/health`

### Causa 4: Variables de entorno faltantes
- **Síntoma:** App crash al validar credenciales
- **Solución:** Configurar DASHBOARD_USER y DASHBOARD_PASSWORD

## 3. Fixes Rápidos a Probar

### Fix 1: Verificar configuración de puerto en Coolify
- Puerto interno: 8501
- Puerto externo: 80 o 443 (HTTPS)

### Fix 2: Revisar variables de entorno
```bash
DASHBOARD_USER=bancamia_admin
DASHBOARD_PASSWORD=bootcamp2025!
```

### Fix 3: Health check simplificado
Si el health check causa problemas, temporalmente deshabilitar.

## 4. Información Necesaria para Debug

Por favor proporciona:
1. **Logs del contenedor** (desde Coolify)
2. **Configuración de puerto** en Coolify
3. **Variables de entorno** configuradas
4. **Error específico** en browser developer tools (F12)

## 5. Plan de Acción

### Paso 1: Obtener logs
```bash
docker logs kkogs44ckkc00ow4swo0s8cg-195705374545
```

### Paso 2: Verificar puerto
```bash
docker port kkogs44ckkc00ow4swo0s8cg-195705374545
```

### Paso 3: Test interno
```bash
docker exec kkogs44ckkc00ow4swo0s8cg-195705374545 curl http://localhost:8501
```

### Paso 4: Si nada funciona - Simplificar
Crear versión minimal sin health check ni script complejo.