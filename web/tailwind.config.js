/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				black: '#1C1C1C', // Keep the custom black color for text
			},
			fontSize: {
				base: '1.125rem',    // 18px
				lg: '1.25rem',       // 20px
				xl: '1.375rem',      // 22px
				'2xl': '1.5rem',     // 24px
				'3xl': '1.875rem',   // 30px
				'4xl': '2.25rem',    // 36px
				'5xl': '3rem',       // 48px
				'6xl': '3.75rem',    // 60px
				'7xl': '4.5rem',     // 72px
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-bold': theme('colors.black'), // Updated for light mode
						'--tw-prose-headings': theme('colors.black'), // Updated for light mode
						fontSize: '1.25rem',
						p: {
							fontSize: '1.25rem',
							lineHeight: '1.75',
						},
						li: {
							fontSize: '1.25rem',
						}
					},
				},
				lg: {
					css: {
						fontSize: '1.375rem',
						p: {
							fontSize: '1.375rem',
						},
						li: {
							fontSize: '1.375rem',
						}
					}
				},
				xl: {
					css: {
						fontSize: '1.5rem',
						p: {
							fontSize: '1.5rem',
						},
						li: {
							fontSize: '1.5rem',
						}
					}
				},
				'2xl': {
					css: {
						fontSize: '1.675rem',
						p: {
							fontSize: '1.675rem',
						},
						li: {
							fontSize: '1.675rem',
						}
					}
				}
			}),
		},
		fontFamily: {
			// 'sans': ['ui-sans-serif', 'system-ui', ...],
			// 'serif': ['ui-serif', 'Georgia', ...],
			'hero': ['sztos-variable', 'sans-serif']
		}
	},

	plugins: [
		require('@tailwindcss/typography'),
	]
};
