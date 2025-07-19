import { Handle, Position } from "@xyflow/react";

export function CacheNode({ data }: any) {
  const total = data.Size / data.lineSize;

  const headCount = 3;
  const tailCount = 2;

  const indicesToShow = [
    ...Array.from({ length: headCount }, (_, i) => i),
    "...",
    ...Array.from({ length: tailCount }, (_, i) => total - tailCount + i),
  ];

  return (
    <>
      <div className="flex items-center mb-1">
        <h1 className=" ml-1"> {data.label}</h1>
      </div>
      <div className="flex flex-col relative  border-neutral-500 border-1 rounded shadow p-3 ">
        <div className="absolute inset-0 w-full h-full bg-neutral-900 opacity-90 -z-10" />
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          className="!bg-transparent !border-none !opacity-0 w-4 h-4"
          isConnectable={false}
        />
        {data.label === "L1 Cache" ? (
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            className="!bg-transparent !border-none !opacity-0 w-4 h-4"
            isConnectable={false}
          />
        ) : (
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            className="!bg-transparent !border-none !opacity-0 w-4 h-4"
            isConnectable={false}
          />
        )}

        {indicesToShow.map((index, rowIdx) => {
          if (index === "...") {
            return (
              <div
                key={`dots-${rowIdx}`}
                className="text-[8px] text-neutral-500 text-center py-0.5"
              >
                ...
              </div>
            );
          }

          const rowColor =
            rowIdx % 2 === 0 ? "bg-neutral-700" : "bg-neutral-800";

          return (
            <div
              key={index}
              className={`flex items-center h-2 text-xs text-neutral-400`}
            >
              <span className="w-10 text-right pr-1 text-[8px]">{index}</span>
              {Array.from({ length: data.ways }).map((_, i) => (
                <div key={i} className={`flex-1 h-full mr-2 w-8 ${rowColor}`} />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
