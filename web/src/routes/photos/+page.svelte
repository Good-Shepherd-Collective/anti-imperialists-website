<script>
    export let data;
    const { photos } = data;
    let selectedPhoto = null;
    
    function openLightbox(photo) {
        selectedPhoto = photo;
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        selectedPhoto = null;
        document.body.style.overflow = 'auto';
    }
</script>

<main class="relative bg-white dark:bg-black text-black dark:text-white min-h-screen ">
    <div class="container mx-auto px-4 max-w-6xl">
        <h1 class="mt-12 font-hero text-4xl md:text-5xl text-center lg:text-5xl text-[#2E8B57] mb-12">Photos</h1>

        {#if photos && photos.length > 0}
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each photos as photo}
                    <article 
                        class="bg-white dark:bg-black border-2 border-[#2E8B57] transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer shadow-lg"
                        on:click={() => openLightbox(photo)}
                    >
                        <div class="aspect-square">
                            <img 
                                src={photo.imageUrl} 
                                alt=""
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </article>
                {/each}
            </div>
        {:else}
            <p class="text-center text-gray-600 dark:text-gray-400 text-xl">No photos available.</p>
        {/if}
    </div>
</main>

{#if selectedPhoto}
    <div 
        class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        on:click={closeLightbox}
    >
        <button 
            class="absolute top-4 right-4 text-[#2E8B57] text-4xl font-bold hover:text-[#FF6347] z-50"
            on:click={closeLightbox}
        >
            ×
        </button>
        
        <img 
            src={selectedPhoto.imageUrl} 
            alt="" 
            class="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain"
            on:click|stopPropagation
        />
    </div>
{/if}

<style>
    /* Prevent scrolling when lightbox is open */
    :global(body.lightbox-open) {
        overflow: hidden;
    }
</style> 