import "./App.css";
import PetCanvas from "./components/pet-canvas";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const greet = async () => {
    console.log("尝试调用 greet...");
    const res = await invoke("greet", { name: "World" });
    console.log(res);
  };
  const updateState = async () => {
    try {
      await invoke("my_custom_command");
      console.log("状态更新成功！");
    } catch (error) {
      console.error("更新失败:", error);
    }
  };
  return (
    <>
      <PetCanvas />
      <div>
        <button onClick={async () => await greet()}>c1</button>
        <button onClick={async () => await updateState()}>c2</button>
      </div>
    </>
  );
}

export default App;
