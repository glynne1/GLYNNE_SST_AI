import React, { useState } from "react";
import { File, Folder, Play, X } from "lucide-react";

export default function VsCodeMockEditor() {
  const [activeFile, setActiveFile] = useState("gly_ia.py");

  const files = {
    "gly_ia.py": `import os, random, requests, datetime
    from dotenv import load_dotenv
    from langchain_groq import ChatGroq
    from langchain.prompts import PromptTemplate
    from langchain.memory import ConversationBufferMemory
    from langgraph.graph import StateGraph, END
    from typing import TypedDict
    
    load_dotenv()
    groq_api_key = os.getenv('GROQ_API_KEY')
    serper_api_key = os.getenv('SERPER_API_KEY')
    
    if not groq_api_key:
        raise ValueError('❌ No hay API key de Groq en el .env')
    if not serper_api_key:
        raise ValueError('❌ No hay API key de Serper en el .env')
    
    llm = ChatGroq(
        model='llama-3.3-70b-versatile',
        api_key=groq_api_key,
        temperature=0.4
    )
    
    prompt_structure = """
    Hoy es {fecha}
    Actúa como un científico loco con el rol {rol}
    Mantén coherencia en la conversación basándote en este historial: {historial}
    Si te piden información actual, usa esto: {busqueda}
    
    Mensaje del usuario: {mensaje}
    """
    
    prompt = PromptTemplate(
        input_variables=['rol', 'mensaje', 'historial', 'busqueda', 'fecha'],
        template=prompt_structure.strip()
    )
    
    class State(TypedDict):
        mensaje: str
        rol: str
        busqueda: str
        respuesta: str
        historial: str
        user_id: str
    
    usuarios = {}
    
    def get_memory(user_id: str):
        if user_id not in usuarios:
            usuarios[user_id] = ConversationBufferMemory(
                memory_key='historial',
                input_key='mensaje'
            )
        return usuarios[user_id]
    
    def serper_nodo(state: State) -> State:
        try:
            q = state.get('mensaje', '')
            headers = {'X-API-KEY': serper_api_key, 'Content-Type': 'application/json'}
            resp = requests.post(
                'https://google.serper.dev/search',
                headers=headers,
                json={'q': q}
            )
            data = resp.json()
            if 'organic' in data and len(data['organic']) > 0:
                resumen = [
                    f"{item.get('title')} - {item.get('link', '')}"
                    for item in data['organic'][:3]
                ]
                state['busqueda'] = ' | '.join(resumen)
            else:
                state['busqueda'] = 'No hubo resultados'
        except Exception as e:
            state['busqueda'] = f"Error en búsqueda: {e}"
    
        return state
    
    def agente_node(state: State) -> State:
        memory = get_memory(state.get('user_id', 'default'))
        historial = memory.load_memory_variables({}).get('historial', '')
        fecha = datetime.date.today().strftime('%d/%m/%Y')
    
        activar_busqueda = any(
            palabra in state['mensaje'].lower()
            for palabra in ["quién", "cuándo", "actual", "último", "presidente", "hoy", "noticia", "última hora"]
        )
        if activar_busqueda:
            state = serper_nodo(state)
    
        prompt_compres = prompt.format(
            rol=state['rol'],
            mensaje=state['mensaje'],
            busqueda=state.get('busqueda', ''),
            historial=historial,
            fecha=fecha
        )
    
        respuesta = llm.invoke(prompt_compres).content
        memory.save_context(
            {'mensaje': state['mensaje']},
            {'respuesta': respuesta}
        )
    
        state['respuesta'] = respuesta
        state['historial'] = historial
        return state
    
    workflow = StateGraph(State)
    workflow.add_node('agente', agente_node)
    workflow.add_node('serper', serper_nodo)
    
    workflow.set_entry_point('agente')
    workflow.add_edge('agente', END)
    app = workflow.compile()
    
    def ejecutar_agente(mensaje: str, user_id: str, rol="cientifico"):
        result = app.invoke(
            {
                'rol': rol,
                'mensaje': mensaje,
                'historial': '',
                'user_id': user_id
            }
        )
        return result['respuesta']
    `,

    "main.py": `import random
    from agent import ejecutar_agente
    
    print('========= LLM iniciado ==========')
    
    user_id = str(random.randint(10000, 90000))
    print(f"Tu user id es: {user_id}")
    
    while True:
        user_input = input("\nTÚ: ")
        if user_input.lower() == "salir":
            print("👋 Chat finalizado.")
            break
    
        respuesta = ejecutar_agente(user_input, user_id)
        print("🤖 RESPUESTA:", respuesta)
    `
  };

  
  const highlight = (code) => {
    const tokens = [];

    const push = (style, content) => {
      const key = `@@T${tokens.length}@@`;
      tokens.push(`<span class="${style}">${content}</span>`);
      return key;
    };

    let html = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/(#.*$)/gm, (m) => push("text-green-600 italic", m))
      .replace(/(["'`].*?["'`])/g, (m) => push("text-orange-500", m))
      .replace(/\b(import|from|def|return|if|else|try|except|class|async|await|raise|in|as|with|pass|print|while|break)\b/g, (m) =>
        push("text-blue-600 font-semibold", m)
      )
      .replace(/\b(True|False|None)\b/g, (m) => push("text-purple-600", m))
      .replace(/\b(\d+)\b/g, (m) => push("text-green-600", m));

    tokens.forEach((t, i) => (html = html.replace(`@@T${i}@@`, t)));

    return html;
  };

  const lines = files[activeFile].split("\n");

  return (
    <div className="h-[90vh] w-full bg-[#fff] text-gray-900 flex font-mono text-[15px] rounded-xl shadow-lg overflow-hidden border border-gray-200">

      {/* EDITOR PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* TABS */}
        <div className="flex bg-[#f8f8f8] border-b border-gray-200 select-none">
          {Object.keys(files).map(file => (
            <div
              key={file}
              onClick={() => setActiveFile(file)}
              className={`flex items-center px-4 py-2 text-sm border-r border-gray-200 cursor-pointer ${
                activeFile === file
                  ? "bg-white text-gray-900 border-b-2 border-blue-500 font-medium"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <File size={14} className="mr-2 text-gray-500" />
              {file}
              <X size={14} className="ml-2 text-gray-400 hover:text-red-500 transition" />
            </div>
          ))}
        </div>

        {/* ZONA CÓDIGO */}
        <div className="flex flex-1 overflow-hidden">

          {/* NUMERACIÓN */}
          <div className="text-right text-gray-400 select-none px-4 py-3 bg-[#fafafa] border-r border-gray-200 overflow-hidden text-[14px]">
            {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>

          {/* EDITOR */}
          <pre className="flex-1 p-4 overflow-auto whitespace-pre leading-6 text-left bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {lines.map((line, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: highlight(line) || "<br/>" }} />
            ))}
          </pre>
        </div>
      </main>

    </div>
  );
}