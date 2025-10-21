<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let pdfUrl = '';
  let error = false;
  let loading = true;
  let canvasContainer;
  let currentPage = 1;
  let totalPages = 0;
  let pdfDoc = null;
  let scale = 1.5;
  let pdfjsLib;

  onMount(async () => {
    pdfUrl = $page.url.searchParams.get('url');
    if (!pdfUrl) {
      error = true;
      loading = false;
      return;
    }

    // Dynamically import PDF.js only in the browser
    if (browser) {
      pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

      // Set up PDF.js worker - use the correct version from unpkg
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;

      try {
        await loadPdf();
      } catch (err) {
        console.error('Error loading PDF:', err);
        error = true;
        loading = false;
      }
    }
  });

  async function loadPdf() {
    if (!pdfjsLib) return;
    loading = true;
    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    totalPages = pdfDoc.numPages;
    loading = false;

    // Wait for next tick to ensure DOM is updated
    await new Promise(resolve => setTimeout(resolve, 0));

    await renderPage(1);
  }

  async function renderPage(pageNum) {
    if (!pdfDoc || !canvasContainer) return;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Clear container
    canvasContainer.innerHTML = '';

    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.className = 'mx-auto shadow-lg';

    canvasContainer.appendChild(canvas);

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    currentPage = pageNum;
  }

  async function nextPage() {
    if (currentPage < totalPages) {
      await renderPage(currentPage + 1);
    }
  }

  async function prevPage() {
    if (currentPage > 1) {
      await renderPage(currentPage - 1);
    }
  }

  async function zoomIn() {
    scale += 0.25;
    await renderPage(currentPage);
  }

  async function zoomOut() {
    if (scale > 0.5) {
      scale -= 0.25;
      await renderPage(currentPage);
    }
  }
</script>

<svelte:head>
  <title>PDF Viewer - Anti-Imperialists Study Circle</title>
</svelte:head>

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
  <!-- Content wrapper with proper padding for nav -->
  <div class="pt-24 pb-8">
    <div class="container mx-auto px-4 max-w-screen-xl">
      {#if error}
        <div class="text-center py-16">
          <h1 class="text-4xl font-hero text-[#2E8B57] mb-4">No PDF Specified</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            No PDF URL was provided or there was an error loading the PDF.
          </p>
          <a href="/blog" class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300">
            Return to Blog
          </a>
        </div>
      {:else if loading}
        <div class="text-center py-16">
          <h2 class="text-2xl font-hero text-[#2E8B57] mb-4">Loading PDF...</h2>
        </div>
      {:else if pdfUrl}
        <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
          <a
            href="/blog"
            class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300 inline-flex items-center"
          >
            ← Back to Blog
          </a>

          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300 underline"
          >
            Download PDF
          </a>
        </div>

        <!-- PDF Controls -->
        <div class="bg-gray-100 dark:bg-gray-900 border-2 border-[#2E8B57] rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <!-- Page Navigation -->
            <div class="flex items-center gap-2">
              <button
                on:click={prevPage}
                disabled={currentPage === 1}
                class="px-4 py-2 bg-[#2E8B57] text-white rounded hover:bg-[#FF6347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="text-sm px-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                on:click={nextPage}
                disabled={currentPage === totalPages}
                class="px-4 py-2 bg-[#2E8B57] text-white rounded hover:bg-[#FF6347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            <!-- Zoom Controls -->
            <div class="flex items-center gap-2">
              <button
                on:click={zoomOut}
                class="px-4 py-2 bg-[#2E8B57] text-white rounded hover:bg-[#FF6347] transition-colors"
              >
                Zoom Out
              </button>
              <span class="text-sm px-4">{Math.round(scale * 100)}%</span>
              <button
                on:click={zoomIn}
                class="px-4 py-2 bg-[#2E8B57] text-white rounded hover:bg-[#FF6347] transition-colors"
              >
                Zoom In
              </button>
            </div>
          </div>
        </div>

        <!-- PDF Canvas Container -->
        <div
          bind:this={canvasContainer}
          class="border-2 border-[#2E8B57] rounded-lg overflow-auto bg-gray-200 dark:bg-gray-800 p-4"
          style="max-height: calc(100vh - 20rem);"
        />
      {/if}
    </div>
  </div>
</main>
