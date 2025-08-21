'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Send, CheckCircle, Clock, AlertCircle, XCircle, Eye, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarField from '@/components/StarField'
import SpaceEffects from '@/components/SpaceEffects'
import Link from 'next/link'

interface IdeaSuggestion {
  id: string
  title: string
  description: string
  category: string
  submitterName?: string
  submitterEmail?: string
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'IMPLEMENTED'
  adminNotes?: string
  createdAt: string
}

export default function SuggestionsPage() {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<IdeaSuggestion[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    submitterName: '',
    submitterEmail: '',
    trackingEmail: ''
  })

  const categories = [
    'Events & Workshops',
    'Technology & Innovation',
    'Networking & Mentorship',
    'Competitions & Challenges',
    'Educational Content',
    'Community Building',
    'Partnerships & Collaborations',
    'Other'
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="text-green-400" size={16} />
      case 'UNDER_REVIEW':
        return <Clock className="text-yellow-400" size={16} />
      case 'PENDING':
        return <Clock className="text-blue-400" size={16} />
      case 'REJECTED':
        return <XCircle className="text-red-400" size={16} />
      case 'IMPLEMENTED':
        return <CheckCircle className="text-green-500" size={16} />
      default:
        return <Clock className="text-white/60" size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'text-green-400'
      case 'UNDER_REVIEW':
        return 'text-yellow-400'
      case 'PENDING':
        return 'text-blue-400'
      case 'REJECTED':
        return 'text-red-400'
      case 'IMPLEMENTED':
        return 'text-green-500'
      default:
        return 'text-white/60'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          submitterName: formData.submitterName || undefined,
          submitterEmail: formData.submitterEmail || undefined,
        }),
      })

      if (response.ok) {
        toast.success('Idea submitted successfully!')
        setFormData({
          title: '',
          description: '',
          category: '',
          submitterName: '',
          submitterEmail: '',
          trackingEmail: formData.trackingEmail
        })
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit idea')
      }
    } catch (error) {
      console.error('Error submitting idea:', error)
      toast.error('Failed to submit idea')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTrackIdeas = async () => {
    if (!formData.trackingEmail) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/suggestions?email=${encodeURIComponent(formData.trackingEmail)}`)
      
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.data || [])
        if (data.data?.length === 0) {
          toast.success('No suggestions found for this email address')
        }
      } else {
        toast.error('Failed to fetch suggestions')
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      toast.error('Failed to fetch suggestions')
    } finally {
      setIsLoading(false)
    }
  }

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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 neon-glow">
                <Lightbulb className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              <span className="text-white neon-glow">Dumpbox</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 text-shadow">
              Drop your wildest ideas, feedback, or random thoughts here. This is your creative dumpbox - no filters, just pure innovation!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 rounded-lg">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'submit'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
Dump Ideas
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'track'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Track Dumps
              </button>
            </div>
          </div>
        </div>

        {/* Submit Idea Tab */}
        {activeTab === 'submit' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">🗑️ Dump Your Idea</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    What's on your mind? *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                    placeholder="Give your idea a crazy title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors resize-none"
                    placeholder="Dump all your thoughts here... crazy ideas, feedback, complaints, dreams - anything goes!"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.submitterName}
                      onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                      placeholder="Anonymous dumper or real name?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.submitterEmail}
                      onChange={(e) => setFormData({...formData, submitterEmail: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-white/70">
                    🗑️ <strong>Dumpbox Rules:</strong> No idea is too weird, no feedback is too harsh. We read everything and love the chaos. Leave your email if you want updates on your dump!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Dumping...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Dump It!</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Track Ideas Tab */}
        {activeTab === 'track' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Track Your Ideas</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Enter your email address to view your submitted ideas
                </label>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    value={formData.trackingEmail}
                    onChange={(e) => setFormData({...formData, trackingEmail: e.target.value})}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                    placeholder="your.email@example.com"
                  />
                  <button
                    onClick={handleTrackIdeas}
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <Eye size={20} />
                        <span>Track Ideas</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Submitted Ideas</h3>
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="glass-card p-6 border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">{suggestion.title}</h4>
                          <p className="text-white/70 mb-3">{suggestion.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-white/60">Category: {suggestion.category}</span>
                            <span className="text-white/60">
                              Submitted: {new Date(suggestion.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusIcon(suggestion.status)}
                          <span className={`text-sm font-medium ${getStatusColor(suggestion.status)}`}>
                            {suggestion.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      {suggestion.adminNotes && (
                        <div className="mt-4 p-3 bg-white/5 rounded-lg">
                          <p className="text-sm text-white/80">
                            <strong>Admin Notes:</strong> {suggestion.adminNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
        </div>
      </section>

      <Footer />
    </div>
  )
} 
