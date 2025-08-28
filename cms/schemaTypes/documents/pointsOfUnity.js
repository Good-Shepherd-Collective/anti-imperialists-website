import { defineType, defineField } from 'sanity'
import { AsteriskIcon } from '@sanity/icons'

export const pointsOfUnity = defineType({
  name: 'pointsOfUnity',
  title: 'Points of Unity',
  type: 'document',
  icon: AsteriskIcon,
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
        title: 'Points of Unity'
      }
    }
  },
  initialValue: {
    content: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Enter your points of unity here...'
      }]
    }]
  }
})

