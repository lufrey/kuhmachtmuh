import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useRef } from "react";
import * as meshline from "meshline";
import { Scene } from "./Scene";

import Effects from "./Effects";
import { atom } from "nanostores";

extend({
  ...THREE,
  MeshlineMaterial: meshline.MeshLineMaterial,
  Meshline: meshline.MeshLineGeometry,
});

export const searchStore = atom({
  isSearching: false,
});

export const Backdrop: React.FC = () => {
  const dof = useRef(null!);

  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ zoom: 1, position: [0, 0, 200], far: 300, near: 0 }}
        orthographic
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          alpha: true,
          depth: false,
        }}
      >
        {/* <color attach="background" args={["#15803d"]} /> */}
        <color attach="background" args={["#111"]} />
        <Scene />
        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        <Effects ref={dof} />
      </Canvas>
    </Suspense>
  );
};
