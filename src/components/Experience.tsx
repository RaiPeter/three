import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  RenderTexture,
  Text,
} from "@react-three/drei";
import { Camping } from "./Camping";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { useEffect, useRef } from "react";
import { Color, MeshBasicMaterial } from "three";
import { Mesh } from "three";
import { RootState, setCurrentPage } from "../features/slice/slice";
import { useDispatch, useSelector } from "react-redux";
import { useFrame } from "@react-three/fiber";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.2);

const Experience = () => {
  const controls = useRef<CameraControls>(null);
  const meshFitCameraHome = useRef<Mesh | null>(null);
  const meshFitCameraStore = useRef<Mesh | null>(null);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const textMaterial = useRef<MeshBasicMaterial | null>(null);
  const dispatch = useDispatch();

  useFrame((_, delta) => {
    if (textMaterial.current) {
      textMaterial.current.opacity = lerp(
        textMaterial.current.opacity,
        currentPage === "home" || currentPage === "intro" ? 1 : 0,
        delta * 1.5
      );
    }
  });

  const intro = async () => {
    controls.current?.dolly(-22);
    if (controls.current) {
      controls.current.smoothTime = 1.6;
    }
    setTimeout(() => {
      dispatch(setCurrentPage("home"));
    }, 1200);
    fitCamera();
  };

  const fitCamera = async () => {
    if (currentPage === "store") {
      console.log(currentPage);

      if (meshFitCameraStore.current) {
      if (controls.current) {
        controls.current.smoothTime = 0.8;
      }
      controls.current?.fitToBox(meshFitCameraStore.current, true);
      }
    } else {
      console.log(currentPage);
      if (meshFitCameraHome.current) {
        if (controls.current) {
          controls.current.smoothTime = 1.6;
        }
        controls.current?.fitToBox(meshFitCameraHome.current, true);
      }
    }
  };

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    fitCamera();
    window.addEventListener("resize", fitCamera);
    return () => {
      window.removeEventListener("resize", fitCamera);
    };
  }, [currentPage]);
  return (
    <>
      <CameraControls ref={controls} />
      <mesh ref={meshFitCameraHome} position-rotateZ={-0.5} visible={false}>
        <boxGeometry args={[9, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
      <Text
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        textAlign="center"
        lineHeight={0.8}
        rotation-y={degToRad(30)}
        anchorY={"bottom"}
        fontWeight={"bold"}
      >
        MY LITTLE{"\n"}CAMPING
        <meshBasicMaterial
          color={bloomColor}
          ref={textMaterial}
          toneMapped={false}
        >
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#fff"]} />
            <Environment preset="sunset" />
            <Float floatIntensity={4} rotationIntensity={5}>
              <Camping
                scale={1.6}
                rotation-y={degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group position-y={degToRad(0)} position-x={3}>
        <Camping scale={0.6} />
        <mesh ref={meshFitCameraStore} visible={false}>
          <boxGeometry args={[4, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group>
      <mesh position-y={-0.5} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};

export default Experience;
