import { client } from '$lib/sanity'

export async function load() {
  const pointsOfUnity = await client.fetch(`
    *[_type == "pointsOfUnity"][0] {
      content
    }
  `)

  return {
    pointsOfUnity
  }
} 