"use client";
import { Simulator } from "@/lib/caches";
import { FinalResults } from "@/Types/cacheTypes";
import { Info, Play, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useMemory } from "../memorycontext";
import { Button } from "../ui/button";
import Results from "./Results";

export default function StatusBar() {
  const { setResults, setResultsDialog } = useMemory();
  const [info, setInfo] = useState(false);
  return (
    <>
      <div className="w-full h-12 bg-neutral-900 flex items-center gap-5 px-4 py-2">
        <Button
          variant="outline"
          className="hover:cursor-pointer group relative"
          onClick={() => {
            const res: FinalResults[] = [];
            for (let i = 16; i < 256; i *= 2) {
              for (let j = 1; j < 6; j++) {
                const simRes = Simulator(i, j);
                res.push({
                  CPI: Number(simRes.cpi.toFixed(2)),
                  Generator: j,
                  LineSize: i,
                  L1_Hit: Number(simRes.l1_hit),
                  L1_Miss: Number(simRes.l1_miss),
                  L2_Hit: Number(simRes.l2_hit),
                  L2_Miss: Number(simRes.l2_miss),
                  L1_WriteBacks: simRes.l1wb,
                  L2_WriteBacks: simRes.l2wb,

                  L1_MissRate: Number(
                    (simRes.l1_miss / (simRes.l1_hit + simRes.l1_miss)).toFixed(
                      4
                    )
                  ),
                  L2_MissRate: Number(
                    (simRes.l2_miss / (simRes.l2_hit + simRes.l2_miss)).toFixed(
                      4
                    )
                  ),
                });
              }
            }
            res.sort((a, b) => a.Generator - b.Generator);
            console.table(res);

            setResults(res);
            setResultsDialog(true);
          }}
        >
          <Play size={20} color="green" />
          <p>Run Test</p>
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
