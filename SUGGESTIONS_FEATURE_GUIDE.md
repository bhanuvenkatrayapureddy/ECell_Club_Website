# Idea Suggestions Feature Guide

## Overview
The Idea Suggestions feature allows users to submit innovative ideas to the E-Cell team and track their status. This feature is available both on the main website and in the admin dashboard.

## Features

### For Users (Main Website)
1. **Submit Ideas**: Users can submit ideas with:
   - Title
   - Category (Events & Workshops, Technology & Innovation, etc.)
   - Detailed description
   - Optional name and email for tracking

2. **Track Ideas**: Users can track their submitted ideas by entering their email address to see:
   - Current status (Pending, Under Review, Approved, Rejected, Implemented)
   - Admin notes and feedback
   - Submission date

### For Admins (Admin Dashboard)
1. **View All Suggestions**: See all submitted ideas in a table format
2. **Filter by Status**: Filter suggestions by their current status
3. **Update Status**: Change the status of suggestions and add admin notes
4. **Delete Suggestions**: Remove inappropriate or duplicate suggestions
5. **Statistics**: View pending suggestions count in the overview

## Navigation

### Main Website
- Added "Suggestions" link to the main navigation header
- Accessible at `/suggestions`

### Admin Dashboard
- Added "Suggestions" tab to the admin dashboard
- Accessible via the admin dashboard navigation

## Database Schema

The feature uses a new `IdeaSuggestion` model with the following fields:
- `id`: Unique identifier
- `title`: Idea title
- `description`: Detailed description
- `category`: Idea category
- `submitterName`: Optional submitter name
- `submitterEmail`: Optional submitter email
- `status`: Current status (PENDING, UNDER_REVIEW, APPROVED, REJECTED, IMPLEMENTED)
- `adminNotes`: Optional admin feedback
- `createdAt`: Submission timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Public Endpoints
- `POST /api/suggestions`: Submit a new idea
- `GET /api/suggestions?email=...`: Get suggestions by email

### Admin Endpoints
- `GET /api/admin/suggestions`: Get all suggestions (with optional filters)
- `PUT /api/admin/suggestions/[id]`: Update suggestion status and notes
- `DELETE /api/admin/suggestions/[id]`: Delete a suggestion

## Usage Instructions

### For Users
1. Navigate to `/suggestions` on the main website
2. Choose between "Submit Idea" or "Track Ideas" tabs
3. Fill out the form with your idea details
4. Submit and optionally provide email for tracking
5. Use the tracking feature to check status updates

### For Admins
1. Access the admin dashboard
2. Navigate to the "Suggestions" tab
3. View all submitted ideas
4. Use the status filter to focus on specific categories
5. Click the edit button to update status and add notes
6. Use the delete button to remove inappropriate suggestions

## Categories Available
- Events & Workshops
- Technology & Innovation
- Networking & Mentorship
- Competitions & Challenges
- Educational Content
- Community Building
- Partnerships & Collaborations
- Other

## Status Types
- **PENDING**: Newly submitted ideas awaiting review
- **UNDER_REVIEW**: Ideas currently being evaluated
- **APPROVED**: Ideas that have been accepted for implementation
- **REJECTED**: Ideas that won't be implemented
- **IMPLEMENTED**: Ideas that have been successfully implemented

## Benefits
- **Community Engagement**: Encourages user participation and feedback
- **Innovation Pipeline**: Creates a structured way to collect and evaluate ideas
- **Transparency**: Users can track the status of their submissions
- **Admin Control**: Comprehensive management tools for the admin team
- **Data Insights**: Track popular categories and submission trends 