import { client } from '$lib/sanity'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const statement = await client.fetch(`
        *[_type == "statementsSeries" && _id == $id][0] {
            _id,
            title,
            content,
            image{
                alt,
                asset->
            }
        }
    `, {
        id: params.slug
    })

    if (!statement) {
        throw error(404, 'Statement not found')
    }

    return {
        statement
    }
} 