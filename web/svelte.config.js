import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		prerender: {
			handleHttpError: ({ message, status, path }) => {
				// ignore all 404s during prerendering
				if (status === 404 || message.includes('Not found')) {
					console.warn(`Ignoring 404 for path: ${path}`);
					return;
				}
				// otherwise fail the build
				throw new Error(message);
			},
			handleMissingId: 'ignore'
		},
		paths: {
			base: ''
		},
		appDir: 'app'
	},
	preprocess: vitePreprocess()
};

export default config;
