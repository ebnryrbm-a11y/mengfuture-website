import { NextResponse } from 'next/server'
import { mockDb } from '@/lib/mock-data'

export async function GET() {
  const team = mockDb.teamMembers.findMany()
  return NextResponse.json({ data: team })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newMember = mockDb.teamMembers.create({
      name: body.name,
      role: body.role,
      description: body.description,
      avatarUrl: body.avatarUrl,
      socialLinks: body.socialLinks,
      sortOrder: body.sortOrder || 0,
    })
    return NextResponse.json({ data: newMember }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建失败' }, { status: 400 })
  }
}
