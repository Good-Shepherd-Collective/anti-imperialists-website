import {defineType, defineField} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'reference',
      to: [{type: 'volume'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'imageBlock',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url'
                  }
                ]
              },
              {
                name: 'footnote',
                type: 'object',
                title: 'Footnote',
                blockEditor: {
                  icon: () => '[#]',
                  render: props => `[${props.value.number}]`
                },
                fields: [
                  {
                    name: 'number',
                    type: 'number',
                    title: 'Footnote Number',
                    validation: Rule => Rule.required()
                  },
                  {
                    name: 'text',
                    type: 'text',
                    title: 'Footnote Text',
                    validation: Rule => Rule.required()
                  }
                ]
              }
            ]
          }
        },
        {type: 'image'}
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Add tags to categorize your blog post'
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Set the display order for this post (lower numbers appear first)',
      validation: Rule => Rule.min(0).integer()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'authorType',
          title: 'Author Type',
          type: 'string',
          options: {
            list: [
              {title: 'Member Bio', value: 'memberBio'},
              {title: 'Non-Member', value: 'standalone'}
            ]
          },
          validation: Rule => Rule.required(),
        },
        {
          name: 'memberBio',
          title: 'Member Bio',
          type: 'reference',
          to: [{type: 'memberBio'}],
          hidden: ({parent}) => parent?.authorType !== 'memberBio',
          validation: Rule => Rule.custom((value, context) => {
            const authorType = context.parent?.authorType;
            if (authorType === 'memberBio' && !value) {
              return 'Member Bio is required when Author Type is Member Bio';
            }
            return true;
          })
        },
        {
          name: 'name',
          title: 'Non-Member Author Name',
          type: 'string',
          hidden: ({parent}) => parent?.authorType !== 'standalone',
          validation: Rule => Rule.custom((value, context) => {
            const authorType = context.parent?.authorType;
            if (authorType === 'standalone' && !value) {
              return 'Name is required when Author Type is Non-Member';
            }
            return true;
          })
        }
      ],
      description: 'Choose member from bio or add non-member author'
    }),
    defineField({
      name: 'featured',
      title: 'Original Post',
      type: 'boolean',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      volume: 'volume.number',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author, volume} = selection
      return {
        ...selection,
        subtitle: `${volume ? `Volume ${volume} - ` : ''}${author ? `by ${author}` : ''}`
      }
    }
  }
}) 