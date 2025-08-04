'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to level up your store? Let's chat.
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-400 py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder=""
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-white text-sm font-medium mb-2">
                Company (optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-400 py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder=""
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-400 py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200"
              placeholder=""
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
              Your message*
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-400 py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200 resize-none"
              placeholder=""
            />
          </div>
          
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              GET IN TOUCH
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}