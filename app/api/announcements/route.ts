import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    const activeOnly = searchParams.get('active') !== 'false'

    // Build where clause
    const where: any = {}
    if (activeOnly) {
      where.isActive = true
    }

    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    return NextResponse.json({
      success: true,
      data: announcements
    })
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, isActive = true, priority = 0 } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content' },
        { status: 400 }
      )
    }

    // Create the announcement
    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        isActive,
        priority
      }
    })

    return NextResponse.json({
      success: true,
      data: announcement
    })
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
}