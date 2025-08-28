<script>
    import { PortableText } from '@portabletext/svelte'
    import ListItem from '$lib/components/ListItem.svelte';
    export let data
    const { member } = data

    const components = {
        listItem: ListItem
    };
</script>

<main class="relative bg-white dark:bg-black text-black dark:text-white min-h-screen pt-36">
    <div class="container mx-auto px-4 max-w-4xl">
        <article class="bg-white dark:bg-black border-2 border-[#2E8B57] p-8 shadow-lg">
            <div class="flex flex-col items-center mb-8">
                {#if member.imageUrl}
                    <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        class="w-64 h-64 rounded-full object-cover border-4 border-[#2E8B57] mb-6"
                    />
                {/if}
                <h1 class="font-hero text-4xl md:text-5xl text-center text-[#2E8B57] mb-4">
                    {member.name}
                </h1>
                {#if member.role}
                    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">{member.role}</p>
                {/if}
            </div>

            <div class="prose prose-lg max-w-none">
                {#if member.bio}
                    <PortableText value={member.bio} components={components} />
                {:else}
                    <p class="text-gray-600 dark:text-gray-400 text-center">No biography available.</p>
                {/if}
            </div>
        </article>

        <div class="mt-8 text-center">
            <a 
                href="/members" 
                class="inline-block text-[#2E8B57] hover:text-[#FF6347] font-bold uppercase tracking-wider transition-colors duration-300"
            >
                ← Back to Team
            </a>
        </div>
    </div>
</main>

<style lang="postcss">
    :global(.prose) {
        @apply text-gray-800 dark:text-gray-200;
    }
    
    :global(.prose strong) {
        @apply text-[#2E8B57];
    }
    
    :global(.prose a) {
        @apply text-[#2E8B57] hover:text-[#FF6347] transition-colors duration-300;
    }
</style> 