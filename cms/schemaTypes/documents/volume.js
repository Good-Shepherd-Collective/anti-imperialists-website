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
      name: 'issue',
      title: 'Issue Number',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Volume Title',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Set the display order for this volume (higher numbers appear first)',
      validation: Rule => Rule.min(0).integer()
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
      issue: 'issue',
    },
    prepare(selection) {
      const {title, number, issue} = selection
      const issueText = issue ? ` - ${issue}` : ''
      const titleText = title ? `: ${title}` : ''
      return {
        title: `Volume ${number}${issueText}${titleText}`,
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