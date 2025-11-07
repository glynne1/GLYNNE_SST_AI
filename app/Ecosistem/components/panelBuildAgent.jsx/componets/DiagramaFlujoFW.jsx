'use client';

import { motion } from 'framer-motion';
import { Handle, Position, ReactFlowProvider, ReactFlow, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import {
  FaFolderOpen, FaFileAlt, FaRobot, FaUsers, FaChartLine,
  FaTerminal, FaServer, FaDatabase, FaLock, FaProjectDiagram
} from 'react-icons/fa';

const NODE_TYPES = {
  default: ({ data }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 text-[10px] min-w-[150px] select-none"
    >
      <Handle type="target" position={Position.Left} className="bg-[#8B7000] w-2 h-2" />
      <div className="flex items-center gap-2 mb-1">
        <data.icon className="text-[#8B0000] text-sm" />
        <strong>{data.label}</strong>
      </div>
      <p className="text-gray-500 text-[9px]">{data.description}</p>
      <Handle type="source" position={Position.Right} className="bg-[#8B0000] w-2 h-2" />
    </motion.div>
  ),
};

const nodes = [
  { id: 'root', type: 'default', position: { x: 0, y: 250 }, data: { label: 'GLYNNE_BUILD_PANEL', icon: FaFolderOpen, description: 'Root del proyecto' }},
  { id: 'core', type: 'default', position: { x: 300, y: 80 }, data: { label: ' core/', icon: FaFolderOpen, description: 'Motor del sistema' }},
  { id: 'agents', type: 'default', position: { x: 300, y: 200 }, data: { label: ' agents/', icon: FaRobot, description: 'Agentes de negocio' }},
  { id: 'user', type: 'default', position: { x: 300, y: 320 }, data: { label: ' user/', icon: FaUsers, description: 'Panel y auth user' }},
  { id: 'dash', type: 'default', position: { x: 300, y: 440 }, data: { label: ' dashboards/', icon: FaChartLine, description: 'Métricas & monitoreo' }},
  { id: 'scripts', type: 'default', position: { x: 300, y: 560 }, data: { label: ' scripts/', icon: FaTerminal, description: 'CLI & mantenimiento' }},
  { id: 'config', type: 'default', position: { x: 650, y: 20 }, data: { label: 'config.py', icon: FaFileAlt, description: 'Env & settings' }},
  { id: 'graph', type: 'default', position: { x: 650, y: 80 }, data: { label: 'graph_manager.py', icon: FaProjectDiagram, description: 'Gestión de flujos' }},
  { id: 'llm', type: 'default', position: { x: 650, y: 140 }, data: { label: 'llm_manager.py', icon: FaRobot, description: 'LLM engine' }},
  { id: 'memory', type: 'default', position: { x: 650, y: 200 }, data: { label: 'memory_manager.py', icon: FaDatabase, description: 'Memoria + contexto' }},
  { id: 'prompt', type: 'default', position: { x: 650, y: 260 }, data: { label: 'prompt_manager.py', icon: FaFileAlt, description: 'Gestión de prompts' }},
  { id: 'panel', type: 'default', position: { x: 650, y: 320 }, data: { label: 'panel.py', icon: FaFileAlt, description: 'APIs internas' }},
  { id: 'api', type: 'default', position: { x: 650, y: 380 }, data: { label: 'api_gateway.py', icon: FaServer, description: 'Router central' }},
  { id: 'schedule', type: 'default', position: { x: 650, y: 440 }, data: { label: 'task_scheduler.py', icon: FaServer, description: 'Jobs en background' }},
  { id: 'auth_core', type: 'default', position: { x: 650, y: 500 }, data: { label: 'auth.py', icon: FaLock, description: 'Permisos core' }},
  { id: 'utils', type: 'default', position: { x: 650, y: 560 }, data: { label: 'utils.py', icon: FaFileAlt, description: 'Helpers' }},
  { id: 'base_agent', type: 'default', position: { x: 950, y: 160 }, data: { label: 'base_agent.py', icon: FaRobot, description: 'Clase base' }},
  { id: 'sales', type: 'default', position: { x: 950, y: 210 }, data: { label: 'sales_agent.py', icon: FaRobot, description: 'Ventas IA' }},
  { id: 'hr', type: 'default', position: { x: 950, y: 260 }, data: { label: 'hr_agent.py', icon: FaRobot, description: 'Recursos humanos' }},
  { id: 'ops', type: 'default', position: { x: 950, y: 310 }, data: { label: 'operations_agent.py', icon: FaRobot, description: 'Operaciones' }},
  { id: 'custom', type: 'default', position: { x: 950, y: 360 }, data: { label: 'custom_agent.py', icon: FaRobot, description: 'Personalizados' }},
  { id: 'user_panel', type: 'default', position: { x: 950, y: 450 }, data: { label: 'panel.py', icon: FaFileAlt, description: 'UI endpoints' }},
  { id: 'user_auth', type: 'default', position: { x: 950, y: 500 }, data: { label: 'auth.py', icon: FaLock, description: 'Login users' }},
  { id: 'act', type: 'default', position: { x: 950, y: 580 }, data: { label: 'agent_activity.py', icon: FaChartLine, description: 'Actividad real-time' }},
  { id: 'tokens', type: 'default', position: { x: 950, y: 630 }, data: { label: 'token_usage.py', icon: FaChartLine, description: 'Consumo tokens' }},
  { id: 'kpis', type: 'default', position: { x: 950, y: 680 }, data: { label: 'business_insights.py', icon: FaChartLine, description: 'KPIs negocio' }},
  { id: 'cli', type: 'default', position: { x: 950, y: 760 }, data: { label: 'CLI.py', icon: FaTerminal, description: 'CLI principal' }},
  { id: 'runner', type: 'default', position: { x: 950, y: 810 }, data: { label: 'cli_runner.py', icon: FaTerminal, description: 'Runner workflows' }},
  { id: 'maint', type: 'default', position: { x: 950, y: 860 }, data: { label: 'maintenance.py', icon: FaTerminal, description: 'Backups + limpieza' }},
  { id: 'main', type: 'default', position: { x: 1250, y: 250 }, data: { label: 'main.py', icon: FaServer, description: 'Backend entrypoint' }},
];

const edges = [
  { id: 'r1', source: 'root', target: 'core', animated: true, style: { stroke: '#8B0000' }},
  { id: 'r2', source: 'root', target: 'agents', animated: true, style: { stroke: '#8B0000' }},
  { id: 'r3', source: 'root', target: 'user', animated: true, style: { stroke: '#8B0000' }},
  { id: 'r4', source: 'root', target: 'dash', animated: true, style: { stroke: '#8B0000' }},
  { id: 'r5', source: 'root', target: 'scripts', animated: true, style: { stroke: '#8B0000' }},
  { id: 'c1', source: 'core', target: 'config', animated: false, style: { stroke: '#ccc' }},
  { id: 'c2', source: 'core', target: 'graph', animated: false, style: { stroke: '#ccc' }},
  { id: 'c3', source: 'core', target: 'llm', animated: false, style: { stroke: '#ccc' }},
  { id: 'c4', source: 'core', target: 'memory', animated: false, style: { stroke: '#ccc' }},
  { id: 'c5', source: 'core', target: 'prompt', animated: false, style: { stroke: '#ccc' }},
  { id: 'c6', source: 'core', target: 'panel', animated: false, style: { stroke: '#ccc' }},
  { id: 'c7', source: 'core', target: 'api', animated: false, style: { stroke: '#ccc' }},
  { id: 'c8', source: 'core', target: 'schedule', animated: false, style: { stroke: '#ccc' }},
  { id: 'c9', source: 'core', target: 'auth_core', animated: false, style: { stroke: '#ccc' }},
  { id: 'c10', source: 'core', target: 'utils', animated: false, style: { stroke: '#ccc' }},
  { id: 'a1', source: 'agents', target: 'base_agent', animated: false, style: { stroke: '#ccc' }},
  { id: 'a2', source: 'agents', target: 'sales', animated: false, style: { stroke: '#ccc' }},
  { id: 'a3', source: 'agents', target: 'hr', animated: false, style: { stroke: '#ccc' }},
  { id: 'a4', source: 'agents', target: 'ops', animated: false, style: { stroke: '#ccc' }},
  { id: 'a5', source: 'agents', target: 'custom', animated: false, style: { stroke: '#ccc' }},
  { id: 'u1', source: 'user', target: 'user_panel', animated: false, style: { stroke: '#ccc' }},
  { id: 'u2', source: 'user', target: 'user_auth', animated: false, style: { stroke: '#ccc' }},
  { id: 'd1', source: 'dash', target: 'act', animated: false, style: { stroke: '#ccc' }},
  { id: 'd2', source: 'dash', target: 'tokens', animated: false, style: { stroke: '#ccc' }},
  { id: 'd3', source: 'dash', target: 'kpis', animated: false, style: { stroke: '#ccc' }},
  { id: 's1', source: 'scripts', target: 'cli', animated: false, style: { stroke: '#ccc' }},
  { id: 's2', source: 'scripts', target: 'runner', animated: false, style: { stroke: '#ccc' }},
  { id: 's3', source: 'scripts', target: 'maint', animated: false, style: { stroke: '#ccc' }},
  { id: 'final', source: 'api', target: 'main', animated: true, style: { stroke: '#8B0000', strokeWidth: 2 }},
];

export default function GlynneAgentFlow() {
  return (
    <div className="w-screen h-screen bg-white overflow-hidden select-none">
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
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnMove={false}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#f3f4f6" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
