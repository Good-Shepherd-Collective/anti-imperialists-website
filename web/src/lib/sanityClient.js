import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'opgd2bhj',
  dataset: 'production',
  apiVersion: '2024-03-21', // use current date YYYY-MM-DD
  useCdn: true
}) 