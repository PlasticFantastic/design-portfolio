// src/components/Background3D.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AmbientSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Плавное вращение и отклик на мышь
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, state.pointer.y * 0.4, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.pointer.x * 0.4, 0.03);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={2.4}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#7c3aed"
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={1.5}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 md:opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#a855f7" />
        <pointLight position={[-10, -10, -5]} color="#ec4899" intensity={3} />
        <AmbientSphere />
      </Canvas>
    </div>
  );
}