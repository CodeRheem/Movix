<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="bg-gray-900 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <span class="text-3xl">🎬</span>
          <span class="text-xl font-bold">Movix</span>
        </RouterLink>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <RouterLink to="/" class="hover:text-yellow-400 transition-colors">
            Home
          </RouterLink>
          <RouterLink to="/search" class="hover:text-yellow-400 transition-colors">
            Search
          </RouterLink>
          <RouterLink to="/favorites" class="hover:text-yellow-400 transition-colors">
            Favorites
          </RouterLink>
        </div>
        
        <!-- Mobile menu button -->
        <button class="md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
