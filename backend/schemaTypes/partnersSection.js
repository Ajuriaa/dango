export default {
  name: 'partnersSection',
  title: 'Partners Section',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Partner Image/Logo',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              media: 'image'
            },
            prepare({media}) {
              return {
                title: 'Partner Logo',
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
      label: 'label',
      partners: 'partners'
    },
    prepare({label, partners}) {
      const partnerCount = partners ? partners.length : 0
      return {
        title: label || 'Partners Section',
        subtitle: `${partnerCount} partner${partnerCount !== 1 ? 's' : ''}`
      }
    }
  }
}