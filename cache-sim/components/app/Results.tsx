import { useState } from "react";
import { Button } from "../ui/button";
import { ChartLineDots } from "./Chart";

export default function Results() {
  const [open, setOpen] = useState(false);

  // Example data for charts
  const data = [
    { name: "Hits", value: 70 },
    { name: "Misses", value: 30 },
  ];

  return (
    <div>
      <Button
        variant="outline"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Results"
      >
        Show Previous Results
      </Button>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg shadow-lg p-8  w-2xl relative">
            <Button
              variant="ghost"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </Button>
            <h1 className="text-2xl font-bold mb-4">Simulation Results</h1>
            <ChartLineDots />
          </div>
        </div>
      )}
    </div>
  );
}
