import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { key, value, description } = body

    if (!key || !value) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      )
    }

    // Check if key already exists for another record
    const existing = await prisma.clubInfo.findFirst({
      where: {
        key,
        id: { not: params.id }
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Key already exists' },
        { status: 400 }
      )
    }

    const clubInfo = await prisma.clubInfo.update({
      where: { id: params.id },
      data: {
        key,
        value,
        description: description || null
      }
    })

    return NextResponse.json({
      success: true,
      data: clubInfo
    })
  } catch (error) {
    console.error('Error updating club info:', error)
    return NextResponse.json(
      { error: 'Failed to update club information' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.clubInfo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Club information deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting club info:', error)
    return NextResponse.json(
      { error: 'Failed to delete club information' },
      { status: 500 }
    )
  }
} 