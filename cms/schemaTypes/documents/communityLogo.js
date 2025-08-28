import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const communityLogo = defineType({
  name: 'communityLogo',
  title: 'Community Logo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Organization Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Logo',
      type: 'imageBlock',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Use this to control the order of logos (lower numbers appear first)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}) 