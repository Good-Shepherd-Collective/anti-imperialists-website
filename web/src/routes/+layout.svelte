<script>
	import '../app.css';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<title>Anti-Imperialist Scholars Collective</title>
</svelte:head>

<Nav />
<div class="pt-12 md:pt-8 mb-12">
	<slot></slot>
</div>
<SocialLinks />
