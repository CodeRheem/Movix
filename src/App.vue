<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/NavBar.vue';
</script>


<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar/>
    <RouterView />
  </div>
</template>
