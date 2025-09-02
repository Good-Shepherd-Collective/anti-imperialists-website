import {defineType, defineField} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'object',
  fields: [
    defineField({
      name: 'authorType',
      title: 'Author Type',
      type: 'string',
      options: {
        list: [
          {title: 'Member Bio', value: 'memberBio'},
          {title: 'Standalone', value: 'standalone'}
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'memberBio',
      title: 'Member Bio',
      type: 'reference',
      to: [{type: 'memberBio'}],
      hidden: ({parent}) => parent?.authorType !== 'memberBio'
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      authorType: 'authorType',
    },
    prepare(selection) {
      const {name, authorType} = selection
      return {
        title: name,
        subtitle: authorType === 'memberBio' ? 'Member' : 'Standalone'
      }
    }
  }
})