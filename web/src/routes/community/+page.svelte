<script>
    export let data;
    const { logos } = data;
</script>

<main class="relative bg-white dark:bg-black text-black dark:text-white min-h-screen pt-6">
    <div class="container mx-auto px-4 max-w-6xl">
        <h1 class="mt-12 font-hero text-4xl md:text-5xl text-center lg:text-5xl text-[#2E8B57]">Our Community</h1>
        <div class="text-lg md:text-xl mb-12">
            <span class="italic">Our Community</span> is a network of organizations and collectives that share our commitment to anti-imperialism and liberation for all peoples.
        </div>

        {#if logos && logos.length > 0}
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each logos as logo}
                    <article class="bg-white dark:bg-black border-2 border-[#2E8B57] p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-lg">
                        {#if logo.imageUrl}
                            <div class="h-48 flex items-center justify-center bg-white p-4">
                                <img 
                                    src={logo.imageUrl} 
                                    alt={logo.title}
                                    class="max-h-full w-auto object-contain"
                                />
                            </div>
                            <h2 class="font-hero text-xl font-semibold mt-4 text-[#2E8B57]">{logo.title}</h2>
                        {:else}
                            <div class="h-48 flex items-center justify-center">
                                <h2 class="text-center font-hero text-xl text-[#2E8B57] px-4 relative top-12">
                                    {logo.title}
                                </h2>
                            </div>
                        {/if}
                    </article>
                {/each}
            </div>
        {:else}
            <p class="text-center text-gray-600 dark:text-gray-400 text-xl">No community logos available.</p>
        {/if}
    </div>
</main>

