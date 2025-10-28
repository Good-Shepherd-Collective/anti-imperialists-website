import { client } from '$lib/sanity'

export async function load() {
  const blogs = await client.fetch(`
    *[_type == "blog" && !(_id in path("drafts.**"))] {
      title,
      slug,
      "preview": body[0].children[0].text,
      author,
      "authorName": select(
        author.authorType == "memberBio" => author.memberBio->name,
        author.authorType == "standalone" => author.name
      ),
      publishedAt,
      order,
      tags,
      featured,
      volume,
      "volumeNumber": volume->number,
      "volumeIssue": volume->issue,
      "volumeOrder": volume->order,
      "volumePublishedAt": volume->publishedAt
    } | order(volumeNumber desc, volumeIssue desc, order asc, publishedAt desc)
  `)

  // console.log('First blog with volume data:', JSON.stringify(blogs[0], null, 2))

  return {
    blogs
  }
} 