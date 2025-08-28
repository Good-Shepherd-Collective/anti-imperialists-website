<script>
  export let children;
  export let node;

  let listStyle = '';
  if (node?.listItem === 'bullet') {
    listStyle = 'list-disc';
  } else if (node?.listItem === 'number') {
    listStyle = 'list-decimal';
  } else if (node?.listItem === 'normal' || node?.style === 'normal') {
    listStyle = 'list-none';
  } else {
    listStyle = 'list-none';
  }
</script>

<li class="text-black dark:text-white {listStyle} ml-4">
  {#if Array.isArray(children)}
    {#each children as child}
      {#if typeof child === 'string'}
        {child}
      {:else if child.text}
        {child.text}
      {/if}
    {/each}
  {:else if typeof children === 'string'}
    {children}
  {/if}
</li> 