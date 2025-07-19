// Node.tsx
import { Handle, Position } from "@xyflow/react";
import { Cpu } from "lucide-react";

export function CPUNode({ data }: any) {
  return (
    <div className=" rounded shadow">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        className="!bg-transparent !border-none !opacity-0 w-4 h-4"
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="!bg-transparent !border-none !opacity-0 w-4 h-4"
        isConnectable={false}
      />
      <div>
        <Cpu color="grey" size={32} />
      </div>
    </div>
  );
}
