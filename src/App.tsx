import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import UI from "./components/UI";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense fallback={"Loading..."}>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
      <title>Home 3D</title>
      <UI />
    </>
  );
}

export default App;
