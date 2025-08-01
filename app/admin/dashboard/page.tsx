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
  Building,
  LogOut,
  Lightbulb,
  Settings
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
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [clubInfo, setClubInfo] = useState<any[]>([])
  
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

  const handleLogout = () => {
    localStorage.removeItem('admin-auth')
    router.push('/admin')
    toast.success('Logged out successfully')
  }

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Fetch all data in parallel
      const [statsRes, timelineRes, eventsRes, teamRes, departmentsRes, suggestionsRes, clubInfoRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/timeline'),
        fetch('/api/admin/events'),
        fetch('/api/admin/team'),
        fetch('/api/admin/departments'),
        fetch('/api/admin/suggestions'),
        fetch('/api/admin/club-info')
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

      if (suggestionsRes.ok) {
        const suggestionsData = await suggestionsRes.json()
        setSuggestions(suggestionsData.data || [])
      }

      if (clubInfoRes.ok) {
        const clubInfoData = await clubInfoRes.json()
        setClubInfo(clubInfoData.data || [])
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="glass-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">{getModalTitle()}</h3>
            <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="form-input"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="form-label">Status</label>
              <select
                value={formData.status || (modalType === 'event' ? 'UPCOMING' : 'PENDING')}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="form-input"
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
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="form-input"
                  />
                </div>
                {formData.status === 'COMPLETED' && (
                  <div>
                    <label className="form-label">Completion Date</label>
                    <input
                      type="date"
                      value={formData.completedAt || ''}
                      onChange={(e) => setFormData({...formData, completedAt: e.target.value})}
                      className="form-input"
                    />
                  </div>
                )}
              </>
            )}

            {modalType === 'event' && (
              <>
                <div>
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Time *</label>
                  <input
                    type="text"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    placeholder="2:00 PM - 4:00 PM"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Registration URL (Google Form, optional)</label>
                  <input
                    type="url"
                    value={formData.registrationUrl || ''}
                    onChange={e => setFormData({ ...formData, registrationUrl: e.target.value })}
                    className="form-input"
                    placeholder="https://forms.gle/..."
                  />
                </div>
                <div>
                  <label className="form-label">Event Image (Optional)</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'event')}
                      className="form-input"
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
                          className="text-red-400 text-sm hover:text-red-300 transition-colors"
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
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Role *</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Department *</label>
                  <select
                    value={formData.department || ''}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="form-input"
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
                  <label className="form-label">Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="form-input"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="form-label">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Profile Image (Optional)</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'team')}
                      className="form-input"
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
                          className="text-red-400 text-sm hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="form-label">Twitter</label>
                  <input
                    type="url"
                    value={formData.twitter || ''}
                    onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                    className="form-input"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-white/70 border border-white/20 rounded hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveItem}
              className="btn-primary"
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
        return <CheckCircle className="text-green-400" size={16} />
      case 'IN_PROGRESS':
        return <AlertCircle className="text-yellow-400" size={16} />
      case 'PENDING':
        return <Clock className="text-white/60" size={16} />
      case 'CANCELLED':
        return <XCircle className="text-red-400" size={16} />
      default:
        return <Clock className="text-white/60" size={16} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white/70">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="glass-nav border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white neon-glow">Admin Dashboard</h1>
              <p className="text-white/70">Manage your E-Cell website</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/70">Welcome, Admin</span>
              <button 
                onClick={handleLogout}
                className="text-white/70 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-nav border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'departments', label: 'Departments', icon: Building },
              { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-white text-white neon-glow'
                    : 'border-transparent text-white/60 hover:text-white/80 hover:border-white/30'
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
                { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'bg-blue-500/20 border-blue-500/30' },
                { label: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'bg-green-500/20 border-green-500/30' },
                { label: 'Total Views', value: stats.totalViews, icon: Activity, color: 'bg-purple-500/20 border-purple-500/30' },
                { label: 'Completed Tasks', value: stats.completedTasks, icon: CheckCircle, color: 'bg-orange-500/20 border-orange-500/30' },
                { label: 'New Suggestions', value: suggestions.filter(s => s.status === 'PENDING').length, icon: Lightbulb, color: 'bg-yellow-500/20 border-yellow-500/30' }
              ].map((stat, index) => (
                <div key={stat.label} className="glass-card p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} rounded-lg p-3 border`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-white/70">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
                <div className="space-y-4">
                  {timelineItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-white/60">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleAddItem('timeline')}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded border border-white/20 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Timeline Item</span>
                  </button>
                  <button
                    onClick={() => handleAddItem('event')}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded border border-white/20 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Event</span>
                  </button>
                  <button
                    onClick={() => handleAddItem('team')}
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded border border-white/20 transition-colors"
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
              <h2 className="text-2xl font-bold text-white">Timeline Management</h2>
              <button
                onClick={() => handleAddItem('timeline')}
                className="flex items-center space-x-2 btn-primary"
              >
                <Plus size={16} />
                <span>Add Item</span>
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {timelineItems.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{item.title}</div>
                            <div className="text-sm text-white/60">{item.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-2 text-sm text-white">{item.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {item.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem('timeline', item)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('timeline', item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
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
              <h2 className="text-2xl font-bold text-white">Event Management</h2>
              <button
                onClick={() => handleAddItem('event')}
                className="flex items-center space-x-2 btn-primary"
              >
                <Plus size={16} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Attendees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{event.title}</div>
                            <div className="text-sm text-white/60">{event.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{new Date(event.date).toLocaleDateString()}</div>
                          <div className="text-sm text-white/60">{event.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {event.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(event.status)}
                            <span className="ml-2 text-sm text-white">{event.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {event.attendees}/{event.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem('event', event)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('event', event.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
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
              <h2 className="text-2xl font-bold text-white">Team Management</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAddItem('team')}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <Plus size={16} />
                  <span>Add Member</span>
                </button>
                <button
                  onClick={() => handleAddDepartment()}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded border border-white/20 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Department</span>
                </button>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{member.user.name}</div>
                            <div className="text-sm text-white/60">{member.user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {member.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                                <Linkedin size={16} />
                              </a>
                            )}
                            {member.twitter && (
                              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                                <Twitter size={16} />
                              </a>
                            )}
                            {member.email && (
                              <a href={`mailto:${member.email}`} className="text-white/60 hover:text-white transition-colors">
                                <Mail size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem('team', member)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('team', member.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
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
              <h2 className="text-2xl font-bold text-white">Department Management</h2>
              <button
                onClick={handleAddDepartment}
                className="flex items-center space-x-2 btn-primary"
              >
                <Plus size={16} />
                <span>Add Department</span>
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Department Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Team Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {departments.map((dept) => {
                      const memberCount = teamMembers.filter(member => member.department === dept.name).length
                      return (
                        <tr key={dept.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{dept.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white/60">{dept.description || 'No description'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{memberCount} member{memberCount !== 1 ? 's' : ''}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditDepartment(dept)}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteDepartment(dept.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
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

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Idea Suggestions Management</h2>
              <div className="flex space-x-2">
                <select
                  onChange={(e) => {
                    const status = e.target.value
                    if (status) {
                      fetch(`/api/admin/suggestions?status=${status}`)
                        .then(res => res.json())
                        .then(data => setSuggestions(data.data || []))
                    } else {
                      fetchDashboardData()
                    }
                  }}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                >
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="IMPLEMENTED">Implemented</option>
                </select>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Idea</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Submitter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {suggestions.map((suggestion) => (
                      <tr key={suggestion.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{suggestion.title}</div>
                            <div className="text-sm text-white/60 max-w-xs truncate">{suggestion.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {suggestion.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-white">{suggestion.submitterName || 'Anonymous'}</div>
                            <div className="text-sm text-white/60">{suggestion.submitterEmail || 'No email'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(suggestion.status)}
                            <span className="ml-2 text-sm text-white">{suggestion.status.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {new Date(suggestion.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const newStatus = prompt('Enter new status (PENDING/UNDER_REVIEW/APPROVED/REJECTED/IMPLEMENTED):', suggestion.status)
                                if (newStatus && ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'IMPLEMENTED'].includes(newStatus)) {
                                  const adminNotes = prompt('Enter admin notes (optional):', suggestion.adminNotes || '')
                                  fetch(`/api/admin/suggestions/${suggestion.id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ status: newStatus, adminNotes })
                                  })
                                  .then(response => response.json())
                                  .then(data => {
                                    if (data.success) {
                                      toast.success('Suggestion updated successfully')
                                      fetchDashboardData()
                                    } else {
                                      toast.error('Failed to update suggestion')
                                    }
                                  })
                                  .catch(error => {
                                    console.error('Error updating suggestion:', error)
                                    toast.error('Failed to update suggestion')
                                  })
                                }
                              }}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this suggestion?')) {
                                  fetch(`/api/admin/suggestions/${suggestion.id}`, { method: 'DELETE' })
                                  .then(response => response.json())
                                  .then(data => {
                                    if (data.success) {
                                      toast.success('Suggestion deleted successfully')
                                      fetchDashboardData()
                                    } else {
                                      toast.error('Failed to delete suggestion')
                                    }
                                  })
                                  .catch(error => {
                                    console.error('Error deleting suggestion:', error)
                                    toast.error('Failed to delete suggestion')
                                  })
                                }
                              }}
                              className="text-red-400 hover:text-red-300 transition-colors"
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

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Club Information Settings</h2>
              <button
                onClick={() => {
                  const key = prompt('Enter information key (e.g., email, phone, address):')
                  if (!key) return
                  
                  const value = prompt('Enter the value:')
                  if (!value) return
                  
                  const description = prompt('Enter description (optional):')
                  
                  fetch('/api/admin/club-info', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key, value, description })
                  })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      toast.success('Club information added successfully')
                      fetchDashboardData()
                    } else {
                      toast.error(data.error || 'Failed to add club information')
                    }
                  })
                  .catch(error => {
                    console.error('Error adding club info:', error)
                    toast.error('Failed to add club information')
                  })
                }}
                className="flex items-center space-x-2 btn-primary"
              >
                <Plus size={16} />
                <span>Add Info</span>
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Key</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {clubInfo.map((info) => (
                      <tr key={info.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{info.key}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/80">{info.value}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/60">{info.description || 'No description'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                          {new Date(info.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const newKey = prompt('Enter new key:', info.key)
                                if (!newKey) return
                                
                                const newValue = prompt('Enter new value:', info.value)
                                if (!newValue) return
                                
                                const newDescription = prompt('Enter new description (optional):', info.description || '')
                                
                                fetch(`/api/admin/club-info/${info.id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ key: newKey, value: newValue, description: newDescription })
                                })
                                .then(response => response.json())
                                .then(data => {
                                  if (data.success) {
                                    toast.success('Club information updated successfully')
                                    fetchDashboardData()
                                  } else {
                                    toast.error(data.error || 'Failed to update club information')
                                  }
                                })
                                .catch(error => {
                                  console.error('Error updating club info:', error)
                                  toast.error('Failed to update club information')
                                })
                              }}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this club information?')) {
                                  fetch(`/api/admin/club-info/${info.id}`, { method: 'DELETE' })
                                  .then(response => response.json())
                                  .then(data => {
                                    if (data.success) {
                                      toast.success('Club information deleted successfully')
                                      fetchDashboardData()
                                    } else {
                                      toast.error(data.error || 'Failed to delete club information')
                                    }
                                  })
                                  .catch(error => {
                                    console.error('Error deleting club info:', error)
                                    toast.error('Failed to delete club information')
                                  })
                                }
                              }}
                              className="text-red-400 hover:text-red-300 transition-colors"
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

            <div className="mt-8 glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Setup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-white/70">Common club information keys:</p>
                  <ul className="text-sm text-white/60 space-y-1">
                    <li>• <code className="bg-white/10 px-1 rounded">email</code> - Club email address</li>
                    <li>• <code className="bg-white/10 px-1 rounded">phone</code> - Contact phone number</li>
                    <li>• <code className="bg-white/10 px-1 rounded">address</code> - Club address</li>
                    <li>• <code className="bg-white/10 px-1 rounded">website</code> - Club website</li>
                    <li>• <code className="bg-white/10 px-1 rounded">social_media</code> - Social media links</li>
                    <li>• <code className="bg-white/10 px-1 rounded">meeting_time</code> - Regular meeting schedule</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/70">Usage:</p>
                  <ul className="text-sm text-white/60 space-y-1">
                    <li>• Add new information using the "Add Info" button</li>
                    <li>• Edit existing information using the edit icon</li>
                    <li>• Delete information using the delete icon</li>
                    <li>• This information can be displayed on your website</li>
                  </ul>
                </div>
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
            <h2 className="text-2xl font-bold mb-6 text-white">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Event Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Events</span>
                    <span className="font-semibold text-white">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Upcoming Events</span>
                    <span className="font-semibold text-white">{events.filter(e => e.status === 'UPCOMING').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Completed Events</span>
                    <span className="font-semibold text-white">{events.filter(e => e.status === 'COMPLETED').length}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Timeline Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Items</span>
                    <span className="font-semibold text-white">{timelineItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Completed</span>
                    <span className="font-semibold text-white">{timelineItems.filter(t => t.status === 'COMPLETED').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">In Progress</span>
                    <span className="font-semibold text-white">{timelineItems.filter(t => t.status === 'IN_PROGRESS').length}</span>
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