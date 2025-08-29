import streamlit as st
import sqlite3
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import json
from datetime import datetime, timedelta
from collections import Counter
import os
import hashlib

# Configuración de la página
st.set_page_config(
    page_title="Dashboard OpenWebUI - Bancamía",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Configuración de autenticación
def check_password():
    """Returns `True` if the user had the correct password."""
    
    def password_entered():
        """Checks whether a password entered by the user is correct."""
        username = st.session_state["username"]
        password = st.session_state["password"]
        
        # Obtener credenciales de variables de entorno
        valid_username = os.getenv("DASHBOARD_USER", "bancamia_admin")
        valid_password = os.getenv("DASHBOARD_PASSWORD", "bootcamp2025!")
        
        if username == valid_username and password == valid_password:
            st.session_state["password_correct"] = True
            del st.session_state["password"]  # No guardar password en sesión
            del st.session_state["username"]
        else:
            st.session_state["password_correct"] = False

    if "password_correct" not in st.session_state:
        # Primera vez, mostrar inputs
        st.markdown("""
        <div style="display: flex; justify-content: center; align-items: center; height: 60vh;">
            <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); text-align: center; min-width: 400px;">
                <h1 style="color: #667eea; margin-bottom: 30px;">🔐 Dashboard Bancamía</h1>
                <p style="color: #666; margin-bottom: 30px;">Ingrese sus credenciales para acceder</p>
        """, unsafe_allow_html=True)
        
        st.text_input("👤 Usuario", key="username", placeholder="Ingrese su usuario")
        st.text_input("🔑 Contraseña", type="password", key="password", placeholder="Ingrese su contraseña")
        st.button("🚀 Iniciar Sesión", on_click=password_entered)
        
        st.markdown("</div></div>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: white; padding: 10px 20px; border-radius: 20px; font-size: 12px;">
            🔒 Acceso restringido - Bootcamp de Innovación Bancamía
        </div>
        """, unsafe_allow_html=True)
        
        return False
    elif not st.session_state["password_correct"]:
        # Credenciales incorrectas
        st.markdown("""
        <div style="display: flex; justify-content: center; align-items: center; height: 60vh;">
            <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); text-align: center; min-width: 400px;">
                <h1 style="color: #667eea; margin-bottom: 30px;">🔐 Dashboard Bancamía</h1>
                <p style="color: #666; margin-bottom: 20px;">Ingrese sus credenciales para acceder</p>
                <div style="background: #fee; border: 1px solid #fcc; padding: 10px; border-radius: 5px; margin-bottom: 20px; color: #c33;">
                    ❌ Usuario o contraseña incorrectos
                </div>
        """, unsafe_allow_html=True)
        
        st.text_input("👤 Usuario", key="username", placeholder="Ingrese su usuario")
        st.text_input("🔑 Contraseña", type="password", key="password", placeholder="Ingrese su contraseña")
        st.button("🚀 Reintentar", on_click=password_entered)
        
        st.markdown("</div></div>", unsafe_allow_html=True)
        return False
    else:
        # Credenciales correctas
        return True

# CSS personalizado
st.markdown("""
<style>
    .main > div {
        padding: 2rem 1rem;
    }
    
    .metric-card {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .chat-preview {
        background: #f8f9fa;
        border-left: 4px solid #007bff;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
    }
    
    .quality-high { color: #28a745; font-weight: bold; }
    .quality-medium { color: #ffc107; font-weight: bold; }
    .quality-low { color: #dc3545; font-weight: bold; }
    
    .sidebar .stSelectbox > div > div {
        background-color: #f0f2f6;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_data(ttl=300)  # Cache por 5 minutos
def load_data():
    """Cargar datos de la base de datos SQLite"""
    db_path = "webui.db"
    
    # Verificar si existe el archivo de base de datos
    if not os.path.exists(db_path):
        st.error("❌ No se encontró la base de datos 'webui.db' en el directorio actual")
        st.info("📁 Asegúrate de que el archivo webui.db esté en la misma carpeta que este dashboard")
        st.stop()
    
    try:
        conn = sqlite3.connect(db_path)
        
        # Cargar usuarios (solo Bancamía) - consulta simplificada
        users_df = pd.read_sql("""
            SELECT id, name, email, role, created_at, updated_at, last_active_at
            FROM user 
            WHERE email LIKE '%bancamia.com.co%'
        """, conn)
        
        # Cargar chats de usuarios Bancamía - consulta simplificada
        chats_df = pd.read_sql("""
            SELECT c.id, c.title, c.chat, c.user_id,
                   u.name as user_name, u.email, u.role as user_role,
                   c.created_at, c.updated_at
            FROM chat c
            JOIN user u ON c.user_id = u.id
            WHERE u.email LIKE '%bancamia.com.co%'
            ORDER BY c.updated_at DESC
        """, conn)
        
        conn.close()
        return users_df, chats_df
        
    except Exception as e:
        st.error(f"❌ Error al cargar los datos: {str(e)}")
        st.write(f"Debug info: {e}")
        # No parar la app, mostrar datos vacíos
        return pd.DataFrame(), pd.DataFrame()

def analyze_chat_quality(chat_json):
    """Analizar la calidad de un chat basado en su contenido"""
    if not chat_json:
        return 'trivial', 0, []
    
    try:
        chat_data = json.loads(chat_json)
        messages = chat_data.get('messages', [])
        num_messages = len(messages)
        
        # Extraer mensajes del usuario
        user_messages = [msg.get('content', '') for msg in messages if msg.get('role') == 'user']
        
        # Determinar calidad
        if num_messages <= 2:
            category = 'trivial'
        elif num_messages <= 4:
            # Revisar si son solo saludos
            first_messages = ' '.join(user_messages[:2]).lower()
            trivial_patterns = ['hola', 'hi', 'hello', 'test', 'prueba', 'buenos dias', 'buenas tardes']
            if any(pattern in first_messages for pattern in trivial_patterns) and len(first_messages) < 50:
                category = 'trivial'
            else:
                category = 'exploratory'
        elif num_messages <= 20:
            category = 'productive'
        else:
            category = 'extensive'
            
        return category, num_messages, user_messages
        
    except:
        return 'trivial', 0, []

def get_quality_color(category):
    """Obtener color según la calidad del chat"""
    colors = {
        'trivial': '#dc3545',
        'exploratory': '#ffc107', 
        'productive': '#28a745',
        'extensive': '#17a2b8'
    }
    return colors.get(category, '#6c757d')

def main():
    # Verificar autenticación
    if not check_password():
        return
    
    # Título principal
    st.markdown("""
    # 📊 Dashboard OpenWebUI - Bootcamp Bancamía
    ### Análisis interactivo de uso de la plataforma IA
    """)
    
    # Cargar datos
    with st.spinner('Cargando datos de la base de datos...'):
        users_df, chats_df = load_data()
    
    # Sidebar con filtros
    st.sidebar.markdown("## 🔍 Filtros")
    
    # Filtro de fecha
    date_range = st.sidebar.selectbox(
        "Período de análisis",
        ["Último mes", "Últimos 7 días", "Todo el tiempo", "Personalizado"]
    )
    
    if date_range == "Personalizado":
        start_date = st.sidebar.date_input("Fecha inicio")
        end_date = st.sidebar.date_input("Fecha fin")
    
    # Filtro de usuario
    selected_users = st.sidebar.multiselect(
        "Seleccionar usuarios",
        options=users_df['name'].tolist(),
        default=users_df['name'].tolist()
    )
    
    # Filtro de rol
    selected_roles = st.sidebar.multiselect(
        "Filtrar por rol",
        options=users_df['user_role'].unique().tolist(),
        default=users_df['user_role'].unique().tolist()
    )
    
    # Aplicar filtros
    filtered_users = users_df[
        (users_df['name'].isin(selected_users)) & 
        (users_df['user_role'].isin(selected_roles))
    ]
    
    filtered_chats = chats_df[
        (chats_df['user_name'].isin(selected_users)) & 
        (chats_df['user_role'].isin(selected_roles))
    ]
    
    # Analizar calidad de chats
    chat_analysis = []
    total_messages = 0
    
    for _, row in filtered_chats.iterrows():
        category, num_messages, user_messages = analyze_chat_quality(row['chat'])
        total_messages += num_messages
        
        chat_analysis.append({
            'id': row['id'],
            'title': row['title'] or 'Sin título',
            'user': row['user_name'],
            'email': row['email'],
            'role': row['user_role'],
            'category': category,
            'messages': num_messages,
            'user_messages': user_messages,
            'created_at': row['created_at'],
            'updated_at': row['updated_at']
        })
    
    analysis_df = pd.DataFrame(chat_analysis)
    
    # Métricas principales
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("""
        <div class="metric-card">
            <h2 style="color: #667eea; margin: 0;">{}</h2>
            <p style="margin: 5px 0;">Usuarios Bancamía</p>
            <small>{} admins | {} usuarios</small>
        </div>
        """.format(
            len(filtered_users),
            len(filtered_users[filtered_users['user_role'] == 'admin']),
            len(filtered_users[filtered_users['user_role'] == 'user'])
        ), unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="metric-card">
            <h2 style="color: #667eea; margin: 0;">{}</h2>
            <p style="margin: 5px 0;">Conversaciones</p>
            <small>{:.1f} por usuario</small>
        </div>
        """.format(
            len(filtered_chats),
            len(filtered_chats) / len(filtered_users) if len(filtered_users) > 0 else 0
        ), unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="metric-card">
            <h2 style="color: #667eea; margin: 0;">{}</h2>
            <p style="margin: 5px 0;">Mensajes Totales</p>
            <small>{:.1f} por chat</small>
        </div>
        """.format(
            total_messages,
            total_messages / len(filtered_chats) if len(filtered_chats) > 0 else 0
        ), unsafe_allow_html=True)
    
    with col4:
        if not analysis_df.empty:
            productive_chats = len(analysis_df[analysis_df['category'].isin(['productive', 'extensive'])])
            productivity_rate = (productive_chats / len(analysis_df) * 100) if len(analysis_df) > 0 else 0
        else:
            productivity_rate = 0
        
        st.markdown("""
        <div class="metric-card">
            <h2 style="color: #667eea; margin: 0;">{:.1f}%</h2>
            <p style="margin: 5px 0;">Tasa Productividad</p>
            <small>Chats productivos/extensivos</small>
        </div>
        """.format(productivity_rate), unsafe_allow_html=True)
    
    # Gráficos
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📊 Distribución por Calidad de Uso")
        if not analysis_df.empty:
            quality_counts = analysis_df['category'].value_counts()
            fig = px.pie(
                values=quality_counts.values,
                names=quality_counts.index,
                color=quality_counts.index,
                color_discrete_map={
                    'trivial': '#dc3545',
                    'exploratory': '#ffc107',
                    'productive': '#28a745', 
                    'extensive': '#17a2b8'
                }
            )
            fig.update_layout(height=400)
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No hay datos para mostrar")
    
    with col2:
        st.markdown("### 👥 Top Usuarios Más Activos")
        if not analysis_df.empty:
            user_stats = analysis_df.groupby('user').agg({
                'id': 'count',
                'messages': 'sum'
            }).round(1).sort_values('id', ascending=False).head(10)
            
            fig = px.bar(
                x=user_stats.index,
                y=user_stats['id'],
                labels={'x': 'Usuario', 'y': 'Número de Chats'},
                color=user_stats['id'],
                color_continuous_scale='Blues'
            )
            fig.update_layout(height=400, xaxis_tickangle=-45)
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No hay datos para mostrar")
    
    # Tabla de usuarios detallada
    st.markdown("### 🏆 Ranking de Usuarios por Productividad")
    
    if not analysis_df.empty:
        # Calcular estadísticas por usuario
        user_productivity = []
        for user in analysis_df['user'].unique():
            user_chats = analysis_df[analysis_df['user'] == user]
            total_chats = len(user_chats)
            productive = len(user_chats[user_chats['category'] == 'productive'])
            extensive = len(user_chats[user_chats['category'] == 'extensive'])
            trivial = len(user_chats[user_chats['category'] == 'trivial'])
            
            productivity_rate = ((productive + extensive) / total_chats * 100) if total_chats > 0 else 0
            
            user_productivity.append({
                'Usuario': user,
                'Email': user_chats.iloc[0]['email'],
                'Rol': user_chats.iloc[0]['role'],
                'Total Chats': total_chats,
                'Productivos': productive,
                'Extensivos': extensive,
                'Triviales': trivial,
                'Productividad (%)': f"{productivity_rate:.1f}%"
            })
        
        productivity_df = pd.DataFrame(user_productivity).sort_values('Productivos', ascending=False)
        st.dataframe(productivity_df, use_container_width=True)
    
    # Explorador de chats
    st.markdown("### 💬 Explorador de Conversaciones")
    
    # Filtros adicionales para chats
    col1, col2 = st.columns(2)
    
    with col1:
        quality_filter = st.selectbox(
            "Filtrar por calidad",
            ["Todas", "Extensivas", "Productivas", "Exploratorias", "Triviales"]
        )
    
    with col2:
        user_filter = st.selectbox(
            "Usuario específico",
            ["Todos"] + analysis_df['user'].unique().tolist() if not analysis_df.empty else ["Todos"]
        )
    
    # Aplicar filtros a chats
    display_chats = analysis_df.copy()
    
    if quality_filter != "Todas":
        quality_map = {
            "Extensivas": "extensive",
            "Productivas": "productive", 
            "Exploratorias": "exploratory",
            "Triviales": "trivial"
        }
        display_chats = display_chats[display_chats['category'] == quality_map[quality_filter]]
    
    if user_filter != "Todos":
        display_chats = display_chats[display_chats['user'] == user_filter]
    
    # Mostrar chats
    if not display_chats.empty:
        for _, chat in display_chats.head(20).iterrows():
            with st.expander(f"💬 {chat['title'][:60]}... | {chat['user']} | {chat['messages']} mensajes"):
                col1, col2, col3 = st.columns(3)
                
                with col1:
                    st.write(f"**Usuario:** {chat['user']}")
                    st.write(f"**Email:** {chat['email']}")
                    st.write(f"**Rol:** {chat['role']}")
                
                with col2:
                    quality_color = get_quality_color(chat['category'])
                    st.markdown(f"**Calidad:** <span style='color: {quality_color}'>{chat['category'].title()}</span>", unsafe_allow_html=True)
                    st.write(f"**Mensajes:** {chat['messages']}")
                
                with col3:
                    st.write(f"**Creado:** {chat['created_at']}")
                    st.write(f"**Actualizado:** {chat['updated_at']}")
                
                # Mostrar preview de mensajes del usuario
                if chat['user_messages']:
                    st.markdown("**Preview de mensajes:**")
                    for i, msg in enumerate(chat['user_messages'][:3]):
                        st.markdown(f"```\n{msg[:200]}{'...' if len(msg) > 200 else ''}\n```")
                        if i >= 2:  # Mostrar máximo 3 mensajes
                            break
    else:
        st.info("No se encontraron conversaciones con los filtros aplicados")

if __name__ == "__main__":
    main()