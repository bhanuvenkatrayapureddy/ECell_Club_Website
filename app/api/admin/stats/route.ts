import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get dashboard statistics
    const [
      totalMembers,
      upcomingEvents,
      totalViews,
      completedTasks
    ] = await Promise.all([
      // Total members (users with MEMBER or ADMIN role)
      prisma.user.count({
        where: {
          role: {
            in: ['MEMBER', 'ADMIN']
          }
        }
      }),
      
      // Upcoming events
      prisma.event.count({
        where: {
          status: 'UPCOMING'
        }
      }),
      
      // Total page views
      prisma.pageView.count(),
      
      // Completed timeline items
      prisma.timelineItem.count({
        where: {
          status: 'COMPLETED'
        }
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalMembers,
        upcomingEvents,
        totalViews,
        completedTasks
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
} 