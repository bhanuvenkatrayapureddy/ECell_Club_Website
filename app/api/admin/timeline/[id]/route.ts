import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, status, dueDate, order, completedAt } = body

    const timelineItem = await prisma.timelineItem.update({
      where: { id: params.id },
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        order: order || 0,
        completedAt: status === 'COMPLETED' && completedAt ? new Date(completedAt) : 
                   status === 'COMPLETED' ? new Date() : null
      }
    })

    return NextResponse.json({
      success: true,
      data: timelineItem
    })
  } catch (error) {
    console.error('Error updating timeline item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update timeline item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.timelineItem.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Timeline item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting timeline item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete timeline item' },
      { status: 500 }
    )
  }
} 