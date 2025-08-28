import { client } from '$lib/sanity'
import { error } from '@sveltejs/kit'

export async function load() {
    try {
        const photos = await client.fetch(`
            *[_type == "photos"] {
                _id,
                "imageUrl": image.asset->url,
                image {
                    asset-> {
                        _id,
                        metadata {
                            dimensions
                        }
                    }
                }
            }
        `)

        return {
            photos
        }
    } catch (err) {
        throw error(500, err.message)
    }
} 