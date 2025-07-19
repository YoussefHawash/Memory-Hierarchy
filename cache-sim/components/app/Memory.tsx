import { Handle, Position } from "@xyflow/react";

export function MemoryNode({ data }: any) {
  const total = data.Size / data.lineSize;

  const headCount = 10;
  const tailCount = 1;

  const indicesToShow = [
    ...Array.from({ length: headCount }, (_, i) => i),
    "...",
    ...Array.from({ length: tailCount }, (_, i) => total - tailCount + i),
  ];

  return (
    <>
      <div className="flex items-center mb-2">
        <h1 className=" ml-1"> {data.label}</h1>
      </div>
      <div className="flex flex-col relative  border-neutral-500 border-1 rounded shadow p-3 ">
        <div className="absolute inset-0 w-full h-full bg-neutral-900 opacity-90 -z-10" />
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          className="!bg-transparent !border-none !opacity-0 w-4 h-4"
          isConnectable={false}
        />

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

          const rowColor = 700 + (rowIdx % 2) * 100;

          return (
            <div
              key={index}
              className={`flex items-center h-3 text-xs text-neutral-400`}
            >
              <span className="w-8 text-right pr-2 text-[8px]">
                {typeof index === "number" && index > 100 ? "64GB" : index}
              </span>
              {Array.from({ length: data.ways }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full mr-2 w-36 bg-neutral-${rowColor}`}
                />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
