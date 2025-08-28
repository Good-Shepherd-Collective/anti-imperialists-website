import { client } from '$lib/sanity'

export async function load() {
    const statements = await client.fetch(`
        *[_type == "statementsSeries"] {
            _id,
            title,
            content,
            image{
                alt,
                asset->
            }
        }
    `)

    return {
        statements
    }
} 

