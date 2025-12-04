<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-12">🎬 Discover Movies</h1>
    
    <!-- Trending Section -->
    <MovieSection 
      title="🔥 Trending Today"
      :movies="trendingMovies"
      :loading="loadingTrending"
    />
    
    <!-- Popular Section -->
    <MovieSection 
      title="⭐ Popular Movies"
      :movies="popularMovies"
      :loading="loadingPopular"
    />
    
    <!-- Top Rated Section -->
    <MovieSection 
      title="🏆 Top Rated"
      :movies="topRatedMovies"
      :loading="loadingTopRated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPopularMovies, getTrendingMovies, getTopRatedMovies } from '../services/movieService';
import MovieSection from '../components/MovieSection.vue';

// Trending movies
const trendingMovies = ref([]);
const loadingTrending = ref(true);

// Popular movies
const popularMovies = ref([]);
const loadingPopular = ref(true);

// Top rated movies
const topRatedMovies = ref([]);
const loadingTopRated = ref(true);

onMounted(async () => {
  try {
    const [trending, popular, topRated] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies()
    ]);
    
    trendingMovies.value = trending.movies;
    loadingTrending.value = false;
    
    popularMovies.value = popular.movies;
    loadingPopular.value = false;
    
    topRatedMovies.value = topRated.movies;
    loadingTopRated.value = false;
  } catch (err) {
    console.error('Error loading movies:', err);
    loadingTrending.value = false;
    loadingPopular.value = false;
    loadingTopRated.value = false;
  }
});
</script>