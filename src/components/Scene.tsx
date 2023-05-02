import {
  useRef,
  // useState
} from "react";
import ColorLines from "./ColorLines";
// import { useAspect, useTexture } from "@react-three/drei";
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";

export const Scene: React.FC = () => {
  const group = useRef(null!);

  //   const scaleN = useAspect(16, 10, 1.05);
  //   const scaleW = useAspect(22, 10, 1.05);
  //   const textures = useTexture([]);
  //   const subject = useRef(null!);
  //   const layersRef = useRef([]);
  //   const [movementVector] = useState(() => new THREE.Vector3());
  //   const [tempVector] = useState(() => new THREE.Vector3());
  //   const [focusVector] = useState(() => new THREE.Vector3());
  //   const layers = [
  //     { texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
  //     { texture: textures[1], z: 10, factor: 0.005, scale: scaleW },
  //     { texture: textures[2], z: 20, scale: scaleW },
  //     {
  //       texture: textures[3],
  //       z: 30,
  //       ref: subject,
  //       scaleFactor: 0.83,
  //       scale: scaleN,
  //     },
  //     {
  //       texture: textures[4],
  //       factor: 0.03,
  //       scaleFactor: 1,
  //       z: 40,
  //       wiggle: 0.24,
  //       scale: scaleW,
  //     },
  //     {
  //       texture: textures[5],
  //       factor: 0.04,
  //       scaleFactor: 1.3,
  //       z: 49,
  //       wiggle: 0.3,
  //       scale: scaleW,
  //     },
  //   ];

  //   useFrame((state, delta) => {
  // dof.current.target = focusVector.lerp(subject.current.position, 0.05);
  // movementVector.lerp(
  //   tempVector.set(state.pointer.x, state.pointer.y * 0.2, 0),
  //   0.2
  // );
  // group.current.position.x = THREE.MathUtils.lerp(
  //   group.current.position.x,
  //   state.pointer.x * 20,
  //   0.2
  // );
  // group.current.rotation.x = THREE.MathUtils.lerp(
  //   group.current.rotation.x,
  //   state.pointer.y / 10,
  //   0.2
  // );
  // group.current.rotation.y = THREE.MathUtils.lerp(
  //   group.current.rotation.y,
  //   -state.pointer.x / 2,
  //   0.2
  // );
  // layersRef.current[4].uniforms.time.value =
  //   layersRef.current[5].uniforms.time.value += delta;
  //   }, 1);

  return (
    <group ref={group}>
      <ColorLines count={20} radius={200} />
    </group>
  );
};
