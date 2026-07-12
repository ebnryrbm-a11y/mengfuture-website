import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const consultation = mockDb.consultations.findUnique(id)
  if (!consultation) {
    return NextResponse.json({ error: '咨询记录不存在' }, { status: 404 })
  }
  return NextResponse.json({ data: consultation })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updatedConsultation = mockDb.consultations.update(id, body)
    if (!updatedConsultation) {
      return NextResponse.json({ error: '咨询记录不存在' }, { status: 404 })
    }
    return NextResponse.json({ data: updatedConsultation })
  } catch (error) {
    return NextResponse.json({ error: '更新失败' }, { status: 400 })
  }
}
