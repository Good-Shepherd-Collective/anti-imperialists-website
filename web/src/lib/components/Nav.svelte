<script>
  import { page } from '$app/stores'
  import { theme } from '$lib/stores/theme.js';

  let isMenuOpen = false;
  
  const toggleTheme = () => theme.toggle();
  const toggleMenu = () => isMenuOpen = !isMenuOpen;


</script>

<nav class="fixed w-full z-50 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm text-[#2E8B57] py-4 px-4 top-0 border-b border-gray-200 dark:border-gray-700">
  <div class="container mx-auto max-w-6xl relative">
    <!-- Desktop Navigation -->
    <ul class="hidden md:flex justify-center space-x-8 py-2 text-sm md:text-base tracking-widest">
      <li><a href="/" class="hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/' ? 'italic' : ''}">HOME</a></li>
      <li><a href="/blog" class="hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/blog/' ? 'italic' : ''}">BLOG</a></li>
      <li><a href="/members" class="hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/members/' ? 'italic' : ''}">MEMBERS</a></li>
      <li><a href="/points-of-unity" class="hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/points-of-unity/' ? 'italic' : ''}">PRINCIPLES OF UNITY</a></li>
      <li><a href="/community" class="hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/community/' ? 'italic' : ''}">COMMUNITY</a></li>
      <li><a href="/statements" class="hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/statements/' ? 'italic' : ''}">STATEMENTS</a></li>
      <li>
        <button 
          on:click={toggleTheme}
          class="hover:text-[#FF6347] transition-colors duration-300 p-1 pt-0"
          title="Toggle dark mode"
        >
          {#if $theme === 'dark'}
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
          {:else}
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          {/if}
        </button>
      </li>
    </ul>

    <!-- Mobile Navigation -->
    <div class="md:hidden flex justify-between items-center">
      <!-- Hamburger Menu Button -->
      <button 
        on:click={toggleMenu}
        class="p-2 hover:text-[#FF6347] transition-colors duration-300"
        aria-label="Toggle menu"
      >
        <div class="w-6 h-6 flex flex-col justify-center items-center">
          <span class="block w-5 h-0.5 bg-current transition-all duration-300 {isMenuOpen ? 'rotate-45 translate-y-1' : ''}"></span>
          <span class="block w-5 h-0.5 bg-current mt-1 transition-all duration-300 {isMenuOpen ? 'opacity-0' : ''}"></span>
          <span class="block w-5 h-0.5 bg-current mt-1 transition-all duration-300 {isMenuOpen ? '-rotate-45 -translate-y-1' : ''}"></span>
        </div>
      </button>

      <!-- Theme Toggle for Mobile -->
      <button 
        on:click={toggleTheme}
        class="p-2 hover:text-[#FF6347] transition-colors duration-300"
        title="Toggle dark mode"
      >
        {#if $theme === 'dark'}
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    {#if isMenuOpen}
      <div class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <ul class="py-4 space-y-2">
          <li>
            <a 
              href="/" 
              class="block px-4 py-3 hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/' ? 'text-[#FF6347] italic' : ''}"
              on:click={() => isMenuOpen = false}
            >
              HOME
            </a>
          </li>
          <li>
            <a 
              href="/blog" 
              class="block px-4 py-3 hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/blog/' ? 'text-[#FF6347] italic' : ''}"
              on:click={() => isMenuOpen = false}
            >
              BLOG
            </a>
          </li>
          <li>
            <a 
              href="/members" 
              class="block px-4 py-3 hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/members/' ? 'text-[#FF6347] italic' : ''}"
              on:click={() => isMenuOpen = false}
            >
              MEMBERS
            </a>
          </li>
          <li>
            <a 
              href="/points-of-unity" 
              class="block px-4 py-3 hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/points-of-unity/' ? 'text-[#FF6347] italic' : ''}"
              on:click={() => isMenuOpen = false}
            >
              PRINCIPLES OF UNITY
            </a>
          </li>
          <li>
            <a 
              href="/community" 
              class="block px-4 py-3 hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/community/' ? 'text-[#FF6347] italic' : ''}"
              on:click={() => isMenuOpen = false}
            >
              COMMUNITY
            </a>
          </li>
          <li>
            <a 
              href="/statements" 
              class="block px-4 py-3 hover:text-[#FF6347] transition-colors duration-300 {$page.url.pathname === '/statements/' ? 'text-[#FF6347] italic' : ''}"
              on:click={() => isMenuOpen = false}
            >
              STATEMENTS
            </a>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</nav>