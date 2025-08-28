<script>
    export let data;
    const { statements } = data;
</script>

<div class="container mx-auto px-4 max-w-6xl mt-24">
    
    {#if statements && statements.length > 0}
        <div class=" gap-8">
            {#each statements as statement}
                <a 
                    href="/statements/{statement._id}" 
                    class="block transform transition-all duration-300"
                >
                    <div class="border-2 border-[#2E8B57] bg-white dark:bg-black shadow-lg overflow-hidden">
                        {#if statement.image && statement.image.asset}
                            <img 
                                src={statement.image.asset.url} 
                                alt={statement.title}
                                class="w-full h-64 object-cover"
                            />
                        {/if}
                        <div class="p-6">
                            <h2 class="text-2xl font-semibold mb-2 text-black dark:text-white">{statement.title}</h2>
                            <span class="text-[#2E8B57] hover:text-[#FF6347] font-bold uppercase tracking-wider transition-colors duration-300">
                                Read Statement →
                            </span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-600 dark:text-gray-400">No statements found.</p>
    {/if}
</div> 