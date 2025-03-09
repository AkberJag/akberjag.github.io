<script setup>
import FeaturedGame from './games/FeaturedGame.vue';
import UpcomingGame from './games/UpcomingGame.vue';

// Data for upcoming games
const upcomingGames = [
  {
    title: 'COLOR RUSH',
    titleColor: 'text-white',
    titleAccentColor: 'text-accent/90',
    description: 'Race against time in this fast-paced color matching game. Swipe, match, and combine colors to create spectacular chain reactions.',
    background: 'bg-gradient-to-br from-gray-800 to-gray-700',
  },
  {
    title: 'PIXEL PETS',
    titleColor: 'text-gray-800',
    titleAccentColor: 'text-accent',
    description: 'Collect, train, and battle with adorable pixel pets in this charming virtual pet simulator. Customize your pets and explore a minimalist world.',
    background: 'bg-gradient-to-br from-gray-100 to-gray-200',
  }
]
</script>
<template>
  <section id="games" class="min-h-screen py-5 px-6 bg-gray-50">
    <div class="container mx-auto max-w-5xl">
      <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center">Games</h2>

      <!-- Featured Game: BLOCK BUSTER -->
      <FeaturedGame />

      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:translate-x-px"></div>

        <!-- Upcoming Games -->
        <UpcomingGame v-for="(game, index) in upcomingGames" :key="game.title" :game="game"
          :is-reversed="index % 2 === 0" />
      </div>
    </div>
  </section>
</template>
