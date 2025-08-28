import {definePlugin} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import WordImportTool from './WordImportTool'

export const wordImportTool = definePlugin({
  name: 'word-import',
  tools: [
    {
      name: 'word-import',
      title: 'Import Blog Post from Word Document',
      icon: DocumentIcon,
      component: WordImportTool
    }
  ]
}) 