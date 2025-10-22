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
  FaRobot,
  FaBrain,
  FaBalanceScale,
  FaBolt,
  FaLightbulb,
} from 'react-icons/fa';

const NODE_TYPES = {
  default: ({ data }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-[10px] sm:text-xs min-w-[140px] sm:min-w-[180px] max-w-xs pointer-events-none"
    >
      <Handle type="target" position={Position.Left} className="bg-orange-500 w-2 h-2 pointer-events-none" />
      <div className="flex items-center gap-1 sm:gap-2 mb-1">
        <data.icon className="text-orange-500 text-sm sm:text-base" />
        <strong className="text-[11px] sm:text-[13px]">{data.label}</strong>
      </div>
      <p className="text-gray-600 text-[9px] sm:text-[11px] leading-tight">{data.description}</p>
      <Handle type="source" position={Position.Right} className="bg-orange-500 w-2 h-2 pointer-events-none" />
    </motion.div>
  ),
};

// === Nodos ===
const nodes = [
  {
    id: '1',
    type: 'default',
    position: { x: 0, y: 50 },
    data: {
      label: 'USER_SETTINGS',
      icon: FaBrain,
      description: 'Contenedor principal donde se define el modelo del agente y otras configuraciones.',
    },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 300, y: 50 },
    data: {
      label: 'Modelo Actual',
      icon: FaRobot,
      description: 'Selecciona el modelo que usarán tus agentes. Ejemplo: "llama-3.3-70b-versatile".',
    },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 600, y: 0 },
    data: {
      label: 'Llama 3.3 70B',
      icon: FaBalanceScale,
      description: 'Equilibrado, rápido y generalista. Ideal para agentes versátiles.',
    },
  },
  {
    id: '4',
    type: 'default',
    position: { x: 600, y: 100 },
    data: {
      label: 'Llama 3.1 8B',
      icon: FaBolt,
      description: 'Más liviano, excelente para chat y preguntas/respuestas rápidas.',
    },
  },
  {
    id: '5',
    type: 'default',
    position: { x: 600, y: 200 },
    data: {
      label: 'Mixtral 8x7B',
      icon: FaLightbulb,
      description: 'Optimizado para tareas analíticas y cálculos complejos.',
    },
  },
  {
    id: '6',
    type: 'default',
    position: { x: 900, y: 50 },
    data: {
      label: 'Uso según tipo de agente',
      icon: FaBrain,
      description:
        'Elige el modelo según la finalidad del agente: chat, análisis, filtrado de contenido, generación de texto, etc.',
    },
  },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e3-6', source: '3', target: '6', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#fb923c' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#fb923c' } },
];

export default function UserSettingsFlow() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-12 px-4 bg-white gap-8 select-none">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] h-[60vh] bg-white border border-gray-200 rounded-xl shadow-sm relative">
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
              preventScrolling={true}
              className="bg-white pointer-events-none"
            >
              <Background color="#f3f4f6" gap={16} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
