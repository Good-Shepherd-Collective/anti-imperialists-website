<script>
  import { PortableText } from '@portabletext/svelte'
  import Nav from '$lib/components/Nav.svelte';
  import Footnote from '$lib/components/Footnote.svelte';
  import Image from '$lib/components/Image.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import Block from '$lib/components/Block.svelte';
  export let data;
  const { blog } = data;

  onMount(() => {
    // Scroll to top when navigating to a new post
    window.scrollTo(0, 0);
  });

  console.log('Blog post data in component:', blog)

  // Helper function to get image URL
  function getImageUrl(image) {
    if (!image?.asset?.url) return null
    return image.asset.url
  }

  // Extract footnotes from body content
  let footnotes = [];
  if (blog.body) {
    blog.body.forEach(block => {
      if (block.markDefs) {
        block.markDefs.forEach(mark => {
          if (mark._type === 'footnote') {
            footnotes.push({
              _key: mark._key,
              text: mark.text
            });
          }
        });
      }
    });
  }

  const components = {
    types: {
      image: Image,
      block: Block
    },
    marks: {
      footnote: Footnote
    },
    listItem: ListItem
  }
</script>

<main class="bg-white dark:bg-black text-black dark:text-white min-h-screen">
  <!-- Content wrapper with proper padding for nav -->
  <div class="pt-24">
    {#if $page.status === 404}
      <div class="container mx-auto px-4 max-w-4xl text-center py-16">
        <h1 class="text-4xl font-hero text-[#2E8B57] mb-4">Post Not Found</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
        <a href="/blog" class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300">
          Return to Blog
        </a>
      </div>
    {:else if $page.status === 500}
      <div class="container mx-auto px-4 max-w-4xl text-center py-16">
        <h1 class="text-4xl font-hero text-[#2E8B57] mb-4">Error Loading Post</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">There was an error loading this blog post. Please try again later.</p>
        <a href="/blog" class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300">
          Return to Blog
        </a>
      </div>
    {:else if !blog}
      <div class="container mx-auto px-4 max-w-4xl text-center py-16">
        <h1 class="text-4xl font-hero text-[#2E8B57] mb-4">Error Loading Post</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">The blog post data is missing. Please try again later.</p>
        <a href="/blog" class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300">
          Return to Blog
        </a>
      </div>
    {:else}
      <!-- Hero section with full-width image if available -->
      {#if blog.mainImage && getImageUrl(blog.mainImage)}
        <div class="w-full h-[50vh] relative">
          <img 
            src={getImageUrl(blog.mainImage)} 
            alt={blog.mainImage.alt || blog.title}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      {/if}

      <div class="container mx-auto px-4 max-w-4xl relative z-10 {blog.mainImage ? '-mt-24' : 'mt-12'}">
        <article class="prose prose-invert prose-lg mx-auto">
          <!-- Title and metadata section -->
          <header class="mb-16 mt-24 text-center">
            <h1 class="font-hero text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black dark:text-white">
              {blog.title}
            </h1>
            
            {#if blog.authorName || blog.publishedAt}
              <div class="border-t border-b border-[#2E8B57] py-4 text-gray-400 dark:text-gray-300 flex items-center justify-center space-x-4">
                {#if blog.authorName}
                  <span>By {blog.authorName}</span>
                {/if}
                {#if blog.publishedAt}
                  <span class="text-[#FF6347]">•</span>
                  <time datetime={blog.publishedAt}>
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                {/if}
              </div>
            {/if}
          </header>

          <!-- Main content -->
          {#if blog.body}
            <div class="prose  prose-lg mx-auto">
              <PortableText value={blog.body} {components} />
            </div>
          {/if}

          <!-- Footnotes section -->
          {#if footnotes.length > 0}
            <div class="mt-16 border-t border-[#2E8B57] pt-8">
              <h2 class="text-2xl font-hero text-[#2E8B57] mb-4">Footnotes</h2>
              <div class="space-y-4">
                {#each footnotes as footnote}
                  <div class="flex gap-2">
                    <span class="text-[#FF6347]">{footnote._key}</span>
                    <p class="text-gray-400">{footnote.text}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </article>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(.prose) {
    max-width: none;
  }
  :global(.prose blockquote) {
    border-left-color: #2E8B57;
    color: #FF6347;
    font-style: normal;
    padding-left: 2rem;
  }
  :global(.footnote-number) {
    color: #FF6347;
    font-size: 0.75em;
    font-weight: bold;
    vertical-align: super;
    position: relative;
    top: -0.5em;
    line-height: 0;
  }
</style> 