import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'opgd2bhj',
  dataset: 'production',
  apiVersion: '2024-03-28',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN, // Add token for authenticated requests
  perspective: 'published' // Only fetch published content
}) 