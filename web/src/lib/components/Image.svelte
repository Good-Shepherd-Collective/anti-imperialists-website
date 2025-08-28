<script>
    export let value = undefined;
    export let portableText = undefined;
    
    $: imageData = value || portableText?.value;
    console.log('Image data:', imageData);
</script>

<div class="mb-4">
    {#if imageData?.asset}
        <img 
            src={imageData.asset.url} 
            alt={imageData.alt || ''}
            class="w-full h-auto"
        />
    {/if}
</div> 