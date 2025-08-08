'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface FormField {
  fieldName: string
  required?: boolean
}

interface BlogPost {
  name: string
  image: string
  link: string
}

interface ViewAll {
  label: string
  link: string
}

interface ContactSectionProps {
  title?: string
  formFields?: FormField[]
  buttonLabel?: string
  blogTitle?: string
  blogPosts?: BlogPost[]
  blogViewAll?: ViewAll
}

export default function ContactSection({ 
  title,
  formFields = [
    { fieldName: 'name', required: true },
    { fieldName: 'company', required: false },
    { fieldName: 'email', required: true },
    { fieldName: 'message', required: true }
  ],
  buttonLabel = "GET IN TOUCH",
  blogTitle,
  blogPosts = [],
  blogViewAll
}: ContactSectionProps) {
  // Initialize form data based on dynamic fields
  const initialFormData = formFields.reduce((acc, field) => {
    acc[field.fieldName] = ''
    return acc
  }, {} as Record<string, string>)
  
  const [formData, setFormData] = useState(initialFormData)
  
  // Generate placeholder text from field name
  const generatePlaceholder = (fieldName: string, required: boolean = false) => {
    const capitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    if (required) {
      return `${capitalized} *`
    } else {
      return `${capitalized} (optional)`
    }
  }

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
    <section 
      id="contact" 
      style={{
        backgroundImage: 'radial-gradient(ellipse at bottom, hsla(271, 100%, 53%, 1) 0%, hsla(0, 0%, 0%, 1) 40%)',
        backgroundSize: '250% 100%',
        backgroundPosition: 'center'
      }}
      className="py-16 md:py-24"
    >
      {/* Blog Section */}
      {blogTitle && blogPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-[24px] md:text-[36px] text-white text-left">
                {blogTitle}
              </h2>
              {blogViewAll && (
                <button 
                  onClick={() => window.open(blogViewAll.link, '_blank', 'noopener,noreferrer')}
                  className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors duration-200"
                >
                  {blogViewAll.label}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 3).map((post, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => window.open(post.link, '_blank', 'noopener,noreferrer')}
                >
                  <div className="relative h-60 w-full">
                    <Image
                      src={post.image}
                      alt={post.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className='py-4'>
                    <h3 className="poppins-medium text-[16px] text-white leading-tight text-left">
                      {post.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto px-10 sm:px-6 lg:px-8">
        <div className="text-left mb-10">
          <h2 className="text-[30px] text-white">
            {title}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamic form fields */}
          {formFields.map((field, index) => {
            // First 2 fields side by side on desktop, rest full width
            if (index === 0) {
              return (
                <div key="first-two" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      id={formFields[0].fieldName}
                      name={formFields[0].fieldName}
                      value={formData[formFields[0].fieldName] || ''}
                      onChange={handleInputChange}
                      required={formFields[0].required}
                      placeholder={generatePlaceholder(formFields[0].fieldName, formFields[0].required)}
                      className="w-full bg-transparent border-b border-white text-white placeholder-white py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                    />
                  </div>
                  {formFields[1] && (
                    <div>
                      <input
                        type="text"
                        id={formFields[1].fieldName}
                        name={formFields[1].fieldName}
                        value={formData[formFields[1].fieldName] || ''}
                        onChange={handleInputChange}
                        required={formFields[1].required}
                        placeholder={generatePlaceholder(formFields[1].fieldName, formFields[1].required)}
                        className="w-full bg-transparent border-b border-white text-white placeholder-white py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                      />
                    </div>
                  )}
                </div>
              )
            } else if (index === 1) {
              // Skip index 1 as it's handled above with index 0
              return null
            } else {
              // Rest of fields full width
              return (
                <div key={field.fieldName}>
                  <input
                    type="text"
                    id={field.fieldName}
                    name={field.fieldName}
                    value={formData[field.fieldName] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    placeholder={generatePlaceholder(field.fieldName, field.required)}
                    className="w-full bg-transparent border-b border-white text-white placeholder-white py-3 px-0 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                  />
                </div>
              )
            }
          })}
          
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}