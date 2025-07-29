import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const timelineItems = await prisma.timelineItem.findMany({
      include: {
        tasks: true
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: timelineItems
    })
  } catch (error) {
    console.error('Error fetching timeline items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, dueDate, status, order, completedAt } = body

    const timelineItem = await prisma.timelineItem.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status,
        order: order || 0,
        completedAt: status === 'COMPLETED' && completedAt ? new Date(completedAt) : null
      }
    })

    return NextResponse.json({
      success: true,
      data: timelineItem
    })
  } catch (error) {
    console.error('Error creating timeline item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create timeline item' },
      { status: 500 }
    )
  }
} 