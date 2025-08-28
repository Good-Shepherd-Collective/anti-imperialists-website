import { client } from '$lib/sanity'

export async function load() {
  const blogs = await client.fetch(`
    *[_type == "blog" && featured == true ] | order(publishedAt desc) {
      title,
      slug,
      "preview": body[0].children[0].text,
      "author": author->name,
      publishedAt
    }
  `)

  return {
    blogs
  }
} 