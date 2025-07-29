import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'ADMIN' | 'MEMBER' | 'GUEST'
          avatar: string | null
          bio: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'ADMIN' | 'MEMBER' | 'GUEST'
          avatar?: string | null
          bio?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'ADMIN' | 'MEMBER' | 'GUEST'
          avatar?: string | null
          bio?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time: string
          location: string
          capacity: number | null
          status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
          category: string
          attendees: number
          image: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time: string
          location: string
          capacity?: number | null
          status?: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
          category: string
          attendees?: number
          image?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time?: string
          location?: string
          capacity?: number | null
          status?: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
          category?: string
          attendees?: number
          image?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      timeline_items: {
        Row: {
          id: string
          title: string
          description: string
          status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
          dueDate: string | null
          completedAt: string | null
          order: number
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
          dueDate?: string | null
          completedAt?: string | null
          order: number
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
          dueDate?: string | null
          completedAt?: string | null
          order?: number
          createdAt?: string
          updatedAt?: string
        }
      }
      team_members: {
        Row: {
          id: string
          userId: string
          role: string
          department: string
          bio: string | null
          linkedin: string | null
          twitter: string | null
          email: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          userId: string
          role: string
          department: string
          bio?: string | null
          linkedin?: string | null
          twitter?: string | null
          email?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          role?: string
          department?: string
          bio?: string | null
          linkedin?: string | null
          twitter?: string | null
          email?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
    }
  }
} 