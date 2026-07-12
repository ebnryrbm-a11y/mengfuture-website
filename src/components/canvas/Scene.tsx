'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3fOut } from '@/helpers/global'
import * as THREE from 'three'

const R3fOutComponent = r3fOut

export default function Scene({ ...props }) {
  return (
    <Canvas
      {...props}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.AgXToneMapping
        state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <R3fOutComponent />
      <Preload all />
    </Canvas>
  )
}
