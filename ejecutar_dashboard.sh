#!/bin/bash

echo ""
echo "================================================================"
echo "🚀 Dashboard OpenWebUI Bancamía - Bootcamp de Innovación"
echo "================================================================"
echo ""

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 no está instalado. Por favor instalar Python 3.8 o superior."
    echo "📥 Instalar con: sudo apt install python3 python3-pip (Ubuntu/Debian)"
    echo "📥 Instalar con: brew install python3 (macOS)"
    exit 1
fi

echo "✅ Python encontrado: $(python3 --version)"
echo ""

# Verificar si existe webui.db
if [ ! -f "webui.db" ]; then
    echo "❌ No se encontró el archivo webui.db"
    echo "📋 Instrucciones:"
    echo "   1. Localiza el archivo webui.db de tu instalación OpenWebUI"
    echo "   2. Copia el archivo a esta carpeta"
    echo "   3. Ejecuta este script nuevamente"
    echo ""
    read -p "Presiona Enter para continuar..."
    exit 1
fi

echo "✅ Base de datos encontrada"
echo ""

echo "📦 Instalando dependencias..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    read -p "Presiona Enter para continuar..."
    exit 1
fi

echo ""
echo "✅ Dependencias instaladas correctamente"
echo ""
echo "🌐 Iniciando dashboard..."
echo "   - Se abrirá automáticamente en tu navegador"
echo "   - URL: http://localhost:8501"
echo "   - Presiona Ctrl+C para detener el servidor"
echo ""
echo "================================================================"

streamlit run dashboard.py