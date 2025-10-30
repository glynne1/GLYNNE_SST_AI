'use client';

import { motion } from 'framer-motion';
import {
  Handle,
  Position,
  ReactFlowProvider,
  ReactFlow,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  FaFolderOpen,
  FaRobot,
  FaBrain,
  FaCog,
  FaNetworkWired,
  FaBolt,
  FaCode,
  FaServer,
  FaFileAlt,
  FaTerminal,
} from 'react-icons/fa';

const NODE_TYPES = {
  default: ({ data }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-300 rounded-lg shadow-md px-3 py-2 text-[10px] sm:text-xs min-w-[160px] sm:min-w-[200px] max-w-xs pointer-events-none select-none"
    >
      <Handle type="target" position={Position.Left} className="bg-orange-500 w-2 h-2" />
      <div className="flex items-center gap-1 sm:gap-2 mb-1">
        <data.icon className="text-orange-500 text-sm sm:text-base" />
        <strong className="text-[11px] sm:text-[13px]">{data.label}</strong>
      </div>
      <p className="text-gray-600 text-[9px] sm:text-[11px] leading-tight">{data.description}</p>
      <Handle type="source" position={Position.Right} className="bg-orange-500 w-2 h-2" />
    </motion.div>
  ),
};

// === NODOS ===
// === NODOS ===
const nodes = [
    {
      id: '1',
      type: 'default',
      position: { x: 0, y: 150 },
      data: {
        label: '📂 Carpeta user/',
        icon: FaFolderOpen,
        description: 'Contiene los archivos de configuración de cada agente IA. Cada .py define un agente independiente con su propio rol, modelo y comportamiento.',
      },
    },
    {
      id: '2',
      type: 'default',
      position: { x: 300, y: 150 },
      data: {
        label: '📄 panel.py',
        icon: FaFileAlt,
        description: 'Archivo principal del agente técnico. Define la configuración base del agente y se comunica con el núcleo del framework (CorePanel).',
      },
    },
    {
      id: '3',
      type: 'default',
      position: { x: 600, y: 50 },
      data: {
        label: '🧠 USER_SETTINGS',
        icon: FaBrain,
        description: 'Diccionario que define los parámetros ',
      },
    },
    {
      id: '4',
      type: 'default',
      position: { x: 900, y: 0 }, // Mantiene esta posición
      data: {
        label: '🤖 Modelo del agente',
        icon: FaRobot,
        description: 'Define qué modelo LLM utiliza. ',
      },
    },
    {
      id: '5',
      type: 'default',
      position: { x: 900, y: 100 }, // Cambiado de 80 a 100 (+20px)
      data: {
        label: '🌡️ Temperatura',
        icon: FaBolt,
        description: 'Controla la creatividad del modelo. ',
      },
    },
    {
      id: '6',
      type: 'default',
      position: { x: 900, y: 200 }, // Cambiado de 160 a 200 (+40px)
      data: {
        label: '🧍 Rol del agente',
        icon: FaCog,
        description: 'Define el papel o personalidad .',
      },
    },
    {
      id: '7',
      type: 'default',
      position: { x: 900, y: 300 }, // Cambiado de 240 a 300 (+60px)
      data: {
        label: '💬 Prompt Base',
        icon: FaCode,
        description: 'Plantilla que guía las respuestas del agente. ',
      },
    },
    {
      id: '8',
      type: 'default',
      position: { x: 600, y: 250 },
      data: {
        label: '⚙️ CorePanel (núcleo)',
        icon: FaNetworkWired,
        description: 'Clase importada desde core/panel.py.',
      },
    },
    {
      id: '9',
      type: 'default',
      position: { x: 900, y: 400 }, // Ajustado para mantener relación con el nodo 7
      data: {
        label: '🚀 Inicialización',
        icon: FaServer,
        description: 'El objeto inicializa el agente con la configuración dada.',
      },
    },
    {
      id: '10',
      type: 'default',
      position: { x: 1200, y: 400 }, // Ajustado para mantener relación con el nodo 9
      data: {
        label: '🧩 app = framework.graph',
        icon: FaTerminal,
        description: 'Expone el agente como una interfaz FastAPI, permitiendo interacción vía API o frontend.',
      },
    },
  ];

// === CONEXIONES ===
const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e3-6', source: '3', target: '6', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e3-7', source: '3', target: '7', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e2-8', source: '2', target: '8', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#fb923c' } },
];

export default function GlynneAgentFlow() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-12 px-4 bg-white gap-8 select-none pointer-events-none">
   
      <p className="text-gray-600 text-sm max-w-3xl text-center pointer-events-none">
        Representación visual del flujo de configuración e inicialización del agente IA dentro del framework GLYNNE.
        Muestra cómo <strong>user/panel.py</strong> define parámetros, conecta con el núcleo (<strong>CorePanel</strong>) y expone el agente vía API.
      </p>

      <div className="w-full overflow-x-auto pointer-events-none">
        <div className="min-w-[1000px] h-[70vh] bg-white border border-gray-200 rounded-xl shadow-sm pointer-events-none">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={NODE_TYPES}
              fitView
              panOnScroll={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              panOnDrag={false}
              elementsSelectable={false}
              nodesDraggable={false}
              nodesConnectable={false}
              proOptions={{ hideAttribution: true }}
              className="bg-white pointer-events-none select-none"
            >
              <Background color="#f3f4f6" gap={16} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
