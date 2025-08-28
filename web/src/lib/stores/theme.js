// src/lib/stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
  // read the initial theme from localStorage or default to 'light'
  const initial = browser ? (localStorage.getItem('theme') ?? 'light') : 'light';
  const { subscribe, set, update } = writable(initial);

  if (browser) {
    // whenever the store changes, persist it and update the <html> element
    subscribe(value => {
      localStorage.setItem('theme', value);
      // Tailwind's dark mode works by adding/removing the 'dark' class
      document.documentElement.classList.toggle('dark', value === 'dark');
    });
  }

  return {
    subscribe,
    toggle: () => update(v => (v === 'dark' ? 'light' : 'dark'))
  };
}

export const theme = createThemeStore();
