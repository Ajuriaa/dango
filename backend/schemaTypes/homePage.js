export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'shopifyPartnerImage',
      title: 'Shopify Partner Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainButtonLabel',
      title: 'Main Button Label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'scrollItems',
      title: 'Scroll Items',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage'
    },
    prepare({title, subtitle, media}) {
      return {
        title: title,
        subtitle: subtitle,
        media: media
      }
    }
  }
}