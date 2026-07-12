import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET() {
  const cases = mockDb.caseStudies.findMany()
  return NextResponse.json({ data: cases })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newCase = mockDb.caseStudies.create({
      title: body.title,
      category: body.category,
      description: body.description,
      content: body.content,
      imageUrl: body.imageUrl,
      tags: body.tags,
      featured: body.featured || false,
    })
    return NextResponse.json({ data: newCase }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建失败' }, { status: 400 })
  }
}
