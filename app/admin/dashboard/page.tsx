'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  Clock, 
  Target,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Linkedin,
  Twitter,
  Mail,
  Building
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface DashboardStats {
  totalMembers: number
  upcomingEvents: number
  totalViews: number
  completedTasks: number
}

interface TimelineItem {
  id: string
  title: string
  description: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  dueDate: string
  order: number
  tasks?: TimelineTask[]
}

interface TimelineTask {
  id: string
  description: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  capacity: number
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
  category: string
  image?: string
}

interface TeamMember {
  id: string
  role: string
  department: string
  bio: string
  linkedin?: string
  twitter?: string
  email?: string
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    upcomingEvents: 0,
    totalViews: 0,
    completedTasks: 0
  })
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [departments, setDepartments] = useState<{ id: string; name: string; description?: string }[]>([])
  
  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'timeline' | 'event' | 'team' | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    // Simple client-side auth check
    if (typeof window !== 'undefined') {
      const isAuthed = localStorage.getItem('admin-auth') === 'true'
      if (!isAuthed) {
        router.replace('/admin')
      }
    }
    fetchDashboardData()
  }, [])

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardData()
    }
  }, [activeTab])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Fetch all data in parallel
      const [statsRes, timelineRes, eventsRes, teamRes, departmentsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/timeline'),
        fetch('/api/admin/events'),
        fetch('/api/admin/team'),
        fetch('/api/admin/departments')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.data)
      }

      if (timelineRes.ok) {
        const timelineData = await timelineRes.json()
        setTimelineItems(timelineData.data || [])
      }

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json()
        setEvents(eventsData.data || [])
      }

      if (teamRes.ok) {
        const teamData = await teamRes.json()
        setTeamMembers(teamData.data || [])
      }

      if (departmentsRes.ok) {
        const departmentsData = await departmentsRes.json()
        setDepartments(departmentsData.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddItem = (type: 'timeline' | 'event' | 'team') => {
    setModalType(type)
    setEditingItem(null)
    // Set formData to only the correct fields for each type
    if (type === 'event') {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        category: '',
        image: '',
        registrationUrl: ''
      })
    } else if (type === 'team') {
      setFormData({
        name: '',
        email: '',
        avatar: '',
        role: '',
        department: '',
        bio: '',
        linkedin: '',
        twitter: ''
      })
    } else if (type === 'timeline') {
      setFormData({
        title: '',
        description: '',
        status: 'PENDING',
        dueDate: '',
        order: '',
        completedAt: ''
      })
    }
    setShowModal(true)
  }

  const handleEditItem = (type: 'timeline' | 'event' | 'team', item: any) => {
    setModalType(type)
    setEditingItem(item)
    if (type === 'event') {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        date: item.date || '',
        time: item.time || '',
        location: item.location || '',
        capacity: item.capacity || '',
        category: item.category || '',
        image: item.image || '',
        registrationUrl: item.registrationUrl || ''
      })
    } else if (type === 'team') {
      setFormData({
        name: item.user?.name || '',
        email: item.user?.email || '',
        avatar: item.user?.avatar || '',
        role: item.role || '',
        department: item.department || '',
        bio: item.bio || '',
        linkedin: item.linkedin || '',
        twitter: item.twitter || ''
      })
    } else if (type === 'timeline') {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        status: item.status || 'PENDING',
        dueDate: item.dueDate || '',
        order: item.order || '',
        completedAt: item.completedAt || ''
      })
    }
    setShowModal(true)
  }

  const handleDeleteItem = async (type: 'timeline' | 'event' | 'team', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      let response
      if (type === 'timeline') {
        response = await fetch(`/api/admin/timeline/${id}`, { method: 'DELETE' })
      } else if (type === 'event') {
        response = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
      } else if (type === 'team') {
        response = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
      }

      if (response?.ok) {
        toast.success('Item deleted successfully')
        setTimeout(() => {
          fetchDashboardData()
        }, 300)
      } else {
        toast.error('Failed to delete item')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    }
  }

  const handleAddDepartment = () => {
    const name = prompt('Enter department name:')
    if (!name) return

    const description = prompt('Enter department description (optional):')

    fetch('/api/admin/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        toast.success('Department added successfully')
        fetchDashboardData() // Refresh data to get updated departments
      } else {
        toast.error(data.error || 'Failed to add department')
      }
    })
    .catch(error => {
      console.error('Error adding department:', error)
      toast.error('Failed to add department')
    })
  }

  const handleEditDepartment = (dept: { id: string; name: string; description?: string }) => {
    const name = prompt('Enter department name:', dept.name)
    if (!name) return

    const description = prompt('Enter department description (optional):', dept.description || '')

    fetch(`/api/admin/departments/${dept.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        toast.success('Department updated successfully')
        fetchDashboardData() // Refresh data
      } else {
        toast.error(data.error || 'Failed to update department')
      }
    })
    .catch(error => {
      console.error('Error updating department:', error)
      toast.error('Failed to update department')
    })
  }

  const handleDeleteDepartment = (deptId: string) => {
    if (!confirm('Are you sure you want to delete this department? This will affect team members assigned to this department.')) return

    fetch(`/api/admin/departments/${deptId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        toast.success('Department deleted successfully')
        fetchDashboardData() // Refresh data
      } else {
        toast.error(data.error || 'Failed to delete department')
      }
    })
    .catch(error => {
      console.error('Error deleting department:', error)
      toast.error('Failed to delete department')
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'event' | 'team') => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        // Set the appropriate field based on type
        if (type === 'event') {
          setFormData({...formData, image: data.data.path})
        } else if (type === 'team') {
          setFormData({...formData, avatar: data.data.path})
        }
        toast.success('Image uploaded successfully')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    }
  }

  const handleSaveItem = async () => {
    if (!modalType) return

    // Validate required fields
    const requiredFields = ['title', 'description']
    if (modalType === 'event') {
      requiredFields.push('date', 'time', 'location', 'category')
    } else if (modalType === 'timeline') {
      requiredFields.push('dueDate')
    } else if (modalType === 'team') {
      requiredFields.push('name', 'email', 'role', 'department')
    }

    const missingFields = requiredFields.filter(field => !formData[field])
    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`)
      return
    }

    try {
      let response
      const url = modalType === 'timeline' ? '/api/admin/timeline' : 
                 modalType === 'event' ? '/api/admin/events' : 
                 '/api/admin/team'

      if (editingItem) {
        // Update existing item
        response = await fetch(`/api/admin/${modalType}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        // Create new item
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }

      if (response.ok) {
        toast.success(editingItem ? 'Item updated successfully' : 'Item created successfully')
        setShowModal(false)
        fetchDashboardData() // Refresh data
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        toast.error(errorData.details || 'Failed to save item')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      toast.error('Failed to save item')
    }
  }

  const renderModal = () => {
    if (!showModal || !modalType) return null

    const getModalTitle = () => {
      const action = editingItem ? 'Edit' : 'Add'
      const item = modalType === 'timeline' ? 'Timeline Item' : 
                  modalType === 'event' ? 'Event' : 'Team Member'
      return `${action} ${item}`
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{getModalTitle()}</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status || (modalType === 'event' ? 'UPCOMING' : 'PENDING')}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-2 border rounded"
              >
                {modalType === 'event' ? (
                  <>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </>
                ) : (
                  <>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </>
                )}
              </select>
            </div>

            {modalType === 'timeline' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {formData.status === 'COMPLETED' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Completion Date</label>
                    <input
                      type="date"
                      value={formData.completedAt || ''}
                      onChange={(e) => setFormData({...formData, completedAt: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
              </>
            )}

            {modalType === 'event' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time *</label>
                  <input
                    type="text"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    placeholder="2:00 PM - 4:00 PM"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location *</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Registration URL (Google Form, optional)</label>
                  <input
                    type="url"
                    value={formData.registrationUrl || ''}
                    onChange={e => setFormData({ ...formData, registrationUrl: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="https://forms.gle/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Event Image (Optional)</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'event')}
                      className="w-full p-2 border rounded"
                    />
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
                  </div>
                </div>
              </>
            )}

            {modalType === 'team' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role *</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department *</label>
                  <select
                    value={formData.department || ''}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Image (Optional)</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'team')}
                      className="w-full p-2 border rounded"
                    />
                    {formData.avatar && (
                      <div className="flex items-center space-x-2">
                        <img 
                          src={formData.avatar} 
                          alt="Preview" 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, avatar: ''})}
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Twitter</label>
                  <input
                    type="url"
                    value={formData.twitter || ''}
                    onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveItem}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="text-green-500" size={16} />
      case 'IN_PROGRESS':
        return <AlertCircle className="text-yellow-500" size={16} />
      case 'PENDING':
        return <Clock className="text-gray-400" size={16} />
      case 'CANCELLED':
        return <XCircle className="text-red-500" size={16} />
      default:
        return <Clock className="text-gray-400" size={16} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your E-Cell website</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Admin</span>
              <button className="text-gray-500 hover:text-gray-700">
                <Users size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'departments', label: 'Departments', icon: Building },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'bg-blue-500' },
                { label: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'bg-green-500' },
                { label: 'Total Views', value: stats.totalViews, icon: Activity, color: 'bg-purple-500' },
                { label: 'Completed Tasks', value: stats.completedTasks, icon: CheckCircle, color: 'bg-orange-500' }
              ].map((stat, index) => (
                <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} rounded-lg p-3`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {timelineItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleAddItem('timeline')}
                    className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700"
                  >
                    <Plus size={16} />
                    <span>Add Timeline Item</span>
                  </button>
                  <button
                    onClick={() => handleAddItem('event')}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    <Plus size={16} />
                    <span>Add Event</span>
                  </button>
                  <button
                    onClick={() => handleAddItem('team')}
                    className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                  >
                    <Plus size={16} />
                    <span>Add Team Member</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Timeline Management</h2>
              <button
                onClick={() => handleAddItem('timeline')}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                <Plus size={16} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timelineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-2 text-sm text-gray-900">{item.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem('timeline', item)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('timeline', item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Event Management</h2>
              <button
                onClick={() => handleAddItem('event')}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                <Plus size={16} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{event.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(event.status)}
                            <span className="ml-2 text-sm text-gray-900">{event.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.attendees}/{event.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem('event', event)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('event', event.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Team Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAddItem('team')}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                  <Plus size={16} />
                  <span>Add Member</span>
                </button>
                <button
                  onClick={() => handleAddDepartment()}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <Plus size={16} />
                  <span>Add Department</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.user.name}</div>
                            <div className="text-sm text-gray-500">{member.user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                <Linkedin size={16} />
                              </a>
                            )}
                            {member.twitter && (
                              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                <Twitter size={16} />
                              </a>
                            )}
                            {member.email && (
                              <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-gray-900">
                                <Mail size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem('team', member)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('team', member.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Department Management</h2>
              <button
                onClick={handleAddDepartment}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                <Plus size={16} />
                <span>Add Department</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departments.map((dept) => {
                      const memberCount = teamMembers.filter(member => member.department === dept.name).length
                      return (
                        <tr key={dept.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{dept.description || 'No description'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{memberCount} member{memberCount !== 1 ? 's' : ''}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditDepartment(dept)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteDepartment(dept.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Event Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Events</span>
                    <span className="font-semibold">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upcoming Events</span>
                    <span className="font-semibold">{events.filter(e => e.status === 'UPCOMING').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Events</span>
                    <span className="font-semibold">{events.filter(e => e.status === 'COMPLETED').length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Timeline Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span className="font-semibold">{timelineItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-semibold">{timelineItems.filter(t => t.status === 'COMPLETED').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress</span>
                    <span className="font-semibold">{timelineItems.filter(t => t.status === 'IN_PROGRESS').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {renderModal()}
    </div>
  )
} 