<script setup>
import { ref, onMounted } from 'vue';
import { getPopularMovies } from './services/movieService';
import MovieCard from './components/MovieCard.vue';

const movies = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await getPopularMovies();
    movies.value = data.movies;
    loading.value = false;
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Popular Movies</h1>
      
      <div v-if="loading" class="text-center py-20">
        <p class="text-xl text-gray-600">Loading movies...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-20">
        <p class="text-xl text-red-600">Error: {{ error }}</p>
      </div>
      
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

