export default {
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Service Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
              media: 'image'
            },
            prepare({title, description, media}) {
              const shortDescription = description ? description.substring(0, 60) + '...' : ''
              return {
                title: title,
                subtitle: shortDescription,
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'testimonialsLabel',
      title: 'Testimonials Label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Profile Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'comment',
              title: 'Testimonial Comment',
              type: 'text',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              name: 'name',
              position: 'position',
              comment: 'comment',
              media: 'image'
            },
            prepare({name, position, comment, media}) {
              const shortComment = comment ? comment.substring(0, 60) + '...' : ''
              return {
                title: name,
                subtitle: `${position} - ${shortComment}`,
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      services: 'services',
      testimonials: 'testimonials'
    },
    prepare({services, testimonials}) {
      const serviceCount = services ? services.length : 0
      const testimonialCount = testimonials ? testimonials.length : 0
      return {
        title: 'Services Section',
        subtitle: `${serviceCount} service${serviceCount !== 1 ? 's' : ''}, ${testimonialCount} testimonial${testimonialCount !== 1 ? 's' : ''}`
      }
    }
  }
}