'use client';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { CarModel } from './CarModel';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import { Spinner } from '@/components/ui/Spinner';

function PlaceholderCar() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2.2, 0.55, 1.1]} />
        <meshStandardMaterial color="#CC2222" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.1, 0.85, 0]}>
        <boxGeometry args={[1.3, 0.45, 1.0]} />
        <meshStandardMaterial color="#CC2222" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Windows */}
      <mesh position={[0.1, 0.86, 0]}>
        <boxGeometry args={[1.1, 0.35, 0.92]} />
        <meshStandardMaterial color="#0a0a30" metalness={0.1} roughness={0.0} opacity={0.7} transparent />
      </mesh>
      {/* Wheels */}
      {[[-0.85, 0, 0.6], [-0.85, 0, -0.6], [0.85, 0, 0.6], [0.85, 0, -0.6]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z] as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.24, 12]} />
            <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function CarViewer() {
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full bg-bg rounded-xl overflow-hidden">
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[3.5, 1.5, 3.5]} fov={45} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.55}
          autoRotate={false}
          target={[0, 0, 0]}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-5, 3, -3]} intensity={0.4} />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={8} blur={2} />
        <ModelErrorBoundary fallback={<PlaceholderCar />}>
          <Suspense fallback={<PlaceholderCar />}>
            <CarModel />
          </Suspense>
        </ModelErrorBoundary>
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={resetCamera}
          className="px-3 py-1.5 bg-surface/80 backdrop-blur border border-border rounded-lg text-xs text-muted hover:text-white transition-colors font-mono"
        >
          RESET VIEW
        </button>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-muted/60">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
