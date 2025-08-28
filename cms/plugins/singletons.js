import { definePlugin } from 'sanity'

export const singletons = definePlugin({
  name: 'singletons',
  document: {
    // New document creation
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) => template.templateId !== 'pointsOfUnity'
        )
      }
      return prev
    },
    // Document actions
    actions: (prev, { schemaType }) => {
      if (schemaType === 'pointsOfUnity') {
        return prev.filter(({ action }) => !['delete', 'duplicate'].includes(action))
      }
      return prev
    },
  },
}) 