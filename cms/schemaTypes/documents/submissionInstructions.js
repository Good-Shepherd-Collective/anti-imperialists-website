import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const submissionInstructions = defineType({
  name: 'submissionInstructions',
  title: 'Submission Instructions',
  type: 'document',
  icon: DocumentTextIcon,
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
        title: 'Submission Instructions'
      }
    }
  }
}) 