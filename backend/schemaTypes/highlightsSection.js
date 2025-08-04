export default {
  name: 'highlightsSection',
  title: 'Highlights Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'workCards',
      title: 'Work Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Project Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [
                {
                  type: 'string'
                }
              ],
              validation: Rule => Rule.required().min(1).max(5)
            },
            {
              name: 'image',
              title: 'Main Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'hoverImage',
              title: 'Hover Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              name: 'name',
              tags: 'tags',
              media: 'image'
            },
            prepare({name, tags, media}) {
              const tagsList = tags ? tags.slice(0, 3).join(', ') : ''
              return {
                title: name,
                subtitle: tagsList,
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
      title: 'title',
      workCards: 'workCards'
    },
    prepare({title, workCards}) {
      const cardCount = workCards ? workCards.length : 0
      return {
        title: title,
        subtitle: `${cardCount} work card${cardCount !== 1 ? 's' : ''}`
      }
    }
  }
}