'use client'

import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function HeroModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#A855F7"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[2, 1, -1]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#F97316" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[-1.8, -0.8, 0.5]}>
          <torusGeometry args={[0.25, 0.08, 16, 32]} />
          <meshStandardMaterial color="#6D28D9" metalness={0.6} roughness={0.3} />
        </mesh>

        <mesh position={[0.5, -1.5, -0.5]}>
          <tetrahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#FB923C" metalness={0.7} roughness={0.2} />
        </mesh>

        <mesh position={[-1.5, 1.2, 0.8]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#A855F7" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[1.2, -0.5, 1.2]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#F97316" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}
