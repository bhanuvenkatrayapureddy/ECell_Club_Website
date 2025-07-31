'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, Circle, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

export default function Timeline() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTimelineData()
  }, [])

  const fetchTimelineData = async () => {
    try {
      const response = await fetch('/api/admin/timeline')
      if (response.ok) {
        const data = await response.json()
        setTimelineItems(data.data || [])
      } else {
        // Set empty array if API fails
        setTimelineItems([])
      }
    } catch (error) {
      console.error('Failed to fetch timeline data:', error)
      // Fallback data will be set above
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500'
      case 'IN_PROGRESS':
        return 'bg-yellow-500'
      case 'PENDING':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="text-green-500" size={20} />
      case 'IN_PROGRESS':
        return <Circle className="text-yellow-500" size={20} />
      case 'PENDING':
        return <Circle className="text-gray-400" size={20} />
      default:
        return <Circle className="text-gray-400" size={20} />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Completed'
      case 'IN_PROGRESS':
        return 'In Progress'
      case 'PENDING':
        return 'Pending'
      default:
        return status
    }
  }

  const calculateProgress = () => {
    if (timelineItems.length === 0) return 0
    const completed = timelineItems.filter(item => item.status === 'COMPLETED').length
    return Math.round((completed / timelineItems.length) * 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/70">Loading timeline...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-shadow">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              Project <span className="text-white neon-glow">Timeline</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 text-shadow">
              Our journey to create the perfect E-Cell website - from concept to launch
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {timelineItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-white/40 mb-4">
                  <Calendar size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-shadow">No Timeline Items Yet</h3>
                <p className="text-white/70 mb-6 text-shadow">Timeline items will appear here once they are added through the admin dashboard.</p>
                <Link href="/admin/dashboard" className="btn-primary neon-glow">
                  Go to Admin Dashboard
                </Link>
              </motion.div>
            ) : (
              timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`timeline-item ${index === timelineItems.length - 1 ? 'border-l-0' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1 glass-card p-6 border-l-4 border-white/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white text-shadow">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-white/60" size={16} />
                        <span className="text-sm text-white/60">
                          {item.dueDate === 'Ongoing' ? 'Ongoing' : new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-4 text-shadow">{item.description}</p>
                    
                    {item.tasks && item.tasks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white mb-2 text-shadow">Key Tasks:</h4>
                        <ul className="space-y-1">
                          {item.tasks.map((task, taskIndex) => (
                            <li key={task.id} className="flex items-center text-sm text-white/70 text-shadow">
                              <div className={`w-2 h-2 rounded-full mr-3 ${getStatusColor(task.status)}`}></div>
                              {task.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-white/60" size={16} />
                        <span className="text-sm text-white/60 capitalize">{getStatusText(item.status)}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        item.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusText(item.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          </div>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-shadow">Overall Progress</h3>
              <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                <div 
                  className="bg-white h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <p className="text-lg text-shadow">{calculateProgress()}% Complete - {calculateProgress() < 100 ? 'Keep going!' : 'All done!'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient text-shadow">
              Project Overview
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              Understanding the scope and objectives of our website development project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-white text-shadow">Objective</h3>
              <p className="text-white/70 text-shadow">
                Create a modern, professional website that showcases E-Cell's activities and provides an intuitive admin interface for content management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-white text-shadow">Scope</h3>
              <p className="text-white/70 text-shadow">
                Complete website with responsive design, admin dashboard, content management system, and timeline tracking functionality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-white text-shadow">Timeline</h3>
              <p className="text-white/70 text-shadow">
                3-month development cycle from initial planning to final deployment, with ongoing support and maintenance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">Stay Updated</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto text-shadow">
                Follow our progress and get notified about new features and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events" className="btn-outline border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 neon-glow">
                  View Events
                </Link>
                <Link href="/contact" className="bg-white text-black hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 neon-glow">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 