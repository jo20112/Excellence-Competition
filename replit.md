# Admin Leaderboard System

## Overview
This is a full-stack Admin Leaderboard application built with React, Express, TypeScript, and Supabase. It's designed to track and manage admin performance with points, attendance, and rewards.

## Current Status
✅ Successfully imported and configured for Replit environment  
✅ Node.js dependencies installed  
✅ Development server running on port 5000  
✅ Supabase credentials configured  
✅ Deployment settings configured  
✅ Competition cycles implemented (10-day cycles from Oct 1-30, 2025)  
✅ Privacy settings configured - sensitive data hidden from public view  

## Tech Stack
- **Frontend**: React + Vite, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Express, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for avatar images)

## Project Structure
- `client/` - React frontend application
- `server/` - Express backend server
- `shared/` - Shared TypeScript types and schemas
- `attached_assets/` - Static assets

## Important Next Steps

### 1. Set Up Supabase Database Tables
You need to run the SQL setup script in your Supabase Dashboard:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Copy the contents of `supabase_setup.sql` and paste it
5. Click **Run** to create all tables and policies

This will create:
- `admins` table - Admin data
- `admin_actions` table - Action logs
- `rewards` table - Rewards history
- Storage bucket for avatar images
- Row Level Security policies

### 2. Create Admin User in Supabase
1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter email and password for the admin account
4. Save the credentials - you'll use them to login

### 3. How to Use
- **Public View**: Visit the homepage to see the leaderboard (read-only)
- **Admin Access**: Click the login button, enter admin credentials to manage points and admins

## Available Commands
```bash
npm run dev      # Run development server
npm run build    # Build for production
npm start        # Run production server
npm run db:push  # Push database schema changes (Drizzle)
```

## Environment Variables
The following are configured:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `DATABASE_URL` - Replit PostgreSQL database

## Features
- 🏆 Leaderboard with top 3 podium display
- 📊 Points tracking and management
- 👥 Admin management with avatars
- 📅 Attendance and delay tracking
- 🎁 Automated rewards system (every 10 days)
- 🌙 Dark mode support
- 🇸🇦 Full Arabic RTL interface
- 🔒 Privacy-first design: attendance/delays/absences visible only to admins

## Competition System
- **Duration**: October 1-30, 2025 (ends at 11:59 PM)
- **Cycles**: 10-day competition cycles for winner selection
- **Countdown Timer**: Displays remaining days in current cycle (10→1→resets)
- **Edge Case Handling**: Correctly handles dates before competition start

## Security & Privacy
- **Public View** (`/`): Shows only names and points (uses `fetchPublicAdmins()`)
- **Admin View** (`/admin`): Full data access including attendance metrics (uses `fetchAdmins()`)
- **Network Security**: Sensitive fields (attendance, delays, absences) never sent to public API responses
- **Authentication**: Supabase Auth protects admin routes

## Notes
- The app is fully functional on Replit
- Make sure to complete the Supabase database setup to enable data persistence
- The current interface shows placeholder data until Supabase tables are created
- Unused file: `Dashboard.tsx` exists but is not routed (can be safely ignored or removed)
