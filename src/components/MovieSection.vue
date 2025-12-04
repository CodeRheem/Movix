<script setup>
import MovieCard from './MovieCard.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  movies: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>


<template>
  <div class="mb-12">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ title }}</h2>
    
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-600">Loading...</p>
    </div>
    
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <MovieCard 
        v-for="movie in movies" 
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>