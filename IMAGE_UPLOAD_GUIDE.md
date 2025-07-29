# 📸 Image Upload System Guide

## 🎯 Overview

Your E-Cell website supports local image uploads. Images are stored in the `public/uploads/` directory and managed via the admin dashboard. No external storage is required.

## 📁 File Structure

```
public/
├── uploads/
│   ├── events/          # Event images
│   ├── team/           # Team member profile images
│   └── .gitkeep        # Preserves folder structure in git
```

## 🔧 How It Works

### **1. Upload Process**
1. User selects an image file in the admin dashboard
2. File is validated (type, size, format)
3. File is saved to appropriate directory with unique filename
4. File path is stored in database
5. Image is displayed using the stored path

### **2. File Validation**
- **Allowed Formats**: JPEG, JPG, PNG, GIF, WebP
- **Maximum Size**: 5MB per file
- **Unique Naming**: Timestamp + random suffix to prevent conflicts

### **3. Database Storage**
- **Events**: `image` field stores `/uploads/events/filename.ext`
- **Team Members**: `avatar` field in User model stores `/uploads/team/filename.ext`

## 🛠️ API Endpoints

### **POST /api/upload**
Uploads an image file and returns the file path.

**Request:**
```javascript
const formData = new FormData()
formData.append('image', file)
formData.append('type', 'event' | 'team')

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})
```

**Response:**
```json
{
  "success": true,
  "data": {
    "filename": "eventImage-1234567890-123456789.jpg",
    "path": "/uploads/events/eventImage-1234567890-123456789.jpg",
    "size": 1024000,
    "mimetype": "image/jpeg"
  }
}
```

## 🎨 Frontend Integration

### **Event Image Upload**
```jsx
<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, 'event')}
  className="w-full p-2 border rounded"
/>
```

### **Team Member Avatar Upload**
```jsx
<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, 'team')}
  className="w-full p-2 border rounded"
/>
```

### **Image Preview**
```jsx
{formData.image && (
  <div className="flex items-center space-x-2">
    <img 
      src={formData.image} 
      alt="Preview" 
      className="w-16 h-16 object-cover rounded"
    />
    <button
      type="button"
      onClick={() => setFormData({...formData, image: ''})}
      className="text-red-500 text-sm hover:text-red-700"
    >
      Remove
    </button>
  </div>
)}
```

## 📊 Database Schema Updates

### **Event Model**
```prisma
model Event {
  // ... other fields
  image       String?  // Stores file path like "/uploads/events/filename.jpg"
  // ... other fields
}
```

### **User Model**
```prisma
model User {
  // ... other fields
  avatar      String?  // Stores file path like "/uploads/team/filename.jpg"
  // ... other fields
}
```

## 🔒 Security Features

### **1. File Type Validation**
- Only image files are accepted
- MIME type checking prevents malicious uploads

### **2. File Size Limits**
- Maximum 5MB per file
- Prevents server storage abuse

### **3. Unique Filenames**
- Timestamp + random suffix prevents conflicts
- No predictable file paths

### **4. Directory Separation**
- Events and team images stored separately
- Easy to manage and clean up

## 🚀 Usage Examples

### **Creating an Event with Image**
1. Fill in event details
2. Click "Choose File" for event image
3. Select an image file
4. Image uploads automatically
5. Preview appears below the input
6. Save the event

### **Adding Team Member with Avatar**
1. Fill in team member details
2. Click "Choose File" for profile image
3. Select an image file
4. Avatar uploads automatically
5. Preview appears below the input
6. Save the team member

## 🐛 Troubleshooting

### **Common Issues**

#### **1. "Invalid file type" Error**
- **Cause**: File is not an image
- **Solution**: Use JPEG, PNG, GIF, or WebP files only

#### **2. "File size too large" Error**
- **Cause**: File exceeds 5MB limit
- **Solution**: Compress image or use smaller file

#### **3. "Failed to upload image" Error**
- **Cause**: Server error or directory permissions
- **Solution**: Check server logs and ensure upload directories exist

#### **4. Image not displaying**
- **Cause**: File path incorrect or file missing
- **Solution**: Check if file exists in uploads directory

### **Debug Commands**
```bash
# Check upload directories exist
ls -la public/uploads/

# Check file permissions
ls -la public/uploads/events/
ls -la public/uploads/team/

# Check server logs
npm run dev
```

## 🔄 File Management

### **Automatic Cleanup**
- Files are stored permanently until manually deleted
- Consider implementing cleanup for unused images

### **Manual Cleanup**
```bash
# Remove all uploaded files
rm -rf public/uploads/events/*
rm -rf public/uploads/team/*

# Keep directory structure
touch public/uploads/events/.gitkeep
touch public/uploads/team/.gitkeep
```

## 📈 Performance Considerations

### **1. Image Optimization**
- Consider implementing image compression
- Use WebP format for better compression
- Implement responsive images

### **2. Storage Management**
- Monitor upload directory size
- Implement cleanup for old/unused images
- Consider CDN for production

### **3. Caching**
- Images are served statically by Next.js
- Browser caching improves performance
- Consider image optimization middleware

## 🎯 Next Steps

### **Immediate Enhancements**
1. **Image Compression**: Add automatic image compression
2. **Thumbnail Generation**: Create thumbnails for faster loading
3. **Image Cropping**: Add client-side image cropping
4. **Bulk Upload**: Support multiple image uploads

### **Advanced Features**
1. **CDN Integration**: Use CDN for image delivery
2. **Image Optimization**: Implement next/image for optimization
3. **Backup System**: Implement image backup strategy
4. **Analytics**: Track image usage and performance

## ✅ Success Indicators

Your image upload system is working when:
- ✅ Images upload successfully without errors
- ✅ Images display correctly in admin dashboard
- ✅ Images show up on public pages
- ✅ File paths are stored correctly in database
- ✅ No security vulnerabilities in file uploads

The image upload system is now fully integrated and ready for use! 🎉 