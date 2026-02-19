import React, { useMemo, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

// DARK OPTIMIZED COLORS
const COLORS = {
  Y_GREEN: "#1b5e20", 
  X_RED: "#b71c1c",   
  Z_BLUE: "#0d47a1",  
  GRID: "#888888"
};

const RealRobot = () => {
  const link0 = useLoader(STLLoader, "/meshes/link0.stl");
  const link1 = useLoader(STLLoader, "/meshes/link1.stl");
  const link2 = useLoader(STLLoader, "/meshes/link2.stl");
  const link3 = useLoader(STLLoader, "/meshes/link3.stl");
  const link4 = useLoader(STLLoader, "/meshes/link4.stl");
  const link5 = useLoader(STLLoader, "/meshes/link5.stl");

  return (
    <group position={[0, 0, 0]} scale={[1000, 1000, 1000]}>
      <mesh geometry={link0}><meshStandardMaterial color="#222222" /></mesh>
      <group position={[0.150, 0, 0.462]}>
        <mesh geometry={link1} position={[-0.150, 0, -0.462]}><meshStandardMaterial color="#0277bd" /></mesh>
        <group position={[0, 0, 0.600]}>
          <mesh geometry={link2} position={[-0.150, 0, -1.062]}><meshStandardMaterial color="#0277bd" /></mesh>
          <group position={[0, 0, 0.190]}>
            <mesh geometry={link3} position={[-0.150, 0, -1.252]}><meshStandardMaterial color="#0277bd" /></mesh>
            <group position={[0.687, 0, 0]}>
              <mesh geometry={link4} position={[-0.837, 0, -1.252]}><meshStandardMaterial color="#d32f2f" /></mesh>
              <group position={[0.101, 0, 0]}>
                <mesh geometry={link5} position={[-0.938, 0, -1.252]}><meshStandardMaterial color="#ffb300" /></mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

const RawWebGLGridLines = () => {
  const vertices = useMemo(() => {
    const pts = [];
    const step = 100;
    const size = 2000; 
    for (let y = -size; y <= size; y += step) pts.push(-size, y, 0, size, y, 0);
    for (let x = -size; x <= size; x += step) pts.push(x, -size, 0, x, size, 0);
    for (let z = 0; z <= 3000; z += step) pts.push(-size, size, z, size, size, z);
    for (let x = -size; x <= size; x += step) pts.push(x, size, 0, x, size, 3000);
    for (let z = 0; z <= 3000; z += step) pts.push(-size, -size, z, -size, size, z);
    for (let y = -size; y <= size; y += step) pts.push(-size, y, 0, -size, y, 3000);
    return new Float32Array(pts);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={vertices.length / 3} array={vertices} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={COLORS.GRID} transparent opacity={0.4} /> 
    </lineSegments>
  );
};

const WorldCoordinates = () => {
  const labels = [];
  const step = 100; 
  const fontSize = 35; 
  const axisLabelSize = 120;

  labels.push(
    <Billboard key="center-y-label" position={[0, -2250, 0]}>
      <Text fontSize={axisLabelSize} color={COLORS.Y_GREEN} fontWeight="bold" outlineWidth={3}>Y</Text>
    </Billboard>
  );
  labels.push(
    <Billboard key="center-x-label" position={[2250, 0, 0]}>
      <Text fontSize={axisLabelSize} color={COLORS.X_RED} fontWeight="bold" outlineWidth={3}>X</Text>
    </Billboard>
  );
  labels.push(
    <Billboard key="center-z-label" position={[2150, 2150, 1500]}>
      <Text fontSize={axisLabelSize} color={COLORS.Z_BLUE} fontWeight="bold" outlineWidth={3}>Z</Text>
    </Billboard>
  );

  for (let i = -2000; i <= 2000; i += step) {
    labels.push(
      <Billboard key={`y-num-${i}`} position={[i, -2080, 0]}>
        <Text fontSize={fontSize} color={COLORS.Y_GREEN} fontWeight="bold">{i}</Text>
      </Billboard>
    );
    if (i !== 0) { 
      labels.push(
        <Billboard key={`x-num-${i}`} position={[2080, i, 0]}>
          <Text fontSize={fontSize} color={COLORS.X_RED} fontWeight="bold">{i}</Text>
        </Billboard>
      );
    }
  }
  for (let z = 100; z <= 3000; z += step) { 
    labels.push(
      <Billboard key={`z-num-${z}`} position={[2080, 2080, z]}>
        <Text fontSize={fontSize} color={COLORS.Z_BLUE} fontWeight="bold">{z}</Text>
      </Billboard>
    );
  }

  return <group>{labels}</group>;
};

const RobotScene = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#d1d9e0", position: "relative" }}>
      
      {/* SCENE CONFIG UI DIV WAS REMOVED FROM HERE */}

      <Canvas camera={{ position: [0, -5000, 2500], up: [0, 0, 1], fov: 45, near: 1, far: 25000 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2000, -2000, 5000]} intensity={1.5} />
        <directionalLight position={[-1000, -1000, 1000]} intensity={0.5} />

        <OrbitControls 
          makeDefault 
          target={[0, 0, 500]} 
          maxDistance={10000} 
          minDistance={200}  
        />

        <group>
          <RawWebGLGridLines />
          <WorldCoordinates /> 
        </group>
        
        <Suspense fallback={null}>
          <group rotation={[0, 0, -Math.PI / 2]}>
            <RealRobot />
          </group>
        </Suspense>

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={[COLORS.X_RED, COLORS.Y_GREEN, COLORS.Z_BLUE]} labelColor="white" />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};

export default RobotScene;