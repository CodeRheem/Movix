import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    // {
    //   path: '/movie/:id',
    //   name: 'movie-detail',
    //   component: () => import('../views/MovieDetailView.vue')
    // },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: () => import('../views/SearchView.vue')
    // },
    // {
    //   path: '/favorites',
    //   name: 'favorites',
    //   component: () => import('../views/FavoritesView.vue')
    // }
  ]
})

export default router