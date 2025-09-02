<script>
	export let data; // SvelteKit automatically passes the returned data from load()
	let pointsOfUnity = data.pointsOfUnity;
</script>

<svelte:head>
	<title>Home - Anti-Imperialist Scholars Collective</title>
</svelte:head>

<main class="bg-white dark:bg-black text-black dark:text-white">
	<div class="container mx-auto px-4 max-w-6xl">
		<section class="pt-12 md:pt-20 lg:pt-28">
			<article class="pt-8 md:pt-12 -mb-9">
				<article class="font-hero text-4xl md:text-5xl lg:text-6xl font-extrabold 2xl:text-7xl text-center">
					<div class="flex justify-center">
						<img src="/logo.jpeg" alt="AISC logo" class="transition-all z-40 duration-300 rounded-full w-48 sm:w-60 md:w-72 bg-white h-48 sm:h-60 md:h-72 object-contain shadow-[0_0_2rem_1.5rem_#2E8B57]">
					</div>
				</article>
			</article>
			<div class="intro bg-[#FF6347] md:bg-transparent flex flex-col md:flex-row items-center p-4 md:p-8 lg:p-20 text-base md:text-lg shadow-[inset_0_0_2rem_1.5rem_#FF6347]">
				<div class="w-full md:w-1/3 md:order-last mb-4 md:mb-0 md:ml-8">
					<img 
						class="w-full h-48 sm:h-60 md:h-80 object-cover md:object-contain mx-auto" 
						src="/home.png" 
						alt="AISC logo"
					>
				</div>
				<div class="w-full md:w-2/3 p-4 pt-0 md:p-0 mt-4 md:mt-0 text-lg sm:text-xl md:text-2xl">
		
					The Anti-Imperialist Scholars Collective (AISC) is a group of scholars committed to
					challenging US-led imperialism and supporting liberation movements of the Global Majority
					through critical knowledge production and international solidarity.
					
				</div>
			</div>
			
			<!-- Newsletter Form - Substack Embed -->
			<div id="newsletter-container" class="my-16 mx-auto max-w-2xl relative">
				<!-- Decorative elements -->
				<div class="absolute -top-3 left-0 right-0 h-1 bg-[#FF6347]"></div>
				<div class="absolute -bottom-3 left-0 right-0 h-1 bg-[#2E8B57]"></div>
				<div class="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6347] to-[#2E8B57]"></div>
				<div class="absolute -right-3 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6347] to-[#2E8B57]"></div>
				
				<!-- Content -->
				<div class="p-10 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-lg">
					<div class="flex items-center justify-center mb-8">
						<div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#2E8B57]"></div>
						<h2 class="font-hero text-3xl mx-4 text-[#2E8B57] text-center font-bold px-2">Join Our Newsletter</h2>
						<div class="w-12 h-0.5 bg-gradient-to-r from-[#2E8B57] to-transparent"></div>
					</div>
					
					<!-- Substack Embed -->
					<div class="flex justify-center">
						<iframe src="https://penandmachete.substack.com/embed" width="100%" height="150" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
			</div>
			
			<section class="relative border-t-8 border-gray-200 dark:border-gray-700 pt-8 md:pt-16">
				<h2 class="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-12 text-[#2E8B57]">Featured Posts and Events</h2>
				
				<div class="grid gap-6 md:gap-12">
					<div class="relative">
						<h3 class="font-hero text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 pl-4 border-l-4 border-[#2E8B57]">Latest Posts</h3>
						{#if data.blogs && data.blogs.length > 0}
							{#each data.blogs as post}
								<article class="mb-4 md:mb-8 p-4 md:p-6 border-2 border-[#2E8B57] transform transition-transform hover:scale-105">
									<h4 class="font-hero text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">{post.title}</h4>
									{#if post.volumeNumber}
										<p class="text-sm text-gray-400 mb-1">Volume {post.volumeNumber}{post.volumeIssue ? ` - Issue ${post.volumeIssue}` : ''}</p>
									{/if}
									{#if post.authorName}
										<p class="text-sm text-gray-400 mb-2">By {post.authorName}</p>
									{/if}
									{#if (post.tags && post.tags.length > 0) || post.featured}
										<div class="flex flex-wrap gap-2 mb-3">
											{#if post.featured}
												<span class="inline-block bg-[#FF6347] text-black text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">Original Content</span>
											{/if}
											{#if post.tags && post.tags.length > 0}
												{#each post.tags as tag}
													<span class="inline-block bg-[#2E8B57] text-white text-xs px-2 py-1 rounded-full">{tag}</span>
												{/each}
											{/if}
										</div>
									{/if}
									<a href="/blog/{post.slug.current}" class="inline-block mt-2 hover:underline font-bold uppercase tracking-wider">Read more →</a>
								</article>
							{/each}
						{:else}
							<p class="text-gray-400">No posts available</p>
						{/if}
					</div>
				</div>
			</section>
		</section>
	</div>
</main>

<style lang="postcss">
	a {
		@apply hover:text-[#FF6347];
	}
	.copy {
		font-family: "ivystyle-tw", sans-serif;
	}

</style>