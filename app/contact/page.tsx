'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowLeft,
  Send,
  Clock,
  MessageSquare
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ecell@college.edu",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "College Campus, Building A, Room 101",
      description: "Visit us in person"
    },
    {
      icon: Clock,
      title: "Office Hours",
      value: "Mon-Fri: 9:00 AM - 5:00 PM",
      description: "We're here to help"
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ]

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
              Get In <span className="text-white neon-glow">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 text-shadow">
              Ready to join the entrepreneurial journey? Contact us today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
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
              Contact Information
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              Multiple ways to reach out to the E-Cell team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center floating-card"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 neon-glow">
                  <info.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white text-shadow">{info.title}</h3>
                <p className="text-white font-semibold mb-2 neon-glow">{info.value}</p>
                <p className="text-white/70 text-sm text-shadow">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white text-shadow">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="form-label text-white/90">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="Your name" 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label text-white/90">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label text-white/90">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="What's this about?" 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label text-white/90">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input h-32 resize-none" 
                    placeholder="Your message..." 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2 neon-glow">
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white text-shadow">Connect With Us</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white text-shadow">Follow Us on Social Media</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a 
                        key={social.label}
                        href={social.href}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/20 neon-glow"
                        title={social.label}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white text-shadow">Quick Links</h4>
                  <div className="space-y-2">
                    <Link href="/about" className="block text-white hover:text-white/80 transition-colors text-shadow">
                      About E-Cell
                    </Link>
                    <Link href="/events" className="block text-white hover:text-white/80 transition-colors text-shadow">
                      Upcoming Events
                    </Link>
                    <Link href="/team" className="block text-white hover:text-white/80 transition-colors text-shadow">
                      Meet Our Team
                    </Link>
                    <Link href="/timeline" className="block text-white hover:text-white/80 transition-colors text-shadow">
                      Project Timeline
                    </Link>
                  </div>
                </div>

                <div className="glass-card p-6 floating-card">
                  <div className="flex items-start space-x-4">
                    <MessageSquare className="text-white mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-2 text-white text-shadow">Need Immediate Help?</h4>
                      <p className="text-white/70 text-sm mb-3 text-shadow">
                        For urgent matters, please call us directly or visit our office during business hours.
                      </p>
                      <p className="text-sm text-white font-medium neon-glow">
                        Emergency Contact: +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white text-shadow">Find Us</h2>
            <p className="text-white/70 text-shadow">Visit our office on campus</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center floating-card"
          >
            <div className="w-full h-64 bg-white/10 backdrop-blur-md rounded-lg mb-6 flex items-center justify-center border border-white/20">
              <div className="text-center">
                <MapPin className="text-white/40 mx-auto mb-2" size={48} />
                <p className="text-white/60 text-shadow">Interactive Map Coming Soon</p>
                <p className="text-sm text-white/50 mt-2 text-shadow">College Campus, Building A, Room 101</p>
              </div>
            </div>
            <p className="text-white/70 text-shadow">
              Located in the heart of our college campus, E-Cell office is easily accessible 
              from all major buildings and parking areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient text-shadow">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto text-shadow">
              Quick answers to common questions about E-Cell
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How can I join E-Cell?",
                answer: "You can join E-Cell by attending our events, filling out the membership form, or contacting us directly. We welcome students from all backgrounds who are interested in entrepreneurship."
              },
              {
                question: "What types of events do you organize?",
                answer: "We organize workshops, competitions, networking events, summits, and mentorship programs throughout the year. Check our events page for the latest schedule."
              },
              {
                question: "Is E-Cell only for business students?",
                answer: "No! E-Cell is open to students from all disciplines. Entrepreneurship is about innovation and problem-solving, which can come from any field of study."
              },
              {
                question: "How can I get involved in E-Cell leadership?",
                answer: "We have regular elections for leadership positions. You can start by volunteering at events and gradually take on more responsibilities within the organization."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 floating-card"
              >
                <h3 className="text-lg font-bold mb-3 text-white text-shadow">{faq.question}</h3>
                <p className="text-white/70 text-shadow">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 