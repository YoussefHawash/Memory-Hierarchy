import Flow from "@/components/app/Flow";
import StatusBar from "@/components/app/StatusBar";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <StatusBar />
      <Flow />
    </main>
  );
}
