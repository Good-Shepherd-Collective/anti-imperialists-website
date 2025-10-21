<script>
  export let portableText;
  // eslint-disable-next-line no-unused-vars
  export let value = undefined;

  // For @portabletext/svelte, the link data is in portableText.value.href
  $: originalHref = portableText?.value?.href || '#';

  // Check if this is a Sanity CDN PDF link
  $: isSanityPdf = originalHref.includes('cdn.sanity.io/files/') && originalHref.endsWith('.pdf');

  // If it's a Sanity PDF, route to our viewer; otherwise use original href
  $: href = isSanityPdf ? `/view-pdf?url=${encodeURIComponent(originalHref)}` : originalHref;

  // Only open in new tab if it's NOT a Sanity PDF (external links)
  $: target = isSanityPdf ? '_self' : '_blank';
</script>

<a
  href={href}
  target={target}
  rel="noopener noreferrer"
  class="text-[#FF6347] hover:text-[#2E8B57] transition-colors duration-300 underline"
>
  <slot />
</a>

<style>
  a {
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }
</style>
