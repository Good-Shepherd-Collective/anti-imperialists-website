import { client } from '$lib/sanity'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const member = await client.fetch(`
        *[_type == "memberBio" && slug.current == $slug][0] {
            name,
            role,
            imageUrl,
            bio,
            slug
        }
    `, {
        slug: params.slug
    })

    if (!member) {
        throw error(404, 'Member not found')
    }

    return {
        member
    }
}

// This function runs at build time to fetch all members
export async function prerender() {
    try {
        const members = await client.fetch(`
            *[_type == "memberBio"]{
                "slug": slug.current
            }
        `)

        // Return an array of paths to prerender
        return members.map(member => ({
            slug: member.slug
        }))
    } catch (err) {
        console.error('Error fetching members for prerendering:', err)
        return []
    }
} 