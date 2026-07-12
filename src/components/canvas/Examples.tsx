'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const Blob = ({ route = '/', ...props }: { route?: string; [key: string]: unknown }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? '#F97316' : '#A855F7'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }: { route?: string; [key: string]: unknown }) => {
  const mesh = useRef<THREE.Group>(null)
  const router = useRouter()
  const [hovered, hover] = useState(false)
  const points = useMemo(
    () => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100),
    []
  )

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
      mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
      mesh.current.rotation.z -= delta / 4
    }
  })

  return (
    <group ref={mesh} {...props}>
      <Line worldUnits points={points} color='#A855F7' lineWidth={0.15} />
      <Line worldUnits points={points} color='#A855F7' lineWidth={0.15} rotation={[0, 0, 1]} />
      <Line worldUnits points={points} color='#A855F7' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0.5} color={hovered ? '#F97316' : '#A855F7'} />
      </mesh>
    </group>
  )
}

export function Duck(props: { [key: string]: unknown }) {
  const { scene } = useGLTF('/duck.glb')
  useFrame((_, delta) => (scene.rotation.y += delta))
  return <primitive object={scene} {...props} />
}

export function Dog(props: { [key: string]: unknown }) {
  const { scene } = useGLTF('/dog.glb')
  return <primitive object={scene} {...props} />
}
