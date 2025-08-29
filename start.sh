#!/bin/bash

echo "🚀 Iniciando Dashboard Bancamía..."
echo "📅 $(date)"
echo "🐍 Python version: $(python --version)"
echo "📦 Streamlit version: $(streamlit --version)"

# Verificar que la base de datos existe
if [ ! -f "webui.db" ]; then
    echo "❌ ERROR: webui.db no encontrada"
    exit 1
fi

echo "✅ Base de datos encontrada: $(ls -lh webui.db)"

# Verificar configuración
echo "🔧 Configuración:"
echo "   Puerto: ${STREAMLIT_SERVER_PORT:-8501}"
echo "   Address: ${STREAMLIT_SERVER_ADDRESS:-0.0.0.0}"
echo "   Usuario: ${DASHBOARD_USER:-bancamia_admin}"

# Verificar conectividad de la base de datos
python3 -c "
import sqlite3
try:
    conn = sqlite3.connect('webui.db')
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM user')
    users = cursor.fetchone()[0]
    print(f'✅ DB verificada: {users} usuarios')
    conn.close()
except Exception as e:
    print(f'❌ Error DB: {e}')
    exit(1)
"

if [ $? -ne 0 ]; then
    echo "❌ Fallo verificación de base de datos"
    exit 1
fi

echo "🌐 Iniciando Streamlit..."
exec streamlit run dashboard.py \
    --server.address="0.0.0.0" \
    --server.port=8501 \
    --server.headless=true \
    --logger.level=info \
    --server.enableCORS=false \
    --server.enableXsrfProtection=false