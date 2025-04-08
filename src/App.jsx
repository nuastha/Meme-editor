import Canvas from "./components/Canvas";
import { SettingsPanel } from "./components/Control";
import Header from "./components/header/Header";
import { CanvasProvider } from "./context/CanvasContext";

function App() {
  return (
    <>
      <Header />
      <CanvasProvider>
        <main className="">
          <div className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-wrap gap-4 container mx-auto justify-center">
            <Canvas />
            <SettingsPanel />
          </div>
        </main>
      </CanvasProvider>
    </>
  );
}

export default App;
