'use client'

import { r3fIn } from '@/helpers/global'

const R3fInComponent = r3fIn

export const Three = ({ children }: { children: React.ReactNode }) => {
  return <R3fInComponent>{children}</R3fInComponent>
}
