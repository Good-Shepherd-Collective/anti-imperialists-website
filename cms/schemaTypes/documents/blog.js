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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'memberBio'}],
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