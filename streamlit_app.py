# Streamlit app simplificado basado en template oficial
import streamlit as st

st.set_page_config(
    page_title="Dashboard Bancamía - Test",
    page_icon="🚀",
    layout="wide"
)

# CSS básico
st.markdown("""
<style>
    .main {
        padding: 2rem;
    }
    .success-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        margin: 2rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Header principal
st.markdown("""
<div class="success-box">
    <h1>🚀 Dashboard Bancamía</h1>
    <h3>Template Funcionando en Coolify!</h3>
    <p>Bootcamp de Innovación con IA</p>
</div>
""", unsafe_allow_html=True)

# Información del sistema
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Status", "✅ Online")
    
with col2:
    st.metric("Template", "🐳 Docker")
    
with col3:
    st.metric("Platform", "⚡ Coolify")

# Test básico
st.markdown("## 🔧 Test de Funcionalidades")

# Test 1: Input básico
name = st.text_input("Nombre:", placeholder="Ingresa tu nombre")
if name:
    st.success(f"¡Hola {name}! El dashboard está funcionando correctamente.")

# Test 2: Gráfico simple
if st.button("🎯 Probar Gráfico"):
    import plotly.graph_objects as go
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=[1, 2, 3, 4],
        y=[10, 11, 12, 13],
        mode='lines+markers',
        name='Test Data'
    ))
    
    fig.update_layout(
        title="📊 Gráfico de Prueba",
        xaxis_title="X Axis",
        yaxis_title="Y Axis"
    )
    
    st.plotly_chart(fig, use_container_width=True)

# Test 3: Información de environment
st.markdown("## 🔍 Variables de Entorno")
import os

dashboard_user = os.getenv('DASHBOARD_USER', 'No configurado')
st.info(f"Usuario Dashboard: {dashboard_user}")

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <p>🎯 Template base para Dashboard Bancamía</p>
    <p>Una vez que este funcione, podemos integrar la funcionalidad completa</p>
</div>
""", unsafe_allow_html=True)