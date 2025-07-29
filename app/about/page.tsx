'use client'

import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  Target, 
  Users, 
  Award,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative thinking and innovative solutions to real-world problems.",
      color: "bg-primary-100 text-primary-600"
    },
    {
      icon: Target,
      title: "Leadership",
      description: "Developing leadership skills through hands-on experience and mentorship.",
      color: "bg-secondary-100 text-secondary-600"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a strong network of entrepreneurs, mentors, and industry experts.",
      color: "bg-accent-100 text-accent-600"
    }
  ]

  const objectives = [
    "Foster entrepreneurial mindset among students",
    "Provide mentorship and guidance from industry experts",
    "Connect students with successful entrepreneurs",
    "Create networking opportunities and partnerships",
    "Organize workshops, seminars, and competitions",
    "Support student startups and business ideas"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About E-Cell</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              The Entrepreneurship Cell (E-Cell) is a student-driven organization dedicated to 
              promoting entrepreneurial thinking and innovation within our college community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gradient">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To inspire and empower students to become successful entrepreneurs by providing 
                them with the necessary skills, knowledge, and resources to turn their ideas into reality.
              </p>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-primary-500 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-3xl font-bold mb-6 text-secondary-600">Our Vision</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To be the leading student organization that cultivates the next generation of 
                entrepreneurs and innovators who will drive positive change in society.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-3xl font-bold text-secondary-600">50+</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <div className="text-3xl font-bold text-accent-600">20+</div>
                  <div className="text-sm text-gray-600">Startups</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">100+</div>
                  <div className="text-sm text-gray-600">Mentors</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at E-Cell
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center"
              >
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a leading entrepreneurship organization
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Foundation (2020)</h3>
                  <p className="text-gray-600">E-Cell was established with a vision to foster entrepreneurship among students. Started with just 20 members and a dream to make a difference.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Growth & Expansion (2021-2022)</h3>
                  <p className="text-gray-600">Expanded our reach with more events, workshops, and mentorship programs. Successfully launched our first startup incubation program.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Innovation & Leadership (2023-Present)</h3>
                  <p className="text-gray-600">Became the leading entrepreneurship organization in the region. Launched innovative programs and established strong industry partnerships.</p>
                </div>
              </motion.div>
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Ready to start your entrepreneurial journey? Join E-Cell and be part of something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/team" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
                Meet Our Team
              </Link>
              <Link href="/events" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300">
                View Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 