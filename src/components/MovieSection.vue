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
    <h2 class="border bg-purple-900 p-2 w-full mb-4 rounded-2xl text-2xl text-white text center">{{ title }}</h2>
    
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