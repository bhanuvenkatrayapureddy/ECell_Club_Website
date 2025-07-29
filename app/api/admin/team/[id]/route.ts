import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { role, department, bio, linkedin, twitter, email, name, avatar } = body

    // First update the user
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
      include: { user: true }
    })

    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      )
    }

    // Update the user first
    await prisma.user.update({
      where: { id: teamMember.userId },
      data: {
        name,
        email,
        avatar: avatar || null
      }
    })

    // Then update the team member
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id: params.id },
      data: {
        role,
        department,
        bio,
        linkedin,
        twitter
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
      data: updatedTeamMember
    })
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Find the team member and get the userId
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
    })
    if (!teamMember) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 })
    }
    // Delete the team member
    await prisma.teamMember.delete({
      where: { id: params.id }
    })
    // Delete the associated user
    await prisma.user.delete({
      where: { id: teamMember.userId }
    })
    return NextResponse.json({
      success: true,
      message: 'Team member and user deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
} 