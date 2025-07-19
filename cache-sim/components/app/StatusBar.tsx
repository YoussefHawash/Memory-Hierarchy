"use client";
import { Info, Play, StopCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Results from "./Results";
export default function StatusBar() {
  const [info, setInfo] = useState(false);
  const [running, setRunning] = useState(false);
  return (
    <>
      <div className="w-full h-12 bg-neutral-900 flex items-center gap-5 px-4 py-2">
        <h1 className="text-lg font-bold">Memory Hierarchy Simulator</h1>
        <Button
          variant="outline"
          className="hover:cursor-pointer group relative"
          onClick={() => setRunning(!running)}
        >
          {!running ? (
            <Play size={20} color="green" />
          ) : (
            <StopCircle size={20} color="red" />
          )}
          <p>{running ? "Pause" : "Run Test"}</p>
        </Button>
        <Results />
        <div className="flex-1" />
        <div
          className="flex items-center space-x-2 hover:cursor-pointer"
          onClick={() => setInfo(!info)}
        >
          <Info size={20} className="text-neutral-400" />
        </div>
      </div>
      {info && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-2xl w-[90%] max-w-lg space-y-4 border border-neutral-700">
            <div>
              <h3 className="text-lg font-bold mb-1">
                🧠 Cache Simulator Info
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                This tool simulates cache memory behavior. Choose a memory
                access pattern, configure the cache, and run the simulation to
                analyze hit/miss ratios.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-1 text-neutral-200">
                Access Patterns:
              </h4>
              <ul className="text-md text-neutral-400 list-disc pl-5 space-y-1">
                <li>
                  <b className="text-white">Generator 1:</b> Sequential access
                  across the entire memory. Ideal for streaming workloads.
                </li>
                <li>
                  <b className="text-white">Generator 2:</b> Random access
                  within 24 KB. Models tight loops and hot data.
                </li>
                <li>
                  <b className="text-white">Generator 3:</b> Fully random access
                  across 64 MB. Simulates unpredictable workloads like hashing.
                </li>
                <li>
                  <b className="text-white">Generator 4:</b> Sequential access
                  within 4 KB. Mimics stack or small buffer usage.
                </li>
                <li>
                  <b className="text-white">Generator 5:</b> 32-byte strided
                  access over 1 MB. Reflects patterns in matrix or media
                  operations.
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={() => setInfo(false)}
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
