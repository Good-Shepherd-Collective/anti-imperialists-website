<script>
    export let data;
    const { members } = data;
</script>

<div class="container mx-auto px-4 max-w-6xl mt-24">
    
    {#if members && members.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each members as member}
                <a 
                    href="/members/{member.slug.current}" 
                    class="block transform transition-all duration-300 hover:scale-105"
                >
                    <div class="border-2 border-[#2E8B57] bg-white dark:bg-black shadow-lg overflow-hidden">
                        {#if member.imageUrl}
                            <img 
                                src={member.imageUrl} 
                                alt={member.name}
                                class="w-full h-64 object-cover"
                            />
                        {/if}
                        <div class="p-6">
                            <h2 class="text-2xl font-semibold mb-2 text-black dark:text-white">{member.name}</h2>
                            {#if member.role}
                                <p class="text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
                            {/if}
                            <span class="text-[#2E8B57] hover:text-[#FF6347] font-bold uppercase tracking-wider transition-colors duration-300">
                                View Profile →
                            </span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-600 dark:text-gray-400">No team members found.</p>
    {/if}
</div> 