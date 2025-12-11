<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Search Movies</h1>
    
    <!-- Search Input -->
    <div class="mb-8">
      <div class="relative">
        <input 
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search for movies..."
          class="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <span class="absolute right-4 top-4 text-gray-400 text-2xl">🔍</span>
      </div>
    </div>
    
    <!-- Search Results Info -->
    <div v-if="searchQuery && !loading" class="mb-6">
      <p class="text-gray-600 text-lg">
        Found {{ totalResults }} results for "{{ searchQuery }}"
      </p>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <p class="text-xl text-gray-600">Searching...</p>
    </div>
    
    <!-- No Results -->
    <div v-else-if="searchQuery && movies.length === 0" class="text-center py-20">
      <p class="text-2xl text-gray-600 mb-2">😔 No movies found</p>
      <p class="text-gray-500">Try searching for something else</p>
    </div>
    
    <!-- Search Results -->
    <div v-else-if="movies.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <MovieCard 
        v-for="movie in movies" 
        :key="movie.id"
        :movie="movie"
      />
    </div>
    
    <!-- Initial State (no search yet) -->
    <div v-else class="text-center py-20">
      <p class="text-2xl text-gray-600 mb-2">🎬 Search for your favorite movies</p>
      <p class="text-gray-500">Type in the search box above to get started</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { searchMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard.vue';

const searchQuery = ref('');
const movies = ref([]);
const loading = ref(false);
const totalResults = ref(0);

let searchTimeout = null;

const handleSearch = async () => {
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  // If search is empty, clear results
  if (!searchQuery.value.trim()) {
    movies.value = [];
    totalResults.value = 0;
    return;
  }
  
  // Wait 500ms before searching (debounce)
  searchTimeout = setTimeout(async () => {
    loading.value = true;
    
    try {
      const data = await searchMovies(searchQuery.value);
      movies.value = data.movies;
      totalResults.value = data.totalResults;
      loading.value = false;
    } catch (err) {
      console.error('Search error:', err);
      loading.value = false;
    }
  }, 500);
};
</script>