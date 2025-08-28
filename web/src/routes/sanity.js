import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: 'opgd2bhj',
    dataset: 'production',
    useCdn: true, // set to false to bypass the edge cache
    apiVersion: '2024-09-27', // use current date (YYYY-MM-DD) to target the latest API version
  })
  
  // uses GROQ to query content: https://www.sanity.io/docs/groq
  export async function getPOU() {
    const posts = await client.fetch('*[_type == "pointsOfUnity" && _id =="pointsOfUnity"][0]')
    return posts.content
  }