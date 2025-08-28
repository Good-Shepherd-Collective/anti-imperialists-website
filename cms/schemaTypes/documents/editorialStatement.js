import { defineType, defineField } from 'sanity'
import { EditIcon } from '@sanity/icons'

export const editorialStatement = defineType({
  name: 'editorialStatement',
  title: 'Editorial Statement',
  type: 'document',
  icon: EditIcon,
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Editorial Statement'
      }
    }
  }
}) 