# 🚀 Neon Database Setup Guide for E-Cell Website

> **Note:** Neon is now the recommended Postgres provider for new setups. Supabase is supported as an option or for legacy projects. See DATABASE_INTEGRATION_GUIDE.md for the latest instructions.

## 📋 Prerequisites
- Node.js installed
- Neon account (free) or Supabase account (optional)
- Git repository

## 🎯 Step-by-Step Setup

### 1. Create Neon Project

1. **Go to [neon.tech](https://neon.tech/)**
2. **Sign up/Login**
3. **Create New Project** (choose region, name, etc.)
4. **Copy your connection string** (URI format)

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```env
# Neon Configuration (recommended)
DATABASE_URL="postgresql://username:password@ep-xxxx.us-east-2.aws.neon.tech/dbname?sslmode=require"

# (Optional) Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Email Configuration (for notifications)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@ecell.com
```

**Replace the placeholders:**
- `username`, `password`, `ep-xxxx...`, `dbname`: from your Neon dashboard
- `your-anon-key-here`: Your Supabase anon public key (if using Supabase)
- `your-nextauth-secret-here`: Generate with `openssl rand -base64 32`

### 3. Generate Prisma Client

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Test the Connection

Create a test API route to verify everything works:

```typescript
// app/api/test-db/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
```

## 🗄️ Database Schema Overview

### Tables Created:

1. **users** - User accounts and profiles
2. **sessions** - User sessions for authentication
3. **events** - Event information and details
4. **event_registrations** - Event registration tracking
5. **posts** - Blog/news articles
6. **pages** - Static page content
7. **timeline_items** - Project timeline items
8. **timeline_tasks** - Individual tasks within timeline items
9. **projects** - Project management
10. **team_members** - Team member profiles
11. **departments** - Department information
12. **page_views** - Analytics tracking
13. **event_analytics** - Event performance metrics

## 🚀 Next Steps

### 1. Implement Authentication
- Set up NextAuth.js (optional)
- Create login/register pages
- Add role-based access control

### 2. Create API Routes
- Event management APIs
- User management APIs
- Content management APIs

### 3. Update Frontend
- Connect pages to database
- Add real-time updates
- Implement admin dashboard

### 4. Add Features
- Image upload (local or cloud)
- Email notifications
- Analytics dashboard
- Multi-language support

## 🛠️ Useful Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Reset database (careful!)
npx prisma db push --force-reset

# Open Prisma Studio
npx prisma studio

# Run migrations
npx prisma migrate dev

# Deploy migrations
npx prisma migrate deploy
```

## 🔍 Troubleshooting

### Common Issues:

1. **Connection Error**: Check DATABASE_URL format
2. **Schema Sync Issues**: Run `npx prisma db push`
3. **Client Generation**: Run `npx prisma generate`

### Getting Help:
- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

## 🎉 Success!

Once you've completed these steps, your E-Cell website will have:
- ✅ Full database integration
- ✅ User authentication ready
- ✅ Event management system
- ✅ Content management
- ✅ Analytics tracking
- ✅ Team management
- ✅ Timeline tracking

Your website is now ready for the advanced features listed in your README! 