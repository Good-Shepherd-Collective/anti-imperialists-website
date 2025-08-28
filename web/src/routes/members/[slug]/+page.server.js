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

// This function tells SvelteKit which slugs to prerender
export const entries = async () => {
    const members = await client.fetch(`*[_type == "memberBio"]{ "slug": slug.current }`)
    return members.map(member => ({ slug: member.slug }))
} 