import React, { useState } from "react";
import { File, Play, X, Columns } from "lucide-react";

export default function VsCodeMockEditor() {
  const [activeFile, setActiveFile] = useState("gly_ia.py");
  const [openConsole, setOpenConsole] = useState(true);
  const [splitView, setSplitView] = useState(false);


  const files = {
    "gly_ia.py": 
    `  # ----------------------------------------------
    # Importación de librerías necesarias
    # ----------------------------------------------

    # -------------------------------------------------------------------
# ARRANQUE DEL SERVIDOR
# -------------------------------------------------------------------
# Esta sección inicia el asistente conversacional en consola, genera un usuario
# temporal con memoria propia y permite interactuar en tiempo real con un modelo
# de inteligencia artificial. Cada pregunta pasa por un grafo de decisión que:
# 1) analiza la intención del usuario, 2) decide si requiere buscar información
# en internet, 3) consulta la web si es necesario, 4) construye un prompt avanzado
# con memoria e información actual, y 5) genera una respuesta inteligente con IA.
# Se usa un bucle interactivo tipo chat (CLI) que solo termina cuando el usuario
# escribe "salir". Este sistema permite crear asistentes adaptables, con memoria,
# acceso a información actual y diferentes roles (auditor, asesor, profesor, etc).

    
    import os              # Para leer variables de entorno (.env)
    import random          # Para generar un user_id aleatorio
    import requests        # Para hacer peticiones HTTP (búsqueda en Serper)
    import datetime        # Para obtener la fecha actual
    
    from dotenv import load_dotenv  # Permite cargar el archivo .env
    from typing import TypedDict    # Para definir un tipado estricto de diccionario
    
    # LangGraph se usa para crear grafos que controlan el flujo entre funciones (nodos)
    from langgraph.graph import StateGraph, END
    
    # LLM de Groq (modelo llama 3.3)
    from langchain_groq import ChatGroq
    
    # Permite crear prompts dinámicos con variables
    from langchain.prompts import PromptTemplate
    
    # Permite guardar memoria (historial) por usuario
    from langchain.memory import ConversationBufferMemory
    
    # =====================================================
    # 1. CONFIGURACIÓN INICIAL
    # =====================================================
    
    # Carga las variables de entorno desde el archivo .env
    load_dotenv()
    
    # Obtiene las API KEYS guardadas en el .env
    api_key = os.getenv("GROQ_API_KEY")
    serper_api_key = os.getenv("SERPER_API_KEY")
    
    # Validaciones para evitar que el programa siga sin API keys
    if not api_key:
        raise ValueError("en el .env no hay una api valida de GROQ")
    
    if not serper_api_key:
        raise ValueError("en el .env no hay una api valida de SERPER")
    
    # Inicializa el modelo de lenguaje (LLM) usando Groq
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",  # Nombre del modelo a usar
        api_key=api_key,                 # Clave de acceso obtenida desde el .env
        temperature=0.4,                 # Qué tan creativo será el modelo (0 = determinista, 1 = muy creativo)
    )
    
    
    # =====================================================
    # 2. PROMPT BASE (Plantilla para hablar con el modelo)
    # =====================================================
    
    # Este prompt se enviará al LLM cada vez que deba responder
    # Contiene instrucciones de cómo debe comportarse el asistente
    Prompt_estructura = """
    [CONTEXTO]
    Hoy es {fecha}.
    Tienes acceso a memoria y a resultados de búsqueda web (cuando existan).
    Responde de forma natural y conversacional:
    - Si hay resultados de búsqueda: intégralos en tu respuesta sin sonar forzado.
    - Si no hay resultados de búsqueda: responde con tu conocimiento previo, pero menciona brevemente que puede estar desactualizado.
    - Siempre prioriza ser útil, claro y conciso, evitando repetir advertencias innecesarias.
    
    [BUSQUEDA WEB]
    {busqueda}
    
    [MEMORIA]
    {historial}
    
    [ENTRADA DEL USUARIO]
    Consulta: {mensaje}
    
    [RESPUESTA COMO {rol}]
    """
    
    # Se crea el objeto PromptTemplate para reemplazar valores dinámicos después
    prompt = PromptTemplate(
        input_variables=["rol", "mensaje", "historial", "busqueda", "fecha"],
        template=Prompt_estructura.strip(),  # strip() quita espacios extras al inicio y final
    )
    
    
    # =====================================================
    # 3. DEFINICIÓN DEL ESTADO GLOBAL
    # =====================================================
    
    # TypedDict define cómo debe verse el 'state' (estado) que viajará entre nodos del grafo
    class State(TypedDict):
        mensaje: str    # Lo que escribe el usuario
        rol: str        # Rol que asumirá el modelo (Ej: auditor, asesor, etc)
        historial: str  # Memoria del chat anterior
        respuesta: str  # Lo que responde la IA
        busqueda: str   # Resultado obtenido de búsqueda web
        user_id: str    # ID del usuario para almacenar su memoria
    
    # Diccionario que almacenará memoria por usuario
    # Clave = user_id, Valor = ConversationBufferMemory()
    usuarios = {}
    
    # Esta función devuelve la memoria asociada a un usuario
    # Si no existe memoria, la crea y la guarda
    def get_memory(user_id: str):
        if user_id not in usuarios:
            usuarios[user_id] = ConversationBufferMemory(
                memory_key="historial", input_key="mensaje"
            )
        return usuarios[user_id]
    
    
    # =====================================================
    # 4. NODO DE BÚSQUEDA WEB (SERPER API)
    # =====================================================
    
    def serper_node(state: State) -> State:
        """
        Este nodo se encarga de buscar en internet usando Serper API
        si la pregunta del usuario amerita información actual.
        """
        try:
            # Extrae el mensaje del usuario para buscarlo en Google
            q = state.get("mensaje", "")
            
            # Configura headers necesarios para la API de Serper
            headers = {"X-API-KEY": serper_api_key, "Content-Type": "application/json"}
    
            # Petición POST a la API con la búsqueda
            resp = requests.post(
                "https://google.serper.dev/search",
                headers=headers,
                json={"q": q},
            )
    
            # Convierte la respuesta a JSON
            data = resp.json()
    
            # Si hay resultados orgánicos, toma los 3 primeros
            if "organic" in data and len(data["organic"]) > 0:
                resumen = [
                    f"{item.get('title')} - {item.get('link','')}"
                    for item in data["organic"][:3]  # Solo 3 para no saturar
                ]
                # Une resultados en un solo texto
                state["busqueda"] = " | ".join(resumen)
            else:
                # Si no hay resultados
                state["busqueda"] = "No hubo resultados"
    
        except Exception as e:
            # Si falla la búsqueda, guarda el error
            state["busqueda"] = f"Error en búsqueda: {e}"
    
        # Debug para ver qué se encontró
        print("DEBUG búsqueda:", state["busqueda"])
    
        return state
    
    
    # =====================================================
    # 5. NODO PRINCIPAL DEL AGENTE (IA + búsqueda + memoria)
    # =====================================================
    
    def agente_node(state: State) -> State:
        """
        Este nodo genera la respuesta final del LLM.
        También decide si necesita buscar en internet o no.
        """
    
        # Cargar la memoria del usuario según su user_id
        memory = get_memory(state.get("user_id", "default"))
    
        # Cargar historial previo
        historial = memory.load_memory_variables({}).get("historial", "")
    
        # Obtener la fecha actual en formato Día/Mes/Año
        fecha = datetime.date.today().strftime("%d/%m/%Y")
    
        # -------------------------------------------------
        # Heurística simple para decidir si activar búsqueda
        # Si el mensaje contiene estas palabras, buscará info
        # -------------------------------------------------
        activar_busqueda = any(
            palabra in state["mensaje"].lower()
            for palabra in ["quién", "cuándo", "actual", "último", "presidente", "hoy", "noticia", "última hora"]
        )
    
        # Si hay coincidencia, ejecuta búsqueda en internet
        if activar_busqueda:
            state = serper_node(state)
    
        # Se construye el prompt final reemplazando variables
        texto_prompt = prompt.format(
            rol=state["rol"],
            mensaje=state["mensaje"],
            historial=historial,
            busqueda=state.get("busqueda", ""),
            fecha=fecha,
        )
    
        # Se envía el prompt al modelo y se obtiene una respuesta
        respuesta = llm.invoke(texto_prompt).content
    
        # Guarda la interacción en memoria para próximos mensajes
        memory.save_context({"mensaje": state["mensaje"]}, {"respuesta": respuesta})
    
        # Se almacena en el state lo que respondió el LLM
        state["respuesta"] = respuesta
        state["historial"] = historial
    
        return state
    
    
    # =====================================================
    # 6. CREAR EL GRAFO (Flujo de ejecución)
    # =====================================================
    
    # Inicializa el grafo con el tipo de estado definido
    workflow = StateGraph(State)
    
    # Agrega los nodos (funciones que hacen algo)
    workflow.add_node("serper", serper_node)
    workflow.add_node("agente", agente_node)
    
    # Define dónde inicia el flujo
    workflow.set_entry_point("agente")
    
    # Después del nodo agente, el flujo finaliza (END)
    workflow.add_edge("agente", END)
    
    # Compila y crea la aplicación ejecutable del grafo
    app = workflow.compile()
    
    
    # =====================================================
    # 7. INTERFAZ DE CONSOLA (CLI para chatear)
    # =====================================================
    
    print("LLM iniciado con LangGraph + Serper dinámico")
    
    # Creamos un user_id aleatorio para identificar al usuario en la memoria
    user_id = str(random.randint(10000, 90000))
    rol = "auditor"  # Puedes cambiar el rol si quieres
    
    print(f"tu user id es {user_id}")
    
    # Bucle infinito de chat hasta que el usuario escriba "salir"
    while True:
        user_input = input("Tu: ")
        if user_input.lower() == "salir":
            break
    
        # Se ejecuta el grafo con los datos del usuario
        result = app.invoke(
            {"mensaje": user_input, "rol": rol, "historial": "", "user_id": user_id}
        )
    
        # Se imprime la respuesta generada
        print("LLM:", result["respuesta"])
    
        # -------------------------------------------------------------------
        # SISTEMA DE AGENTE INTELIGENTE CON MEMORIA Y BÚSQUEDA EN INTERNET
        # -------------------------------------------------------------------
        # Este código configura un asistente de inteligencia artificial basado en Groq LLM,
        # capaz de recordar conversaciones (memoria por usuario), entender roles, consultar
        # información en tiempo real con Google (Serper API) y responder de forma inteligente
        # usando un flujo controlado por grafos (LangGraph).
        #
        # ¿Para qué sirve?
        # - Crear un chatbot avanzado que recuerde contexto entre mensajes
        # - Hacer consultas a internet cuando la pregunta necesita datos actuales
        # - Simular distintos tipos de asistentes (auditor, experto, asesor, etc)
        # - Automatizar respuestas con lenguaje natural coherente y contextual
        # - Desarrollar agentes conversacionales con toma de decisiones interna
        #
        # ¿Qué se puede hacer con esto?
        # ✅ Crear asistentes de soporte, ventas, educación o automatización
        # ✅ Consultar noticias, hechos recientes o información actualizada
        # ✅ Mantener conversaciones con memoria personalizada por usuario
        # ✅ Integrarlo luego a una API, frontend web, WhatsApp, Telegram, etc
        # ✅ Construir agentes más complejos que razonen antes de responder
        #
        # Es un sistema modular, extensible y listo para convertirse en una API,
        # un agente autónomo, o un asistente integrado a cualquier aplicación.
        
      
      






        .
    `,

    "main.py": 
    `# -------------------------------------------------------------------
    # IMPORTACIÓN DE LIBRERÍAS
    # -------------------------------------------------------------------
    
    # -------------------------------------------------------------------
# API INTELIGENTE PARA CONEXIÓN CON UN AGENTE LLM (IA + MEMORIA + BÚSQUEDA)
# -------------------------------------------------------------------
# Este código expone como API REST un agente conversacional basado en IA, permitiendo
# que aplicaciones externas (web, móvil, bots, automatizaciones) envíen mensajes y reciban
# respuestas inteligentes en formato JSON. Funciona como un "puente" entre clientes y un
# modelo LLM orquestado con LangGraph, que soporta memoria por usuario, roles personalizados
# y búsqueda en internet si el agente así lo decide.
#
# ¿Qué hace?
# - Recibe consultas del usuario mediante POST (/chat)
# - Envía esa consulta al agente de IA (LangGraph)
# - Mantiene contexto y memoria por cada usuario (user_id)
# - Permite personalizar el tipo de asistente mediante roles (ej: auditor, asesor, experto)
# - Devuelve la respuesta generada por la IA en JSON para que cualquier sistema la pueda usar
#
# ¿Para qué sirve?
# ✅ Crear chatbots inteligentes conectables a webs, apps o servicios
# ✅ Implementar asistentes con memoria continua de conversación
# ✅ Conectar IA a sistemas reales vía API
# ✅ Integrar búsqueda web automáticamente dentro de un flujo de IA
# ✅ Escalar el agente a WhatsApp, Telegram, dashboards, CRMs, etc.
#
# ¿Qué se puede construir con esto?
# 🚀 Un asistente tipo ChatGPT propio consumible desde frontend
# 🤖 Bots automatizados para soporte, ventas o productividad
# 🧠 Agentes con razonamiento, historial y decisiones dinámicas
# 🌐 APIs que combinan IA + información actualizada en tiempo real
#
# En resumen: este código convierte un agente inteligente en un servicio web listo
# para ser utilizado por cualquier aplicación conectada a internet.



    from fastapi import FastAPI, HTTPException  
    # FastAPI → framework para crear APIs rápidas en Python
    # HTTPException → permite devolver errores personalizados (ej: 500, 404, 400)
    
    from pydantic import BaseModel  
    # BaseModel permite definir el "molde" o estructura que deben tener los JSON que recibimos en la API
    
    import uvicorn
    # Es el servidor ASGI que ejecutará la API (FastAPI no corre solo, necesita Uvicorn)
    
    import random
    # Lo usaremos para generar un user_id cuando el cliente no lo envíe
    
    from tu_agente import app  
    # 👆 Aquí importamos el grafo compilado de LangGraph (la IA)
    # ⚠ Debes reemplazar "tu_agente" por el nombre real de tu archivo sin .py
    # Ej: si tu archivo es agente.py → from agente import app
    
    
    # -------------------------------------------------------------------
    # INICIALIZACIÓN DE LA API
    # -------------------------------------------------------------------
    
    fastapp = FastAPI(title="Agente LLM API")
    # Crea la aplicación FastAPI
    # "title" solo cambia el nombre que se mostrará en Swagger (/docs)
    
    
    # -------------------------------------------------------------------
    # MODELO (ESTRUCTURA) DE DATOS QUE ESPERA LA API
    # -------------------------------------------------------------------
    
    class Query(BaseModel):
        # Este es el esquema del JSON que debe enviar el frontend o cliente
        
        mensaje: str       # Aquí va la pregunta del usuario (Obligatorio)
        rol: str = "auditor"  # Si no envía rol, por defecto toma "auditor"
        user_id: str | None = None  # Puede llegar vacío (None)
    
    
    # -------------------------------------------------------------------
    # ENDPOINT PRINCIPAL (LA RUTA QUE LLAMA A LA IA)
    # -------------------------------------------------------------------
    
    @fastapp.post("/chat")
    # Esto significa que la API recibirá peticiones POST en: http://localhost:8000/chat
    
    async def chat(query: Query):
        """
        Esta función:
        1. Recibe el JSON del usuario
        2. Llama al modelo LangGraph (app.invoke)
        3. Devuelve la respuesta de la IA en JSON
        """
    
        try:
            # Si el cliente NO envía un user_id, generamos uno aleatorio
            user_id = query.user_id or str(random.randint(10000, 90000))
    
            # Enviamos los datos al grafo (IA + memoria + búsqueda si aplica)
            response = app.invoke({
                "mensaje": query.mensaje,  # Pregunta del usuario
                "rol": query.rol,          # Rol que debe asumir la IA
                "historial": "",           # Inicialmente vacío (la memoria se maneja por dentro)
                "user_id": user_id         # ID para recordar sesiones del mismo usuario
            })
    
            # Devolvemos la respuesta en formato JSON
            return {
                "user_id": user_id,  # Devolvemos el user_id por si el cliente quiere guardarlo
                "respuesta": response.get("respuesta", "")  # Texto que generó la IA
            }
    
        except Exception as e:
            # Si ocurre un error, devolvemos un 500 con el detalle
            raise HTTPException(status_code=500, detail=str(e))
    
    
    # -------------------------------------------------------------------
    # ARRANQUE DEL SERVIDOR
    # -------------------------------------------------------------------
    
    if __name__ == "__main__":
        # Esto solo se ejecuta si corres el archivo directamente: python main.py
        uvicorn.run(
            "main:fastapp",  # Indica: archivo main.py → variable fastapp
            host="0.0.0.0",  # 0.0.0.0 hace que el servidor acepte conexiones externas también
            port=8000,       # Puerto donde correrá la API
            reload=True      # Recarga automática cuando guardas cambios en el código
        )






        .
    
    `
  };

  const highlight = (code) => {
    const tokens = [];
    const push = (style, content) => {
      const k = `@@T${tokens.length}@@`;
      tokens.push(`<span class="${style}">${content}</span>`);
      return k;
    };

    let html = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/(#.*$)/gm, (m) => push("text-green-600", m))
      .replace(/(["'`].*?["'`])/g, (m) => push("text-orange-500", m))
      .replace(/\b(import|from|def|return|if|else|try|except|class|await|raise|in|as|with|while|break|print)\b/g, (m) =>
        push("text-blue-600", m)
      )
      .replace(/\b(True|False|None)\b/g, (m) => push("text-purple-600", m))
      .replace(/\b(\d+)\b/g, (m) => push("text-green-600", m));

    tokens.forEach((t, i) => (html = html.replace(`@@T${i}@@`, t)));
    return html;
  };

  const renderEditor = (file) => {
    const lines = files[file].split("\n");

    return (
      <div className="flex flex-1 overflow-hidden border-r border-gray-200">
        {/* Números de línea */}
        <div className="text-gray-400 px-2 py-2 bg-gray-50 border-r border-gray-100 text-[9px] leading-[14px]">
          {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>

        {/* Código */}
        <pre className="flex-1 p-2 overflow-auto whitespace-pre leading-[14px] text-[10px] bg-white text-left">
          {lines.map((line, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: highlight(line) || "<br/>" }} />
          ))}
        </pre>
      </div>
    );
  };

  return (
    <div className="relative h-[90vh] w-full bg-white text-gray-900 flex font-mono text-[10px] overflow-hidden">

      <main className="flex-1 flex flex-col overflow-hidden">

        {/* FILE TABS + SPLIT TOGGLE */}
        <div className="flex justify-between bg-gray-50 border-b border-gray-100 select-none">
          <div className="flex">
            {Object.keys(files).map(file => (
              <div
                key={file}
                onClick={() => setActiveFile(file)}
                className={`flex items-center px-2 py-[3px] text-[10px] cursor-pointer ${
                  activeFile === file
                    ? "bg-white text-gray-900 border-b border-blue-500"
                    : "text-gray-500"
                }`}
              >
                <File size={10} className="mr-1" />
                {file}
                <X size={10} className="ml-1 opacity-50 hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* BTN SPLIT VIEW */}
          <button
            onClick={() => setSplitView(!splitView)}
            className="px-2 text-gray-600 hover:text-black flex items-center gap-1 text-[11px] border-l border-gray-200"
          >
            <Columns size={12} />
            {splitView ? "Unir vista" : "Dividir"}
          </button>
        </div>

        {/* EDITOR VIEW (SPLIT O NORMAL) */}
        <div className="flex flex-1 overflow-hidden">
          {!splitView ? (
            renderEditor(activeFile)
          ) : (
            <>
              {renderEditor("gly_ia.py")}
              {renderEditor("main.py")}
            </>
          )}
        </div>

      </main>

      {/* TERMINAL */}
      <div
        className={`absolute left-0 bottom-0 w-full bg-white border-t border-gray-300 text-gray-800 transition-all ${
          openConsole ? "h-[150px]" : "h-[60px]"
        }`}
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between px-3 h-[30px] bg-gray-100 text-[11px] cursor-pointer border-b border-gray-300"
          onClick={() => setOpenConsole(!openConsole)}
        >
          <div className="flex items-center gap-2 font-medium">
            <Play size={12} /> Terminal
          </div>
          <span className="text-[10px] text-gray-500">(click para {openConsole ? "cerrar" : "abrir"})</span>
        </div>

        {/* CONTENIDO TERMINAL */}
        {openConsole && (
          <pre className="block text-left whitespace-pre p-3 text-[11px] overflow-auto h-[150px] font-mono leading-[18px] text-gray-800 bg-white">
{`# 1. Crea la carpeta del proyecto
mkdir my-glynne-ai
cd my-glynne-ai

# 2. Instala Python si aún no lo tienes
python3 --version

# 3. Crea y activa el entorno virtual
python3 -m venv venv
source venv/bin/activate

# 4. Instala dependencias necesarias
python3 -m pip install python-dotenv "langchain<0.2" langchain-groq langgraph fastapi pydantic uvicorn

# 5. Crea la estructura del proyecto
mkdir agents
touch agents/chat.py
touch main.py

# ────────────────────────────────
# 📁 Tu proyecto debe verse así:
#
# my-glynne-ai/
# ├── venv/
# ├── agents/
# │   └── chat.py   ← lógica IA
# └── main.py       ← FastAPI + Uvicorn
# ────────────────────────────────

# 6. Ejecuta el servidor
uvicorn main:app --reload

✅ Listo! Tu API está corriendo 🚀`}
          </pre>
        )}
      </div>

    </div>
  );
}
