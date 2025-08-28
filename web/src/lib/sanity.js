import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'opgd2bhj', // Using your actual project ID
  dataset: 'production',
  apiVersion: '2024-03-28',
  useCdn: false
}) 