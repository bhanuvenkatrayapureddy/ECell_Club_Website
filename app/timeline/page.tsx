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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading timeline...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Project Timeline</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Our journey to create the perfect E-Cell website - from concept to launch
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {timelineItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Calendar size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Timeline Items Yet</h3>
                <p className="text-gray-500 mb-6">Timeline items will appear here once they are added through the admin dashboard.</p>
                <Link href="/admin/dashboard" className="btn-primary">
                  Go to Admin Dashboard
                </Link>
              </motion.div>
            ) : (
              timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`timeline-item ${index === timelineItems.length - 1 ? 'border-l-0' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1 bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-500">
                          {item.dueDate === 'Ongoing' ? 'Ongoing' : new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    {item.tasks && item.tasks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700 mb-2">Key Tasks:</h4>
                        <ul className="space-y-1">
                          {item.tasks.map((task, taskIndex) => (
                            <li key={task.id} className="flex items-center text-sm text-gray-600">
                              <div className={`w-2 h-2 rounded-full mr-3 ${getStatusColor(task.status)}`}></div>
                              {task.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-500 capitalize">{getStatusText(item.status)}</span>
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Overall Progress</h3>
              <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                <div 
                  className="bg-white h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <p className="text-lg">{calculateProgress()}% Complete - {calculateProgress() < 100 ? 'Keep going!' : 'All done!'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Project Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the scope and objectives of our website development project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-primary-600">Objective</h3>
              <p className="text-gray-600">
                Create a modern, professional website that showcases E-Cell's activities and provides an intuitive admin interface for content management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-secondary-600">Scope</h3>
              <p className="text-gray-600">
                Complete website with responsive design, admin dashboard, content management system, and timeline tracking functionality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-accent-600">Timeline</h3>
              <p className="text-gray-600">
                3-month development cycle from initial planning to final deployment, with ongoing support and maintenance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Follow our progress and get notified about new features and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
                View Events
              </Link>
              <Link href="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 