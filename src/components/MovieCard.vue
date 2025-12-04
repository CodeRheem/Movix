<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
    <img 
      v-if="movie.poster" 
      :src="movie.poster" 
      :alt="movie.title"
      class="w-full h-[300px] object-cover"
    />
    <div v-else class="w-full h-[300px] bg-gray-300 flex items-center justify-center text-gray-600">
      No Image
    </div>
    
    <div class="p-4">
      <h3 class="font-semibold text-gray-800 text-base mb-2 truncate">
        {{ movie.title }}
      </h3>
      <div class="flex items-center justify-between">
        <span class="text-yellow-500 text-sm">⭐ {{ movie.rating.toFixed(1) }}</span>
        <span class="text-gray-500 text-xs">{{ getYear(movie.releaseDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const getYear = (date) => {
  if (!date) return 'N/A';
  return date.split('-')[0];
};
</script>