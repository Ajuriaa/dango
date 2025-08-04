export default {
  name: 'ourTeamSection',
  title: 'Our Team Section',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'teamCards',
      title: 'Team Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Team Member Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Team Member Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'label',
      description: 'description',
      teamCards: 'teamCards'
    },
    prepare({ title, description, teamCards }) {
      return {
        title: title || 'Our Team Section',
        subtitle: `${description ? description.substring(0, 50) + '...' : ''} | ${teamCards ? teamCards.length : 0} member${teamCards?.length !== 1 ? 's' : ''}`
      }
    }
  }
}