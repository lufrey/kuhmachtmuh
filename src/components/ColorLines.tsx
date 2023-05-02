import * as THREE from "three";
import { useRef, useMemo } from "react";
import { type Object3DNode, useFrame } from "@react-three/fiber";
import type * as meshline from "meshline";
import { useStore } from "@nanostores/react";
import { searchStore } from "./Backdrop";

const r = () => Math.max(0.2, Math.random());

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshline: Object3DNode<
      meshline.MeshLineGeometry,
      typeof meshline.MeshLineGeometry
    >;
    meshlineMaterial: Object3DNode<
      meshline.MeshLineMaterial,
      typeof meshline.MeshLineMaterial
    >;
  }
}

interface HslColor {
  h: number;
  s: number;
  l: number;
}

const getColor: () => HslColor = () => {
  return {
    h: 360 * Math.random(),
    s: 70 + 30 * Math.random(),
    l: 50,
  };
};

const makeThreeColor = (color: HslColor) =>
  new THREE.Color(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);

const Line: React.FC<{
  curve: THREE.Vector3[];
  color: HslColor;
}> = ({ curve, color }) => {
  const material = useRef<meshline.MeshLineMaterial>(null!);
  const colorRef = useRef(color);
  const search = useStore(searchStore);

  const colorDelta = Math.random() * 2 - 1;

  useFrame((_, delta) => {
    // @ts-expect-error everything is ok
    material.current.uniforms.dashOffset.value -=
      delta / (search.isSearching ? 50 : 300);
    material.current.color = makeThreeColor(colorRef.current);
    colorRef.current.h =
      (colorRef.current.h + delta * 30 * colorDelta + 360) % 360;
  });

  return (
    <mesh>
      <meshline attach="geometry" points={curve as unknown as number[]} />
      <meshlineMaterial
        attach="material"
        ref={material}
        transparent
        lineWidth={1}
        color={makeThreeColor(color)}
        dashArray={0.03}
        dashRatio={0.98}
      />
    </mesh>
  );
};

export default function ColorLines({
  count,
  radius = 10,
}: {
  count: number;
  radius?: number;
}) {
  const lines = useMemo(
    () =>
      new Array(count).fill(undefined).map((_) => {
        const pos = new THREE.Vector3(
          Math.sin(0) * radius * r() * r(),
          Math.cos(0) * radius * r() * r(),
          0
        );
        const points = new Array(30).fill(undefined).map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          return pos
            .add(
              new THREE.Vector3(
                Math.sin(angle) * radius * r(),
                Math.cos(angle) * radius * r(),
                0
              )
            )
            .clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(100);
        return {
          color: getColor(),
          curve,
        };
      }),
    [count, radius]
  );

  return (
    <group position={[-radius * 2, -radius, 0]}>
      {lines.map((props, index) => (
        <Line key={index} {...props} />
      ))}
    </group>
  );
}
