<script>
  export let value;
  export let portableText = { context: { footnotes: [] } };

  $: index = value?.number || portableText?.context?.footnotes?.findIndex(f => f._key === value?._key) + 1 || '?';
</script>

{#if value}
  <sup class="footnote-number">[{index}]</sup>
{/if}

<slot />

<style>
  .footnote-number {
    color: #FF6347;
    font-size: 0.75em;
    font-weight: bold;
    vertical-align: super;
  }
</style> 