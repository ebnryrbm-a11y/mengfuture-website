import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET() {
  const services = mockDb.services.findMany()
  return NextResponse.json({ data: services })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newService = mockDb.services.create({
      title: body.title,
      icon: body.icon,
      description: body.description,
      content: body.content,
      imageUrl: body.imageUrl,
      features: body.features,
      price: body.price || null,
      sortOrder: body.sortOrder || 0,
    })
    return NextResponse.json({ data: newService }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建失败' }, { status: 400 })
  }
}
