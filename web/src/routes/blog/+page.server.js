import { client } from '$lib/sanity'
import { error } from '@sveltejs/kit'

export async function load() {
  try {
    console.log('Fetching blog data...')
    
    const [volumes, editorialStatement, submissionInstructions, editorialBoard] = await Promise.all([
      client.fetch(`
        *[_type == "volume"] | order(number asc) {
          _id,
          number,
          title,
          description,
          "posts": *[_type == "blog" && references(^._id)] {
            _id,
            title,
            "slug": slug.current,
            "author": author->name,
            "featured": coalesce(featured, false),
            publishedAt,
            mainImage{
              alt,
              asset->
            }
          } | order(publishedAt desc)
        }
      `),
      client.fetch(`*[_type == "editorialStatement"][0].content`),
      client.fetch(`*[_type == "submissionInstructions"][0].content`),
      client.fetch(`
        *[_type == "memberBio" && editorialBoardMember == true] | order(name asc) {
          name,
          "bio": bio,
          affiliation,
          "slug": slug.current
        }
      `)
    ]);

    console.log('Volumes data:', volumes)

    if (!volumes) {
      throw error(500, 'Failed to load volumes')
    }

    return {
      volumes,
      editorialStatement,
      submissionInstructions,
      editorialBoard
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    throw error(500, {
      message: 'Error loading blog data',
      details: err.message
    })
  }
} 