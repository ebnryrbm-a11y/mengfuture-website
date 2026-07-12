import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const member = mockDb.teamMembers.findUnique(id)
  if (!member) {
    return NextResponse.json({ error: '团队成员不存在' }, { status: 404 })
  }
  return NextResponse.json({ data: member })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updatedMember = mockDb.teamMembers.update(id, body)
    if (!updatedMember) {
      return NextResponse.json({ error: '团队成员不存在' }, { status: 404 })
    }
    return NextResponse.json({ data: updatedMember })
  } catch (error) {
    return NextResponse.json({ error: '更新失败' }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const success = mockDb.teamMembers.delete(id)
  if (!success) {
    return NextResponse.json({ error: '团队成员不存在' }, { status: 404 })
  }
  return NextResponse.json({ message: '删除成功' })
}
