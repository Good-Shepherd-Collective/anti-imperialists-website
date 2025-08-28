<script>
	import { PortableText } from '@portabletext/svelte';
	import Image from '$lib/components/Image.svelte';
	import Block from '$lib/components/Block.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import { onMount } from 'svelte';
	export let data;
	const { volumes, editorialStatement, submissionInstructions, editorialBoard } = data;

	// Format date to be more readable
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const components = {
		types: {
			image: Image,
			block: Block
		},
		listItem: ListItem
	};

	let expandedIds = [];

	onMount(() => {
		if (volumes?.[0]?._id) {
			expandedIds = [volumes[0]._id];
		}
	});

	function sortPosts(posts) {
		return [...posts].sort((a, b) => {
			// First sort by featured status - featured posts come first
			if (a.featured !== b.featured) {
				return a.featured ? -1 : 1;
			}
			
			// Then sort by author last name
			const getLastName = (post) => {
				if (!post.author) return '';
				const nameParts = post.author.split(' ');
				return nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
			};
			
			const lastNameA = getLastName(a);
			const lastNameB = getLastName(b);
			return lastNameA.localeCompare(lastNameB);
		});
	}

	function sortMembers(members) {
		return [...members].sort((a, b) => {
			const getLastName = (member) => {
				if (!member.name) return '';
				const nameParts = member.name.split(' ');
				return nameParts.length > 1 ? nameParts[1] : member.name;
			};
			
			const lastNameA = getLastName(a);
			const lastNameB = getLastName(b);
			return lastNameA.localeCompare(lastNameB);
		});
	}

	function toggleVolume(volumeId) {
		expandedIds = expandedIds.includes(volumeId) 
			? expandedIds.filter(id => id !== volumeId)
			: [...expandedIds, volumeId];
	}
</script>

<main class="relative bg-white dark:bg-black text-black dark:text-white min-h-screen pt-12">
	<div class="container mx-auto px-4 max-w-6xl">
		<!-- Header section -->
		<header class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
			<div class="w-32 md:w-48 relative">
				<div class="aspect-square rounded-full bg-white dark:bg-black glow relative">
					<img 
						src="/logo.jpeg" 
						alt="AISC logo" 
						class="w-full h-full object-contain rounded-full"
					/>
				</div>
			</div>
			<div class="text-left md:max-w-2xl">
				<h1 class="text-left font-hero text-4xl md:text-6xl text-[#2E8B57] tracking-tight leading-none mb-6 mt-12">
					The Pen is My Machete
				</h1>
		
			</div>
		</header>

		{#if editorialBoard && editorialBoard.length > 0}
			<div class="text-center mb-12">
				<h2 class="font-hero text-2xl text-[#2E8B57] mb-4">Editorial Board</h2>
				<div class="flex flex-wrap justify-center gap-4">
					{#each sortMembers(editorialBoard) as member}
						<div class="text-black dark:text-white">
							<a 
								href="/members/{member.slug}" 
								class="font-bold hover:text-[#2E8B57] transition-colors duration-300"
							>
								{member.name}
							</a>
							{#if member.affiliation}
								<span class="text-gray-600 dark:text-gray-400 ml-2">({member.affiliation})</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="flex flex-col lg:flex-row gap-8">
			<!-- Left Column: Editorial Statement and Submission Instructions -->
			<div class="lg:w-[40%] space-y-8">
				{#if editorialStatement}
					<div class="bg-white dark:bg-black border-2 border-[#2E8B57] p-6 shadow-lg">
						<h2 class="font-hero text-2xl text-[#2E8B57] mb-4">Editorial Statement</h2>
						<div class="prose prose-sm text-black dark:text-white max-w-none">
							<PortableText value={editorialStatement} {components} />
						</div>
					</div>
				{/if}

				{#if submissionInstructions}
					<div class="bg-white dark:bg-black border-2 border-[#2E8B57] p-6 mt-8 shadow-lg">
						<h2 class="font-hero text-2xl text-[#2E8B57] mb-4">Submission Instructions</h2>
						<div class="prose prose-sm text-black dark:text-white max-w-none">
							<PortableText value={submissionInstructions} {components} />
						</div>
					</div>
				{/if}
			</div>

			<!-- Right Column: Blog Posts Grid -->
			<div class="lg:w-[60%]">
				{#if volumes && volumes.length > 0}
					{#each volumes as volume}
						<div class="mb-8">
							<button
								class="w-full bg-white dark:bg-black border-2 border-[#FF6347] p-4 flex justify-between items-center text-left hover:bg-[#FF6347] hover:text-white transition-colors duration-300 shadow-lg"
								on:click={() => toggleVolume(volume._id)}
							>
								<h2 class="font-hero text-2xl uppercase">{`${volume.title} ${volume.number}`}</h2>
								<span class="text-2xl transform transition-transform duration-300" class:rotate-180={expandedIds.includes(volume._id)}>
									↓
								</span>
							</button>
							
							{#if expandedIds.includes(volume._id)}
								<div class="grid md:grid-cols-2 gap-8 mt-8">
									{#each sortPosts(volume.posts) as post}
										<article class="bg-white dark:bg-black border-2 border-[#2E8B57] p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[200px] flex flex-col justify-between shadow-lg">
											<div>
												<h3 class="font-hero text-xl font-semibold mb-3">{post.title}</h3>
												{#if post.featured}
													<span class="inline-block bg-[#FF6347] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2">Original Content</span>
												{/if}
												{#if post.author}
													<p class="text-sm text-gray-600 dark:text-gray-400">By {post.author}</p>
												{/if}
											</div>
											<a 
												href="/blog/{post.slug}" 
												class="inline-block mt-4 text-[#2E8B57] hover:text-[#FF6347] font-bold uppercase tracking-wider transition-colors duration-300"
											>
												Read more →
											</a>
										</article>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				{:else}
					<p class="text-center text-gray-600 dark:text-gray-400 text-xl">No volumes available.</p>
				{/if}
			</div>
		</div>
	</div>
</main>

<style> 
	.glow {
		box-shadow: 0 0 40px rgba(255, 99, 71, 0.3);
	}

	.glow::after {
		content: '';
		position: absolute;
		inset: -2px;
		border: 2px solid #FF6347;
		border-radius: 9999px;
		animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.8;
			transform: scale(1);
		}
		50% {
			opacity: 0.2;
			transform: scale(1.05);
		}
	}

	:global(.prose-sm strong) {
		color: #2E8B57 !important;
	}
</style> 