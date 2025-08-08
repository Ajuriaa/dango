export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fieldsets: [
    { name: 'header', title: 'Header Section' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'stats', title: 'Stats Section' },
    { name: 'highlights', title: 'Highlights Section' },
    { name: 'services', title: 'Services Section' },
    { name: 'partners', title: 'Partners Section' },
    { name: 'ourTeam', title: 'Our Team Section' },
    { name: 'ourWorks', title: 'Our Works Section' },
    { name: 'blog', title: 'Blog Section' },
    { name: 'contact', title: 'Contact Section' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Title of the page for internal reference',
      validation: Rule => Rule.required(),
    },
    // Header Section Fields
    {
      name: 'headerLogo',
      title: 'Header Logo',
      type: 'image',
      fieldset: 'header',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'headerCtaButtonLabel',
      title: 'Header CTA Button Label',
      type: 'string',
      fieldset: 'header',
      validation: Rule => Rule.required()
    },
    {
      name: 'navigationItems',
      title: 'Header Navigation Items',
      type: 'array',
      fieldset: 'header',
      description: 'Navigation labels for the header menu (e.g., Services, Our Work, Team, Contact)',
      of: [
        {
          type: 'string'
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    // Hero Section Fields
    {
      name: 'heroTitle',
      title: 'Title',
      type: 'string',
      fieldset: 'hero',
    },
    {
      name: 'heroSubtitle',
      title: 'Subtitle',
      type: 'string',
      fieldset: 'hero',
      validation: Rule => Rule.required()
    },
    {
      name: 'shopifyPartnerImage',
      title: 'Shopify Partner Image',
      type: 'image',
      fieldset: 'hero',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      fieldset: 'hero',
      options: {
        accept: 'video/*'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainButtonLabel',
      title: 'Main Button Label',
      type: 'string',
      fieldset: 'hero',
      validation: Rule => Rule.required()
    },
    {
      name: 'scrollItems',
      title: 'Horizontal Scroll Items',
      type: 'array',
      fieldset: 'hero',
      description: 'Items that appear in the horizontal scrolling section',
      of: [
        {
          type: 'string'
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    // Stats Section Fields
    {
      name: 'statsTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'stats',
      validation: Rule => Rule.required()
    },
    {
      name: 'statsDescription',
      title: 'Section Description',
      type: 'text',
      fieldset: 'stats',
      validation: Rule => Rule.required()
    },
    {
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      fieldset: 'stats',
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
    },
    // Highlights Section Fields
    {
      name: 'highlightsLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'highlights',
      description: 'The small label that appears above the title (e.g., "Highlights")',
      validation: Rule => Rule.required()
    },
    {
      name: 'highlightsTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'highlights',
      validation: Rule => Rule.required()
    },
    {
      name: 'workCards',
      title: 'Work Cards',
      type: 'array',
      fieldset: 'highlights',
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
            },
            {
              name: 'link',
              title: 'Project Link',
              type: 'url',
              description: 'URL to the project or case study (optional)',
              validation: Rule => Rule.uri({
                scheme: ['http', 'https']
              })
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
    },
    // Services Section Fields
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      fieldset: 'services',
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
      name: 'testimonialsSectionLabel',
      title: 'Testimonials Section Label',
      type: 'string',
      fieldset: 'services',
      description: 'Small uppercase label that appears above testimonials title (e.g., "Testimonials")',
      validation: Rule => Rule.required()
    },
    {
      name: 'testimonialsLabel',
      title: 'Testimonials Label',
      type: 'string',
      fieldset: 'services',
      validation: Rule => Rule.required()
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      fieldset: 'services',
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
    },
    // Partners Section Fields
    {
      name: 'partnersTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'partners',
      description: 'Main title that appears above the section label',
      validation: Rule => Rule.required()
    },
    {
      name: 'partnersLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'partners',
      validation: Rule => Rule.required()
    },
    {
      name: 'partners',
      title: 'Partners',
      type: 'array',
      fieldset: 'partners',
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
            },
            {
              name: 'link',
              title: 'Partner Website Link',
              type: 'url',
              description: 'URL to the partner website (opens in new tab when clicked)',
              validation: Rule => Rule.uri({
                scheme: ['http', 'https']
              })
            },
            {
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              description: 'Partner name for accessibility and preview'
            }
          ],
          preview: {
            select: {
              name: 'name',
              link: 'link',
              media: 'image'
            },
            prepare({name, link, media}) {
              return {
                title: name || 'Partner Logo',
                subtitle: link || 'No website link',
                media: media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    // Our Team Section Fields
    {
      name: 'ourTeamLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'ourTeam',
      validation: Rule => Rule.required()
    },
    {
      name: 'ourTeamDescription',
      title: 'Section Description',
      type: 'text',
      fieldset: 'ourTeam',
      validation: Rule => Rule.required()
    },
    {
      name: 'teamCards',
      title: 'Team Cards',
      type: 'array',
      fieldset: 'ourTeam',
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
    },
    // Our Works Section Fields
    {
      name: 'ourWorksTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'ourWorks',
      validation: Rule => Rule.required()
    },
    {
      name: 'works',
      title: 'Works',
      type: 'array',
      fieldset: 'ourWorks',
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
    },
    {
      name: 'ourWorksViewAll',
      title: 'View All Projects Link',
      type: 'object',
      fieldset: 'ourWorks',
      fields: [
        {
          name: 'label',
          title: 'Link Label',
          type: 'string',
          description: 'Text shown for the link (e.g., "View All Projects")',
          validation: Rule => Rule.required()
        },
        {
          name: 'link',
          title: 'Link URL',
          type: 'url',
          description: 'URL to the full projects page',
          validation: Rule => Rule.required().uri({
            scheme: ['http', 'https']
          })
        }
      ],
      preview: {
        select: {
          title: 'label',
          subtitle: 'link'
        },
        prepare({title, subtitle}) {
          return {
            title: title,
            subtitle: subtitle
          }
        }
      }
    },
    // Blog Section Fields
    {
      name: 'blogTitle',
      title: 'Blog Section Title',
      type: 'string',
      fieldset: 'blog',
      description: 'Main title for the blog section',
      validation: Rule => Rule.required()
    },
    {
      name: 'blogPosts',
      title: 'Blog Posts',
      type: 'array',
      fieldset: 'blog',
      description: 'Collection of blog posts',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Post Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Post Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'link',
              title: 'Post Link',
              type: 'url',
              description: 'URL to the full blog post',
              validation: Rule => Rule.required().uri({
                scheme: ['http', 'https']
              })
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'link',
              media: 'image'
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
      ],
      validation: Rule => Rule.min(1)
    },
    {
      name: 'blogViewAll',
      title: 'View All Articles Link',
      type: 'object',
      fieldset: 'blog',
      fields: [
        {
          name: 'label',
          title: 'Link Label',
          type: 'string',
          description: 'Text shown for the link (e.g., "View All Articles")',
          validation: Rule => Rule.required()
        },
        {
          name: 'link',
          title: 'Link URL',
          type: 'url',
          description: 'URL to the full articles page',
          validation: Rule => Rule.required().uri({
            scheme: ['http', 'https']
          })
        }
      ],
      preview: {
        select: {
          title: 'label',
          subtitle: 'link'
        },
        prepare({title, subtitle}) {
          return {
            title: title,
            subtitle: subtitle
          }
        }
      }
    },
    // Contact Section Fields
    {
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      fieldset: 'contact',
      description: 'Main title for the contact section (e.g., "Ready to level up your store? Let\'s chat.")',
      validation: Rule => Rule.required()
    },
    {
      name: 'contactFormFields',
      title: 'Contact Form Fields',
      type: 'array',
      fieldset: 'contact',
      description: 'Dynamic form fields with labels and types',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fieldName',
              title: 'Field Name',
              type: 'string',
              description: 'Field name (e.g., "name", "email", "company", "message")',
              validation: Rule => Rule.required()
            },
            {
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              description: 'Whether this field is required',
              initialValue: false
            }
          ],
          preview: {
            select: {
              fieldName: 'fieldName',
              required: 'required'
            },
            prepare({fieldName, required}) {
              const capitalizedName = fieldName ? fieldName.charAt(0).toUpperCase() + fieldName.slice(1) : ''
              const suffix = required ? ' *' : ' (optional)'
              return {
                title: `${capitalizedName}${suffix}`,
                subtitle: `Field: ${fieldName}`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'contactButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      fieldset: 'contact',
      description: 'Label for the submit button',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}