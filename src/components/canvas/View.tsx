'use client'

import { Suspense, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color }: { color?: string }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.4} />
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    <pointLight position={[-10, -10, -10]} color='#A855F7' decay={0.2} />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
)

export function View({ children, orbit, className = 'w-full h-full' }: { children: React.ReactNode; orbit?: boolean; className?: string }) {
  const localRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={localRef} className={className} />
      <Three>
        <ViewImpl track={localRef as unknown as React.MutableRefObject<HTMLElement>}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
}
