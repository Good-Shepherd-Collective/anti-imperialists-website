<script>
  export let children;
  export let node;
</script>

{#if node.listItem === 'bullet'}
  <ul class="list-disc pl-6 my-4 space-y-2 text-black dark:text-white">
    {children}
  </ul>
{:else if node.listItem === 'number'}
  <ol class="list-decimal pl-6 my-4 space-y-2 text-black dark:text-white">
    {children}
  </ol>
{:else}
  <ul class="list-none pl-6 my-4 space-y-2 text-black dark:text-white">
    {children}
  </ul>
{/if}
