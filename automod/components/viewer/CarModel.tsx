'use client';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useBuildStore } from '@/lib/store/buildStore';
import type {
  MaterialSwapPayload,
  MeshTogglePayload,
  RideHeightPayload,
} from '@/lib/types';

const MODEL_PATH = '/models/astra-j.glb';

function applyMaterialSwap(scene: THREE.Group, payload: MaterialSwapPayload) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name === payload.mesh) {
      const mat = (child.material as THREE.MeshStandardMaterial).clone();
      mat.color.set(payload.color);
      mat.metalness  = payload.metalness  ?? 0.5;
      mat.roughness  = payload.roughness  ?? 0.5;
      if (payload.transparent) {
        mat.transparent = true;
        mat.opacity     = payload.opacity ?? 0.5;
      }
      mat.needsUpdate = true;
      child.material  = mat;
    }
  });
}

function applyMeshToggle(scene: THREE.Group, payload: MeshTogglePayload) {
  scene.traverse((child) => {
    if (payload.show.includes(child.name)) child.visible = true;
    if (payload.hide.includes(child.name)) child.visible = false;
  });
}

function applyRideHeight(scene: THREE.Group, payload: RideHeightPayload) {
  scene.position.y = payload.delta;
}

function resetScene(scene: THREE.Group) {
  scene.position.y = 0;
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.visible = true;
    }
  });
}

export function CarModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const sceneRef   = useRef<THREE.Group>(null);
  const selectedParts = useBuildStore((s) => s.selectedParts);

  useEffect(() => {
    if (!sceneRef.current) return;
    resetScene(sceneRef.current);
    selectedParts.forEach((part) => {
      if (!sceneRef.current) return;
      if (part.mod_type === 'material_swap')
        applyMaterialSwap(sceneRef.current, part.mod_payload as MaterialSwapPayload);
      if (part.mod_type === 'mesh_toggle')
        applyMeshToggle(sceneRef.current, part.mod_payload as MeshTogglePayload);
      if (part.mod_type === 'ride_height')
        applyRideHeight(sceneRef.current, part.mod_payload as RideHeightPayload);
    });
  }, [selectedParts]);

  return (
    <primitive
      ref={sceneRef}
      object={scene}
      scale={1}
      position={[0, -0.5, 0]}
    />
  );
}

useGLTF.preload(MODEL_PATH);
