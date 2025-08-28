import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {wordImportTool} from './plugins/wordImport'
import {multiImageUpload} from './plugins/multiImageUpload'

export default defineConfig({
  name: 'default',
  title: 'AISC',

  projectId: 'opgd2bhj',
  dataset: 'production',

  plugins: [
    deskTool({
      structure
    }),
    visionTool(),
    wordImportTool(),
    multiImageUpload()
  ],

  schema: {
    types: schemaTypes,
  },
})
