import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const clubInfo = await prisma.clubInfo.findMany({
      orderBy: {
        key: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: clubInfo
    })
  } catch (error) {
    console.error('Error fetching club info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch club information' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, description } = body

    if (!key || !value) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      )
    }

    // Check if key already exists
    const existing = await prisma.clubInfo.findUnique({
      where: { key }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Key already exists' },
        { status: 400 }
      )
    }

    const clubInfo = await prisma.clubInfo.create({
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
    console.error('Error creating club info:', error)
    return NextResponse.json(
      { error: 'Failed to create club information' },
      { status: 500 }
    )
  }
} 