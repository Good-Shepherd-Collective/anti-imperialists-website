import {defineType} from 'sanity'

export const statementsSeries = defineType({
  name: 'statementsSeries',
  title: 'Statements (Series)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageBlock',
    },
  ]
})