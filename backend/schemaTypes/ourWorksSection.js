export default {
  name: 'ourWorksSection',
  title: 'Our Works Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'works',
      title: 'Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Work Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Image Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'alt',
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
      title: 'title',
      works: 'works'
    },
    prepare({ title, works }) {
      return {
        title: title || 'Our Works Section',
        subtitle: works ? `${works.length} work${works.length !== 1 ? 's' : ''}` : 'No works'
      }
    }
  }
}