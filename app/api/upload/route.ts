import { NextRequest, NextResponse } from 'next/server'
import { upload, getFilePath, validateFileUpload } from '@/lib/upload'
import { promisify } from 'util'

// Convert multer to work with Next.js API routes
const uploadMiddleware = promisify(upload.single('image'))

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData()
    const file = formData.get('image') as File
    const type = formData.get('type') as string // 'event' or 'team'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!type || !['event', 'team'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload type. Must be "event" or "team"' },
        { status: 400 }
      )
    }

    // Convert File to Buffer for multer
    const buffer = Buffer.from(await file.arrayBuffer())
    const multerFile: Express.Multer.File = {
      fieldname: type === 'event' ? 'eventImage' : 'teamImage',
      originalname: file.name,
      encoding: '7bit',
      mimetype: file.type,
      size: file.size,
      buffer: buffer,
      stream: null as any,
      destination: '',
      filename: '',
      path: ''
    }

    // Validate file
    const validation = validateFileUpload(multerFile)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomSuffix = Math.round(Math.random() * 1E9)
    const ext = file.name.split('.').pop()
    const filename = `${type}Image-${timestamp}-${randomSuffix}.${ext}`

    // Save file to disk
    const fs = require('fs')
    const path = require('path')
    const uploadDir = `public/uploads/${type}`
    const filePath = path.join(uploadDir, filename)

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Write file
    fs.writeFileSync(filePath, buffer)

    // Return the file path for database storage
    const dbPath = getFilePath(filename, type as 'event' | 'team')

    return NextResponse.json({
      success: true,
      data: {
        filename: filename,
        path: dbPath,
        size: file.size,
        mimetype: file.type
      }
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 