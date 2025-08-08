'use client'

import { useState } from 'react'

interface FormField {
  fieldName: string
  required?: boolean
}

interface ContactSectionProps {
  title?: string
  formFields?: FormField[]
  buttonLabel?: string
}

export default function ContactSection({ 
  title,
  formFields = [
    { fieldName: 'name', required: true },
    { fieldName: 'company', required: false },
    { fieldName: 'email', required: true },
    { fieldName: 'message', required: true }
  ],
  buttonLabel = "GET IN TOUCH"
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