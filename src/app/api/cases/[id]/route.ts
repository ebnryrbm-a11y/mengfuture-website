import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const caseItem = mockDb.caseStudies.findUnique(id)
  if (!caseItem) {
    return NextResponse.json({ error: '案例不存在' }, { status: 404 })
  }
  return NextResponse.json({ data: caseItem })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updatedCase = mockDb.caseStudies.update(id, body)
    if (!updatedCase) {
      return NextResponse.json({ error: '案例不存在' }, { status: 404 })
    }
    return NextResponse.json({ data: updatedCase })
  } catch (error) {
    return NextResponse.json({ error: '更新失败' }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const success = mockDb.caseStudies.delete(id)
  if (!success) {
    return NextResponse.json({ error: '案例不存在' }, { status: 404 })
  }
  return NextResponse.json({ message: '删除成功' })
}
