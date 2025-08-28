import {defineType, defineField} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const volume = defineType({
  name: 'volume',
  title: 'Volume',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'number',
      title: 'Volume Number',
      type: 'number',
      validation: Rule => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'title',
      title: 'Volume Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Volume Description',
      type: 'text',
      rows: 3,
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
      number: 'number',
    },
    prepare(selection) {
      const {title, number} = selection
      return {
        title: `Volume ${number}: ${title}`,
      }
    }
  },
  orderings: [
    {
      title: 'Volume Number',
      name: 'volumeNumber',
      by: [
        {field: 'number', direction: 'desc'}
      ]
    }
  ]
}) 