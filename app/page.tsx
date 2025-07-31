'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ArrowRight,
  Users,
  Calendar,
  Clock,
  Target,
  Star,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface DashboardStats {
  totalMembers: number
  upcomingEvents: number
  totalViews: number
  completedTasks: number
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    upcomingEvents: 0,
    totalViews: 0,
    completedTasks: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Poll every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      // Keep default stats as 0 when API fails
      setStats({
        totalMembers: 0,
        upcomingEvents: 0,
        totalViews: 0,
        completedTasks: 0
      })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Users,
      title: "Join Our Community",
      description: "Connect with like-minded entrepreneurs and innovators",
      link: "/about",
      color: "bg-gradient-to-r from-primary-500 to-secondary-500",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Calendar,
      title: "Explore Events",
      description: "Discover exciting events and workshops",
      link: "/events",
      color: "bg-gradient-to-r from-accent-500 to-success-500",
      gradient: "from-orange-500 to-green-500"
    },
    {
      icon: Clock,
      title: "View Timeline",
      description: "See our project progress and milestones",
      link: "/timeline",
      color: "bg-gradient-to-r from-secondary-500 to-accent-500",
      gradient: "from-purple-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Meet Our Team",
      description: "Get to know the passionate people behind E-Cell",
      link: "/team",
      color: "bg-gradient-to-r from-success-500 to-primary-500",
      gradient: "from-green-500 to-blue-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden geometric-pattern">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Star className="text-6xl text-yellow-400 animate-pulse-slow" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              Welcome to <span className="gradient-text neon-glow">E-Cell Club</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Fostering Innovation, Entrepreneurship, and Leadership in Our College Community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/about" className="btn-primary text-lg px-8 py-4 neon-glow shimmer-effect">
                Learn About Us
              </Link>
              <Link href="/events" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600 neon-glow">
                Explore Events
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-white text-4xl animate-bounce" />
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="py-20 bg-white/5 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Explore E-Cell
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover everything about our entrepreneurship community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={feature.link} className="block">
                  <div className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300 floating-card">
                    <div className={`w-16 h-16 ${feature.color} backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-lg`}>
                      <feature.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-white/70 mb-6">{feature.description}</p>
                    <div className="flex items-center justify-center text-white font-semibold group-hover:text-white/80 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Zap className="text-5xl text-yellow-400" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                To inspire and empower students to become successful entrepreneurs by providing 
                them with the necessary skills, knowledge, and resources to turn their ideas into reality.
              </p>
              <Link href="/about" className="btn-primary text-lg px-8 py-4 neon-glow shimmer-effect">
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-600/30 to-accent-600/30 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <TrendingUp className="text-5xl text-green-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Impact</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Numbers that reflect our commitment to fostering entrepreneurship
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: isLoading ? '...' : stats.totalMembers.toLocaleString(), label: 'Members', icon: Users },
              { number: isLoading ? '...' : stats.upcomingEvents.toString(), label: 'Events', icon: Calendar },
              { number: isLoading ? '...' : stats.totalViews.toLocaleString(), label: 'Views', icon: TrendingUp },
              { number: isLoading ? '...' : stats.completedTasks.toString(), label: 'Tasks', icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                  <stat.icon className="text-3xl text-white/80 mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white neon-glow">{stat.number}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-accent-600/20 to-success-600/20 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-12 text-white">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Star className="text-5xl text-yellow-400" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Ready to Join the Journey?</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Start your entrepreneurial journey with E-Cell today. Connect, learn, and grow with our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 neon-glow">
                  View Events
                </Link>
                <Link href="/contact" className="btn-primary text-lg px-8 py-4 neon-glow shimmer-effect">
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