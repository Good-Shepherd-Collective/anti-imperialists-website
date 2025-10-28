import { client } from '$lib/sanity'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const { slug } = params
    
    if (!slug) {
      throw error(400, 'Invalid slug')
    }

    // console.log('Fetching blog post with slug:', slug)

    const blog = await client.fetch(`
      *[_type == "blog" && slug.current == $slug][0]{
        _id,
        title,
        author,
        "authorName": select(
          author.authorType == "memberBio" => author.memberBio->name,
          author.authorType == "standalone" => author.name
        ),
        "featured": coalesce(featured, false),
        "volume": volume->title,
        "volumeNumber": volume->number,
        mainImage{
          alt,
          asset->
        },
        body[]{
          ...,
          _type == "image" => {
            _type,
            _key,
            alt,
            asset->
          },
          markDefs[]{
            ...,
            _type == "footnote" => {
              ...
            }
          }
        },
        publishedAt,
        "slug": slug.current
      }
    `, { slug })

    // console.log('Blog post data:', blog)

    if (!blog) {
      // console.log('Blog post not found for slug:', slug)
      throw error(404, 'Blog post not found')
    }

    return {
      blog,
      status: 200
    }
  } catch (err) {
    console.error('Error loading blog post:', err)
    if (err.status === 404) {
      throw error(404, 'Blog post not found')
    }
    throw error(500, {
      message: 'Error loading blog post',
      details: err.message
    })
  }
}

// This function tells SvelteKit which slugs to prerender
export const entries = async () => {
  const posts = await client.fetch(`*[_type == "blog" && !(_id in path("drafts.**"))]{ "slug": slug.current }`)
  return posts.map(post => ({ slug: post.slug }))
} 