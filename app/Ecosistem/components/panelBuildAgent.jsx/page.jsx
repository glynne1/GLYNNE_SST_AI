import AgentConfigPanel from "./componets/panel";
import Console from "./componets/consola";

export default function Page() {
  return (
    <main className="w-screen h-screen bg-white flex p-0 m-0 overflow-hidden">
      {/* Panel 70% */}
      <div className="w-[70%] h-full overflow-y-auto p-6">
        <AgentConfigPanel />
      </div>

      {/* Console 30% */}
      <div className="w-[30%] h-full border-l border-gray-200">
        <Console />
      </div>
    </main>
  );
}
