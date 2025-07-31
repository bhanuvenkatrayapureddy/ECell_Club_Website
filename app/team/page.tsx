'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail, ArrowLeft, Users, Award, Clock, Star } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [departments, setDepartments] = useState<{ id: string; name: string; description?: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    try {
      const [teamResponse, departmentsResponse] = await Promise.all([
        fetch('/api/admin/team'),
        fetch('/api/admin/departments')
      ])

      if (teamResponse.ok) {
        const data = await teamResponse.json()
        setTeamMembers(data.data || [])
      } else {
        // Set empty array if API fails
        setTeamMembers([])
      }

      if (departmentsResponse.ok) {
        const departmentsData = await departmentsResponse.json()
        setDepartments(departmentsData.data || [])
      } else {
        // Set empty array if API fails
        setDepartments([])
      }
    } catch (error) {
      console.error('Failed to fetch team data:', error)
      // Fallback data will be set above
    } finally {
      setIsLoading(false)
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Leadership':
        return 'bg-purple-100 text-purple-800'
      case 'Administration':
        return 'bg-blue-100 text-blue-800'
      case 'Finance':
        return 'bg-green-100 text-green-800'
      case 'Events':
        return 'bg-orange-100 text-orange-800'
      case 'Marketing':
        return 'bg-pink-100 text-pink-800'
      case 'Technology':
        return 'bg-indigo-100 text-indigo-800'
      case 'Partnerships':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTeamStats = () => {
    const total = teamMembers.length
    const departments = Array.from(new Set(teamMembers.map(member => member.department)))
    const leadership = teamMembers.filter(member => member.department === 'Leadership').length
    const avgExperience = '1 year' // This would come from actual data
    
    return { total, departments: departments.length, leadership, avgExperience }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/70">Loading team...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = getTeamStats()

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-shadow">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              Meet Our <span className="text-white neon-glow">Team</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 text-shadow">
              The passionate individuals driving innovation and entrepreneurship at our college
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12 bg-black/50 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Team Members', value: stats.total, icon: Users },
              { label: 'Departments', value: stats.departments, icon: Award },
              { label: 'Leadership', value: stats.leadership, icon: Star },
              { label: 'Avg Experience', value: stats.avgExperience, icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="glass-card p-4">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-white neon-glow">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient text-shadow">
              Our Leadership Team
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              Meet the dedicated individuals who make E-Cell a thriving community of innovators and entrepreneurs
            </p>
          </motion.div>

          {teamMembers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <div className="text-white/40 mb-4">
                <Users size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-shadow">No Team Members Yet</h3>
              <p className="text-white/70 mb-6 text-shadow">Team members will appear here once they are added through the admin dashboard.</p>
              <Link href="/admin/dashboard" className="btn-primary neon-glow">
                Go to Admin Dashboard
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center floating-card group"
              >
                <div className="mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold overflow-hidden border border-white/20 neon-glow">
                    {member.user.avatar ? (
                      <img
                        src={member.user.avatar}
                        alt={member.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      member.user.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 text-shadow">{member.user.name}</h3>
                  <p className="text-white font-semibold mb-2 neon-glow">{member.role}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDepartmentColor(member.department)}`}>
                    {member.department}
                  </span>
                </div>

                <p className="text-white/70 text-sm mb-4 leading-relaxed text-shadow">{member.bio}</p>

                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-blue-400 transition-colors neon-glow"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.twitter && (
                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-blue-400 transition-colors neon-glow"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-white/60 hover:text-red-400 transition-colors neon-glow"
                    >
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient text-shadow">
              Our Departments
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              Organized teams working together to create a comprehensive entrepreneurial ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => {
              const memberCount = teamMembers.filter(m => m.department === dept.name).length
              return (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center floating-card"
              >
                <h3 className="text-xl font-bold mb-2 text-white text-shadow">{dept.name}</h3>
                <div className="text-3xl font-bold text-white neon-glow mb-2">{memberCount}</div>
                <p className="text-white/70 text-sm text-shadow">{dept.description || 'Department description'}</p>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-12 text-white floating-card">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">Join Our Team</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto text-shadow">
                Want to be part of our mission? We're always looking for passionate individuals to join our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 neon-glow">
                  Contact Us
                </Link>
                <Link href="/events" className="bg-white text-black hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 neon-glow">
                  Attend Events
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