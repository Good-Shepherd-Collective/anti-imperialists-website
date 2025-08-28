import { client } from '$lib/sanity'

export async function load() {
    const members = await client.fetch(`
        *[_type == "memberBio"] {
            name,
            role,
            bio,
            slug,
            "imageUrl": image.asset->url
        }
    `)

    // Sort by last name (second word) in JavaScript
    const sortedMembers = members.sort((a, b) => {
        const lastNameA = a.name.split(' ')[1].toLowerCase();
        const lastNameB = b.name.split(' ')[1].toLowerCase();
        return lastNameA.localeCompare(lastNameB);
    });

    return {
        members: sortedMembers
    }
} 

