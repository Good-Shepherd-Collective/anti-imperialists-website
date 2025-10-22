<script>
  export let data;
  const { episodes, featuredEpisode, apiKeyMissing } = data;

  let selectedEpisode = featuredEpisode;

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '0M').replace('M', '');
    const seconds = (match[3] || '0S').replace('S', '');

    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }

  function selectEpisode(episode) {
    selectedEpisode = episode;
    // Scroll to top of player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>The Pen is My Machete - Podcast</title>
</svelte:head>

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
  <!-- Header -->
  <header class="border-b border-gray-200 dark:border-gray-800 pt-24">
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-hero text-[#2E8B57] tracking-tight">
          The Pen is My Machete: An Anti-imperialist Podcast
        </h1>
      </div>
    </div>
  </header>

  {#if apiKeyMissing}
    <!-- API Key Missing Message -->
    <section class="container mx-auto px-6 py-16 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-hero text-[#FF6347] mb-4">YouTube API Key Required</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          To display podcast episodes from YouTube, you need to add your YouTube API key to the .env file.
        </p>
        <div class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg text-left">
          <p class="font-mono text-sm mb-4">YOUTUBE_API_KEY=your_key_here</p>
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#FF6347] hover:text-[#2E8B57] underline"
          >
            Get your API key from Google Cloud Console →
          </a>
        </div>
      </div>
    </section>
  {:else if !selectedEpisode && episodes.length === 0}
    <!-- No Episodes Message -->
    <section class="container mx-auto px-6 py-16 text-center">
      <p class="text-gray-600 dark:text-gray-400">No episodes found. Check back soon!</p>
    </section>
  {:else}
    <!-- Player Section -->
    <section class="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">
          {#if selectedEpisode}
            <!-- Video Player -->
            <div class="aspect-video mb-8 bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${selectedEpisode.id}?modestbranding=1&rel=0&color=white`}
                title={selectedEpisode.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>

            <!-- Now Playing Info -->
            <div class="text-center mb-8">
              <p class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Now Playing
              </p>
              <h2 class="text-3xl md:text-4xl font-hero text-black dark:text-white mb-3 leading-tight">
                {selectedEpisode.title}
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Episode {selectedEpisode.number} · {formatDuration(selectedEpisode.duration)}
              </p>
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- Episodes List Section -->
    <section class="container mx-auto px-6 py-16" id="episodes">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-hero text-[#2E8B57] mb-12">
          Recent Episodes
        </h2>

      <div class="space-y-1">
        {#each episodes as episode}
          <article
            class="border-t border-gray-200 dark:border-gray-800 py-8 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-950 group"
            on:click={() => selectEpisode(episode)}
            on:keydown={(e) => e.key === 'Enter' && selectEpisode(episode)}
            role="button"
            tabindex="0"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Thumbnail -->
              <div class="flex-shrink-0">
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  class="w-full md:w-56 h-auto md:h-32 object-cover rounded shadow-lg"
                />
              </div>

              <!-- Episode Info -->
              <div class="flex-1 flex justify-between gap-4">
                <div class="flex-1">
                  <!-- Episode Header -->
                  <div class="flex items-baseline gap-4 mb-3">
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {episode.number}
                    </span>
                    <h3 class="text-xl md:text-2xl font-hero text-black dark:text-white group-hover:text-[#FF6347] transition-colors">
                      {episode.title}
                    </h3>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 max-w-3xl">
                    {episode.description}
                  </p>

                  <!-- Metadata -->
                  <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatDate(episode.publishedAt)}</span>
                    <span>·</span>
                    <span>{formatDuration(episode.duration)}</span>
                  </div>
                </div>

                <!-- Arrow Icon -->
                <svg
                  class="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-[#2E8B57] group-hover:translate-x-1 transition-all mt-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        {/each}
      </div>
      </div>
    </section>
  {/if}
</main>