<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let pdfUrl = '';
  let error = false;

  onMount(() => {
    pdfUrl = $page.url.searchParams.get('url');
    if (!pdfUrl) {
      error = true;
    }
  });
</script>

<svelte:head>
  <title>PDF Viewer - Anti-Imperialists Study Circle</title>
</svelte:head>

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
  <!-- Content wrapper with proper padding for nav -->
  <div class="pt-24">
    <div class="container mx-auto px-4">
      {#if error}
        <div class="text-center py-16">
          <h1 class="text-4xl font-hero text-[#2E8B57] mb-4">No PDF Specified</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            No PDF URL was provided.
          </p>
          <a href="/blog" class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300">
            Return to Blog
          </a>
        </div>
      {:else if pdfUrl}
        <div class="mb-6">
          <a
            href="/blog"
            class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300 inline-flex items-center"
          >
            ← Back to Blog
          </a>
        </div>

        <!-- PDF Viewer Container -->
        <div class="w-full" style="height: calc(100vh - 12rem);">
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            class="w-full h-full border-2 border-[#2E8B57] rounded"
            style="min-height: 600px;"
          />
        </div>

        <!-- Download Link -->
        <div class="mt-6 text-center">
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300 underline"
          >
            Download PDF
          </a>
        </div>
      {/if}
    </div>
  </div>
</main>
