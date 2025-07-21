"use client";
import Flow from "@/components/app/Flow";
import StatusBar from "@/components/app/StatusBar";
import { useMemory } from "@/components/memorycontext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { resultsDialog: results, setResultsDialog: setResults } = useMemory();
  return (
    <main className="flex flex-col h-screen">
      <StatusBar />
      <Flow />
      {!results && (
        <Button
          variant="default"
          className="fixed bottom-4 right-4 z-50 rounded-2xl"
          onClick={() => setResults(!results)}
          aria-label="Toggle Results"
        >
          Results
        </Button>
      )}
    </main>
  );
}
