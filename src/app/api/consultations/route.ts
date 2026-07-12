import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET() {
  const consultations = mockDb.consultations.findMany()
  return NextResponse.json({ data: consultations })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newConsultation = mockDb.consultations.create({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      service: body.service,
      message: body.message,
    })
    return NextResponse.json({ data: newConsultation }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '提交失败' }, { status: 400 })
  }
}
