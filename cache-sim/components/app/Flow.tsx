"use client";
import {
  Background,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { CPUNode } from "./CPU";
import { CacheNode } from "./Caches";
import { MemoryNode } from "./Memory";

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: -600 },
    data: { label: "CPU" },
    type: "CPUNodeType",
    sourceHandle: "a",
    targetHandle: "b",
  },
  {
    id: "n2",
    position: { x: 0, y: -500 },
    data: { label: "L1 Cache", Size: 16000, ways: 4, lineSize: 16 },
    type: "MemoryNodeType",
    sourceHandle: "b",
    targetHandle: "a",
  },
  {
    id: "n3",
    position: { x: 0, y: -350 },
    data: { label: "L2 Cache", Size: 128000, ways: 8, lineSize: 64 },
    type: "MemoryNodeType",
    sourceHandle: "b",
    targetHandle: "a",
  },
  {
    id: "n4",
    position: { x: 500, y: -500 },
    data: {
      label: "Memory",
      Size: 64 * 1024 * 1024 * 1024,
      ways: 1,
      lineSize: 1,
    },
    type: "MainMemoryNodeType",
    sourceHandle: "b",
    targetHandle: "a",
  },
];
const NodeType = {
  CPUNodeType: CPUNode,
  MemoryNodeType: CacheNode,
  MainMemoryNodeType: MemoryNode,
};
const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n2-n3", source: "n2", target: "n3" },
  { id: "n3-n4", source: "n3", target: "n4" },
];

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="w-screen h-[calc(100vh-40px)]">
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={NodeType}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        panOnDrag={false}
        defaultEdgeOptions={{ animated: true, style: { stroke: "white" } }}
      >
        <Background size={0.5} bgColor="black" />
      </ReactFlow>
    </div>
  );
}
