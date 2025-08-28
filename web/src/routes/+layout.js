import { getPOU } from './sanity.js';

export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
    const pointsOfUnity = await getPOU();
    return { pointsOfUnity };
}