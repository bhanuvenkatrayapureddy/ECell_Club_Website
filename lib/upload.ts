import multer from 'multer'
import path from 'path'
import { NextRequest } from 'next/server'

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine upload directory based on file type
    let uploadDir = 'public/uploads/'
    
    if (file.fieldname === 'eventImage') {
      uploadDir += 'events/'
    } else if (file.fieldname === 'teamImage') {
      uploadDir += 'team/'
    } else {
      uploadDir += 'general/'
    }
    
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

// File filter to accept only images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'))
  }
}

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file at a time
  }
})

// Helper function to get file path for database storage
export const getFilePath = (filename: string, type: 'event' | 'team'): string => {
  return `/uploads/${type}/${filename}`
}

// Helper function to validate file upload
export const validateFileUpload = (file: Express.Multer.File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!file) {
    return { valid: false, error: 'No file uploaded' }
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum size is 5MB.' }
  }

  return { valid: true }
} 