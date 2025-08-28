<script>
    const socials = [
        {
            name: 'X',
            url: 'https://x.com/penandmachete',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/penandmachete',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`
        }
    ];
</script>

<!-- Desktop social links (fixed on left) -->
<div class="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
    {#each socials as social}
        <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200"
            aria-label={social.name}
        >
            {@html social.icon}
        </a>
    {/each}
</div>

<!-- Mobile social links (at bottom) -->
<div class="md:hidden flex justify-center gap-6 py-8 mt-8 border-t border-gray-800">
    {#each socials as social}
        <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200"
            aria-label={social.name}
        >
            {@html social.icon}
        </a>
    {/each}
</div> 