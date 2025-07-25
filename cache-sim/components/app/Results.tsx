"use client";
import { useMemory } from "../memorycontext";
import { Button } from "../ui/button";
import { CpiLineChart } from "./Chart";

export default function Results() {
  const { resultsDialog, setResultsDialog } = useMemory();

  return (
    <div>
      {resultsDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg shadow-lg p-8  w-2xl relative">
            <Button
              variant="ghost"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setResultsDialog(false)}
              aria-label="Close"
            >
              &times;
            </Button>
            <h1 className="text-2xl font-bold mb-4">Simulation Results</h1>
            <CpiLineChart />
          </div>
        </div>
      )}
    </div>
  );
}
