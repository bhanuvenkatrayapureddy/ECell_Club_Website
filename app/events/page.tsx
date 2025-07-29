'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowRight, ArrowLeft, Filter } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  registrationUrl?: string
}

export default function Events() {
  const [filter, setFilter] = useState('all')
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.data || [])
      } else {
        // Set empty array if API fails
        setEvents([])
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
      // Fallback data will be set above
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800'
      case 'ONGOING':
        return 'bg-green-100 text-green-800'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Competition':
        return 'bg-purple-100 text-purple-800'
      case 'Workshop':
        return 'bg-orange-100 text-orange-800'
      case 'Networking':
        return 'bg-blue-100 text-blue-800'
      case 'Summit':
        return 'bg-red-100 text-red-800'
      case 'Program':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status.toLowerCase() === filter)

  const getEventStats = () => {
    const total = events.length
    const upcoming = events.filter(e => e.status === 'UPCOMING').length
    const completed = events.filter(e => e.status === 'COMPLETED').length
    const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0)
    
    return { total, upcoming, completed, totalAttendees }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = getEventStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Events</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Join us for exciting events that inspire, educate, and connect the entrepreneurial community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Events', value: stats.total },
              { label: 'Upcoming', value: stats.upcoming },
              { label: 'Completed', value: stats.completed },
              { label: 'Total Attendees', value: stats.totalAttendees }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-600 font-medium">Filter by:</span>
            {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Events Yet</h3>
              <p className="text-gray-500 mb-6">Events will appear here once they are added through the admin dashboard.</p>
              <Link href="/admin/dashboard" className="btn-primary">
                Go to Admin Dashboard
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-2">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2" size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2" size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2" size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-2" size={16} />
                    <span>{event.attendees}/{event.capacity} attendees</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                    Learn More
                    <ArrowRight className="ml-1" size={16} />
                  </button>
                  {event.status === 'UPCOMING' && event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Register Now
                    </a>
                  ) : event.status === 'UPCOMING' ? (
                    <button className="btn-primary text-sm px-4 py-2 opacity-50 cursor-not-allowed" disabled>
                      Register Now
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && events.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">No events found for the selected filter.</p>
            </motion.div>
          )}
            </>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Event Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover different types of events we organize throughout the year
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Workshops', count: events.filter(e => e.category === 'Workshop').length, color: 'bg-orange-500', description: 'Hands-on learning sessions' },
              { name: 'Competitions', count: events.filter(e => e.category === 'Competition').length, color: 'bg-purple-500', description: 'Challenge your skills' },
              { name: 'Networking', count: events.filter(e => e.category === 'Networking').length, color: 'bg-blue-500', description: 'Connect with professionals' },
              { name: 'Summits', count: events.filter(e => e.category === 'Summit').length, color: 'bg-red-500', description: 'Major industry events' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Calendar className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">{category.count}</p>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg p-8 text-white max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-lg mb-6 opacity-90">
                Never miss an event! Subscribe to our newsletter for the latest updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="btn-outline border-white text-white hover:bg-white hover:text-secondary-600">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 