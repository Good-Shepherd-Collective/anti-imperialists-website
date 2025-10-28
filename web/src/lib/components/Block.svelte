<script>
  export let node;
  export let children;
</script>

{#if node.style === 'normal'}
  <p class="text-black dark:text-white">{children}</p>
{:else if node.style === 'h1'}
  <h1 class="text-4xl font-bold text-black dark:text-white">{children}</h1>
{:else if node.style === 'h2'}
  <h2 class="text-3xl font-bold text-black dark:text-white">{children}</h2>
{:else if node.style === 'h3'}
  <h3 class="text-2xl font-bold text-black dark:text-white">{children}</h3>
{:else if node.style === 'h4'}
  <h4 class="text-xl font-bold text-black dark:text-white">{children}</h4>
{:else if node.style === 'blockquote'}
  <blockquote class="border-l-4 border-[#2E8B57] pl-4 text-black dark:text-white">{children}</blockquote>
{:else}
  <p class="text-black dark:text-white">{children}</p>
{/if} 