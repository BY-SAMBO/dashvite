@echo off
echo.
echo ================================================================
echo 🚀 Dashboard OpenWebUI Bancamia - Bootcamp de Innovacion
echo ================================================================
echo.

REM Verificar si Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no esta instalado. Por favor instalar Python 3.8 o superior.
    echo 📥 Descargar desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo.

REM Verificar si existe webui.db
if not exist "webui.db" (
    echo ❌ No se encontro el archivo webui.db
    echo 📋 Instrucciones:
    echo    1. Localiza el archivo webui.db de tu instalacion OpenWebUI
    echo    2. Copia el archivo a esta carpeta
    echo    3. Ejecuta este script nuevamente
    echo.
    pause
    exit /b 1
)

echo ✅ Base de datos encontrada
echo.

echo 📦 Instalando dependencias...
pip install -r requirements.txt

if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo ✅ Dependencias instaladas correctamente
echo.
echo 🌐 Iniciando dashboard...
echo    - Se abrira automaticamente en tu navegador
echo    - URL: http://localhost:8501
echo    - Presiona Ctrl+C para detener el servidor
echo.
echo ================================================================

streamlit run dashboard.py

pause