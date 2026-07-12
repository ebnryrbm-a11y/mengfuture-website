import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const service = mockDb.services.findUnique(id)
  if (!service) {
    return NextResponse.json({ error: '服务不存在' }, { status: 404 })
  }
  return NextResponse.json({ data: service })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updatedService = mockDb.services.update(id, body)
    if (!updatedService) {
      return NextResponse.json({ error: '服务不存在' }, { status: 404 })
    }
    return NextResponse.json({ data: updatedService })
  } catch (error) {
    return NextResponse.json({ error: '更新失败' }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const success = mockDb.services.delete(id)
  if (!success) {
    return NextResponse.json({ error: '服务不存在' }, { status: 404 })
  }
  return NextResponse.json({ message: '删除成功' })
}
