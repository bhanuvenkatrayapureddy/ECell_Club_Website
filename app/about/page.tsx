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
      color: "bg-white/20"
    },
    {
      icon: Target,
      title: "Leadership",
      description: "Developing leadership skills through hands-on experience and mentorship.",
      color: "bg-white/20"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a strong network of entrepreneurs, mentors, and industry experts.",
      color: "bg-white/20"
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
              About <span className="text-white neon-glow">E-Cell</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 text-shadow">
              The Entrepreneurship Cell (E-Cell) is a student-driven organization dedicated to 
              promoting entrepreneurial thinking and innovation within our college community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gradient text-shadow">Our Mission</h2>
              <p className="text-lg text-white/70 mb-6 leading-relaxed text-shadow">
                To inspire and empower students to become successful entrepreneurs by providing 
                them with the necessary skills, knowledge, and resources to turn their ideas into reality.
              </p>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-white mr-3 flex-shrink-0 neon-glow" size={20} />
                    <span className="text-white/90 text-shadow">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-3xl font-bold mb-6 text-white text-shadow">Our Vision</h3>
              <p className="text-lg text-white/70 mb-6 leading-relaxed text-shadow">
                To be the leading student organization that cultivates the next generation of 
                entrepreneurs and innovators who will drive positive change in society.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass-card rounded-lg">
                  <div className="text-3xl font-bold text-white neon-glow">500+</div>
                  <div className="text-sm text-white/70">Members</div>
                </div>
                <div className="text-center p-4 glass-card rounded-lg">
                  <div className="text-3xl font-bold text-white neon-glow">50+</div>
                  <div className="text-sm text-white/70">Events</div>
                </div>
                <div className="text-center p-4 glass-card rounded-lg">
                  <div className="text-3xl font-bold text-white neon-glow">20+</div>
                  <div className="text-sm text-white/70">Startups</div>
                </div>
                <div className="text-center p-4 glass-card rounded-lg">
                  <div className="text-3xl font-bold text-white neon-glow">100+</div>
                  <div className="text-sm text-white/70">Mentors</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              The principles that guide everything we do at E-Cell
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center"
              >
                <div className={`w-16 h-16 ${value.color} backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 neon-glow`}>
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white text-shadow">{value.title}</h3>
                <p className="text-white/70 leading-relaxed text-shadow">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
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
              Our Journey
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              From humble beginnings to becoming a leading entrepreneurship organization
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 neon-glow">
                  1
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white text-shadow">Foundation (2020)</h3>
                  <p className="text-white/70 text-shadow">E-Cell was established with a vision to foster entrepreneurship among students. Started with just 20 members and a dream to make a difference.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 neon-glow">
                  2
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white text-shadow">Growth & Expansion (2021-2022)</h3>
                  <p className="text-white/70 text-shadow">Expanded our reach with more events, workshops, and mentorship programs. Successfully launched our first startup incubation program.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 neon-glow">
                  3
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white text-shadow">Innovation & Leadership (2023-Present)</h3>
                  <p className="text-white/70 text-shadow">Became the leading entrepreneurship organization in the region. Launched innovative programs and established strong industry partnerships.</p>
                </div>
              </motion.div>
            </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">Join Our Community</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto text-shadow">
                Ready to start your entrepreneurial journey? Join E-Cell and be part of something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/team" className="btn-outline border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 neon-glow">
                  Meet Our Team
                </Link>
                <Link href="/events" className="bg-white text-black hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 neon-glow">
                  View Events
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