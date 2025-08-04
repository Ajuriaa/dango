export default {
  name: 'statsSection',
  title: 'Stats Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
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
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Stat Number',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Stat Description',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              number: 'number',
              description: 'description'
            },
            prepare({number, description}) {
              return {
                title: number,
                subtitle: description
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(6)
    }
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description'
    },
    prepare({title, description}) {
      return {
        title: title,
        subtitle: description
      }
    }
  }
}