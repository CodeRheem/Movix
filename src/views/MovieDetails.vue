<template>
  <div class="min-h-screen bg-gray-100">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-2xl text-gray-600">Loading movie details...</p>
    </div>
    
    <div v-else-if="!movie" class="flex items-center justify-center min-h-screen">
      <p class="text-2xl text-red-600">Movie not found</p>
    </div>
    
    <div v-else>
      <!-- Backdrop Image -->
      <div class="relative h-96 bg-gray-900">
        <img 
          v-if="movie.backdrop" 
          :src="movie.backdrop" 
          :alt="movie.title"
          class="w-full h-full object-cover opacity-40"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      <!-- Movie Info -->
      <div class="max-w-7xl mx-auto px-4 -mt-64 relative z-10">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Poster -->
          <div class="flex-shrink-0">
            <img 
              v-if="movie.poster"
              :src="movie.poster" 
              :alt="movie.title"
              class="w-64 rounded-lg shadow-2xl"
            />
          </div>
          
          <!-- Details -->
          <div class="flex-1 text-white">
            <h1 class="text-5xl font-bold mb-2">{{ movie.title }}</h1>
            <p v-if="movie.tagline" class="text-xl text-gray-300 italic mb-4">
              "{{ movie.tagline }}"
            </p>
            
            <div class="flex items-center gap-4 mb-6">
              <span class="text-yellow-400 text-xl">⭐ {{ movie.rating.toFixed(1) }}/10</span>
              <span class="text-gray-300">{{ movie.releaseDate }}</span>
              <span class="text-gray-300">{{ movie.runtime }} min</span>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="genre in movie.genres" 
                :key="genre.id"
                class="px-3 py-1 bg-gray-700 rounded-full text-sm"
              >
                {{ genre.name }}
              </span>
            </div>
            
            <h2 class="text-2xl font-semibold mb-3">Overview</h2>
            <p class="text-gray-200 text-lg leading-relaxed mb-8">
              {{ movie.overview }}
            </p>
          </div>
        </div>
        
        <!-- Trailer -->
        <div v-if="trailer" class="mt-12 bg-white rounded-lg p-6 shadow-lg">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Watch Trailer</h2>
          <div class="aspect-video">
            <iframe 
              :src="trailer.youtubeUrl"
              class="w-full h-full rounded-lg"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        
        <!-- Cast -->
        <div v-if="cast.length > 0" class="mt-12 bg-white rounded-lg p-6 shadow-lg">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Cast</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            <div 
              v-for="person in cast" 
              :key="person.id"
              class="text-center"
            >
              <img 
                v-if="person.profileImage"
                :src="person.profileImage" 
                :alt="person.name"
                class="w-full h-40 object-cover rounded-lg mb-2"
              />
              <div v-else class="w-full h-40 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                <span class="text-gray-500">No Photo</span>
              </div>
              <p class="font-semibold text-gray-800">{{ person.name }}</p>
              <p class="text-sm text-gray-600">{{ person.character }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="h-20"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieDetails, getMovieCast, getMovieVideos } from '../services/movieService';

const route = useRoute();

const movie = ref(null);
const cast = ref([]);
const trailer = ref(null);
const loading = ref(true);

onMounted(async () => {
  const movieId = route.params.id;
  
  try {
    const [movieData, castData, trailerData] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCast(movieId),
      getMovieVideos(movieId)
    ]);
    
    movie.value = movieData;
    cast.value = castData;
    trailer.value = trailerData;
    loading.value = false;
  } catch (err) {
    console.error('Error loading movie details:', err);
    loading.value = false;
  }
});
</script>