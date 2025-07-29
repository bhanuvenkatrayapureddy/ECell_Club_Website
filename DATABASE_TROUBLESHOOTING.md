# 🔧 Database Troubleshooting Guide

## 🚨 Common Issues & Solutions

### **1. Database Connection Issues**

#### **Error: "Cannot connect to database"**
```bash
# Check environment variables
echo $DATABASE_URL

# Test connection
npx prisma db pull

# Reset connection
npx prisma generate
```

#### **Solution:**
1. Verify your `.env` file has correct Supabase credentials
2. Ensure DATABASE_URL is properly formatted
3. Check if Supabase project is active

### **2. API Routes Not Working**

#### **Error: "Failed to fetch dashboard data"**
```bash
# Test API endpoints
curl http://localhost:3000/api/admin/stats
curl http://localhost:3000/api/admin/timeline
curl http://localhost:3000/api/admin/events
curl http://localhost:3000/api/admin/team
```

#### **Solution:**
1. Check server logs for detailed error messages
2. Verify Prisma client is generated: `npx prisma generate`
3. Ensure database schema is pushed: `npx prisma db push`

### **3. Data Not Loading**

#### **Issue: Empty dashboard or pages**
```bash
# Check if database has data
npx prisma studio

# Add data through admin dashboard
# Navigate to http://localhost:3000/admin/dashboard
```

#### **Solution:**
1. Add data through the admin dashboard at `/admin/dashboard`
2. Check browser console for API errors
3. Verify API responses in Network tab

### **4. Admin Dashboard Issues**

#### **Error: "Cannot create team member"**
- **Cause**: Missing required fields or user creation issue
- **Solution**: Ensure all required fields are provided (name, email, role, department)

#### **Error: "Cannot update timeline item"**
- **Cause**: Invalid status values or missing fields
- **Solution**: Use valid status values: 'PENDING', 'IN_PROGRESS', 'COMPLETED'

### **5. Schema Mismatch Issues**

#### **Error: "Field does not exist"**
```bash
# Reset database schema
npx prisma db push --force-reset

# Regenerate Prisma client
npx prisma generate
```

#### **Solution:**
1. Ensure schema.prisma matches your database
2. Push schema changes: `npx prisma db push`
3. Regenerate client: `npx prisma generate`

## 🔍 Debug Commands

### **Database Inspection**
```bash
# View database in browser
npx prisma studio

# Check database schema
npx prisma db pull

# Validate schema
npx prisma validate
```

### **API Testing**
```bash
# Test stats endpoint
curl -X GET http://localhost:3000/api/admin/stats

# Test timeline endpoint
curl -X GET http://localhost:3000/api/admin/timeline

# Test events endpoint
curl -X GET http://localhost:3000/api/admin/events

# Test team endpoint
curl -X GET http://localhost:3000/api/admin/team
```

### **Development Server**
```bash
# Start with detailed logging
npm run dev

# Check for TypeScript errors
npx tsc --noEmit
```

## 📊 Data Verification

### **Check Database Tables**
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check user count
SELECT COUNT(*) FROM users;

-- Check event count
SELECT COUNT(*) FROM events;

-- Check timeline items
SELECT COUNT(*) FROM timeline_items;

-- Check team members
SELECT COUNT(*) FROM team_members;
```

### **Verify API Responses**
```javascript
// Test in browser console
fetch('/api/admin/stats')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## 🛠️ Setup Verification

### **1. Environment Variables**
```bash
# Check if .env exists
ls -la .env

# Verify DATABASE_URL format
echo $DATABASE_URL
# Should be: postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

### **2. Dependencies**
```bash
# Check if Prisma is installed
npm list @prisma/client

# Check if Supabase is installed
npm list @supabase/supabase-js
```

### **3. Database Schema**
```bash
# Verify schema is up to date
npx prisma db push

# Check for schema differences
npx prisma db pull
```

## 🚀 Quick Fixes

### **Reset Everything**
```bash
# 1. Clear database
npx prisma db push --force-reset

# 2. Regenerate client
npx prisma generate

# 3. Add data through admin dashboard
# Navigate to http://localhost:3000/admin/dashboard

# 4. Restart server
npm run dev
```

### **Common Fixes**

#### **Fix 1: Database Connection**
```bash
# Update .env with correct credentials
DATABASE_URL="postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### **Fix 2: Missing Dependencies**
```bash
# Install missing packages
npm install @prisma/client @supabase/supabase-js
npm install -D prisma
```

#### **Fix 3: Schema Issues**
```bash
# Reset and regenerate
npx prisma db push --force-reset
npx prisma generate
```

## 📞 Support Steps

### **If Nothing Works:**

1. **Check Supabase Dashboard**
   - Verify project is active
   - Check database connection
   - Verify API keys

2. **Check Environment**
   - Node.js version: `node --version`
   - npm version: `npm --version`
   - Next.js version: `npm list next`

3. **Check Logs**
   - Browser console errors
   - Server terminal errors
   - Network tab responses

4. **Verify Database**
   - Run `npx prisma studio`
   - Check if tables exist
   - Verify data is present

## 🎯 Success Indicators

### **Working Dashboard Should Show:**
- ✅ Real statistics (not 0s)
- ✅ Timeline items with proper status
- ✅ Events with attendee counts
- ✅ Team members with user data
- ✅ CRUD operations working

### **Working API Endpoints:**
- ✅ `/api/admin/stats` returns data
- ✅ `/api/admin/timeline` returns items
- ✅ `/api/admin/events` returns events
- ✅ `/api/admin/team` returns members

### **Working Frontend:**
- ✅ No console errors
- ✅ Data loads on all pages
- ✅ Admin dashboard functional
- ✅ Forms work properly

## 🔄 Recovery Steps

If your database integration is completely broken:

1. **Backup any important data**
2. **Reset database**: `npx prisma db push --force-reset`
3. **Regenerate client**: `npx prisma generate`
4. **Add data through admin dashboard**: Navigate to `/admin/dashboard`
5. **Restart server**: `npm run dev`

This should restore full functionality! 