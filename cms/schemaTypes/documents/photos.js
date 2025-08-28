export const photos = {
  name: 'photos',
  title: 'Photos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive title for the photo'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption or description for the photo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      filename: 'image.asset.originalFilename'
    },
    prepare(selection) {
      return {
        title: selection.title || selection.filename || 'Photo',
        media: selection.media
      }
    }
  }
} 