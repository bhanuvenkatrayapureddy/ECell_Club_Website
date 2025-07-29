import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Department name is required' },
        { status: 400 }
      )
    }

    const department = await prisma.department.update({
      where: { id: params.id },
      data: {
        name,
        description: description || null
      }
    })

    return NextResponse.json({
      success: true,
      data: department
    })
  } catch (error) {
    console.error('Error updating department:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update department' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if any team members are using this department
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        department: {
          equals: (await prisma.department.findUnique({ where: { id: params.id } }))?.name
        }
      }
    })

    if (teamMembers.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete department. ${teamMembers.length} team member(s) are assigned to this department.` 
        },
        { status: 400 }
      )
    }

    await prisma.department.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Department deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting department:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete department' },
      { status: 500 }
    )
  }
} 