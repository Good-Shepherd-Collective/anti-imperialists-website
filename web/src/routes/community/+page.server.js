import { client } from '$lib/sanity'

export async function load() {
    try {
        const logos = await client.fetch(`
            *[_type == "communityLogo"] {
                title,
                "imageUrl": image.image.asset->url,
                order
            }
        `)

        console.log('Raw logos data:', logos)

        return {
            logos
        }
    } catch (error) {
        console.error('Error fetching logos:', error)
        return {
            logos: []
        }
    }
} 