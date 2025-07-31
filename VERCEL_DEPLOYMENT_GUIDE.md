# Vercel Deployment Guide for E-Cell Website

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab Account**: Your code should be in a Git repository
3. **Supabase Project**: Set up your database (see `NEON_SETUP.md`)

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub/GitLab
2. Ensure all dependencies are in `package.json`
3. Verify your `.env.local` file is properly configured

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the following settings:

#### Environment Variables
Add these in the Vercel dashboard under Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-database-connection-string
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@ecell.com
```

#### Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure your project

## Step 3: Configure Database

1. **Supabase Setup**: 
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update environment variables in Vercel

2. **Database Migration**:
   - Run Prisma migrations on your local machine
   - Or use Supabase's built-in database

## Step 4: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Update `NEXTAUTH_URL` to your custom domain

## Step 5: Verify Deployment

1. Check that all pages load correctly
2. Test admin functionality
3. Verify file uploads work
4. Test database connections

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation
   - Check for missing environment variables

2. **Database Connection Issues**:
   - Ensure `DATABASE_URL` is correct
   - Check Supabase connection settings
   - Verify database migrations are applied

3. **Image Upload Issues**:
   - Check file permissions
   - Verify upload directory exists
   - Ensure proper environment variables

4. **Authentication Issues**:
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Ensure Supabase auth is configured

### Environment Variables Checklist:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `DATABASE_URL`
- [ ] `NEXTAUTH_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `EMAIL_SERVER_HOST`
- [ ] `EMAIL_SERVER_PORT`
- [ ] `EMAIL_SERVER_USER`
- [ ] `EMAIL_SERVER_PASSWORD`
- [ ] `EMAIL_FROM`

## Post-Deployment

1. **Monitor Performance**: Use Vercel Analytics
2. **Set up Monitoring**: Configure error tracking
3. **Backup Strategy**: Regular database backups
4. **SSL Certificate**: Automatically handled by Vercel

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs) 