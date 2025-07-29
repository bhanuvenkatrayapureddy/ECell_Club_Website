import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: teamMembers
    })
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role, department, bio, linkedin, twitter, avatar } = body

    // First create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: 'MEMBER',
        avatar: avatar || null
      }
    })

    // Then create the team member
    const teamMember = await prisma.teamMember.create({
      data: {
        userId: user.id,
        role,
        department,
        bio,
        linkedin,
        twitter,
        email
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: teamMember
    })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create team member' },
      { status: 500 }
    )
  }
} 