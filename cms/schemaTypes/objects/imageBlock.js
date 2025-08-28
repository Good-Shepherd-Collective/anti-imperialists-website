import {defineType, defineField} from 'sanity'

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
})