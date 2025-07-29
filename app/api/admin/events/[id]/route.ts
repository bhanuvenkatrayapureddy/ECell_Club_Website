import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, date, time, location, capacity, status, category, image, registrationUrl } = body

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        capacity: parseInt(capacity),
        status,
        category,
        image: image || null,
        registrationUrl: registrationUrl || null
      }
    })

    return NextResponse.json({
      success: true,
      data: event
    })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    )
  }
} 