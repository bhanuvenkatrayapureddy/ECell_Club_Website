'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowRight, ArrowLeft, Filter } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarField from '@/components/StarField'
import SpaceEffects from '@/components/SpaceEffects'
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
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/70">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = getEventStats()

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <StarField />
        <SpaceEffects />
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
              Our <span className="text-white neon-glow">Events</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 text-shadow">
              Join us for exciting events that inspire, educate, and connect the entrepreneurial community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Stats */}
      <section className="py-12 bg-black/50 border-b border-white/10">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-white neon-glow">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-white/70 font-medium text-shadow">Filter by:</span>
            {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-white text-black neon-glow'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="text-white/40 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-shadow">No Events Yet</h3>
              <p className="text-white/70 mb-6 text-shadow">Events will appear here once they are added through the admin dashboard.</p>
              <Link href="/admin/dashboard" className="btn-primary neon-glow">
                Go to Admin Dashboard
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="mb-4">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-48 bg-white/10 backdrop-blur-md flex items-center justify-center rounded mb-2 border border-white/20">
                      <span className="text-white/40">No Image</span>
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

                <h3 className="text-xl font-bold text-white mb-3 text-shadow">{event.title}</h3>
                <p className="text-white/70 mb-4 leading-relaxed text-shadow">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-white/60">
                    <Calendar className="mr-2" size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <Clock className="mr-2" size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <MapPin className="mr-2" size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <Users className="mr-2" size={16} />
                    <span>{event.attendees}/{event.capacity} attendees</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-white hover:text-white/80 font-medium text-sm flex items-center neon-glow">
                    Learn More
                    <ArrowRight className="ml-1" size={16} />
                  </button>
                  {event.status === 'UPCOMING' && event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm px-4 py-2 neon-glow"
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
              <p className="text-white/70 text-lg text-shadow">No events found for the selected filter.</p>
            </motion.div>
          )}
            </>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient text-shadow">
              Event Categories
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 neon-glow`}>
                  <Calendar className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white text-shadow">{category.name}</h3>
                <p className="text-2xl font-bold text-white neon-glow mb-2">{category.count}</p>
                <p className="text-white/70 text-sm text-shadow">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-8 text-white max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-shadow">Stay Updated</h3>
              <p className="text-lg mb-6 text-white/90 text-shadow">
                Never miss an event! Subscribe to our newsletter for the latest updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="btn-outline border-white text-white hover:bg-white hover:text-black neon-glow">
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