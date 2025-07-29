import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    // Transform events to include attendee count
    const eventsWithAttendees = events.map(event => ({
      ...event,
      attendees: event.registrations.length,
      capacity: event.capacity || 0
    }))

    return NextResponse.json({
      success: true,
      data: eventsWithAttendees
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, date, time, location, capacity, status, category, image, registrationUrl } = body

    // Validate required fields
    if (!title || !description || !date || !time || !location || !category) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          details: 'Title, description, date, time, location, and category are required'
        },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        capacity: parseInt(capacity) || 0,
        status,
        category,
        image: image || null,
        registrationUrl: registrationUrl || null
        // attendees has a default value of 0 in the schema
      }
    })

    return NextResponse.json({
      success: true,
      data: event
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create event',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 