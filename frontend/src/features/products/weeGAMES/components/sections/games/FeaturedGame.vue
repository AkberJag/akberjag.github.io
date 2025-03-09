<script setup>
import { Play as PlayIcon } from 'lucide-vue-next'

// 4x4 grid cell classes
const gridCells = [
  // Row 1
  'bg-white/30 rounded-sm', 'bg-accent/80 rounded-sm', 'bg-white/30 rounded-sm', 'bg-white/20 rounded-sm',
  // Row 2
  'bg-white/20 rounded-sm', 'bg-white/30 rounded-sm', 'bg-accent/80 rounded-sm', 'bg-white/30 rounded-sm',
  // Row 3
  'bg-accent/80 rounded-sm', 'bg-white/20 rounded-sm', 'bg-white/30 rounded-sm', 'bg-white/30 rounded-sm',
  // Row 4
  'bg-white/30 rounded-sm', 'bg-white/30 rounded-sm', 'bg-white/20 rounded-sm', 'bg-accent/80 rounded-sm',
]
</script>

<template>
  <div class="mb-32 relative">
    <!-- Game Title as Background -->
    <div
      class="absolute -top-10 left-0 text-9xl font-bold text-gray-200 select-none pointer-events-none z-0 hidden md:block">
      BLOCKBUSTER
    </div>

    <!-- Game Content -->
    <div class="relative z-10 grid md:grid-cols-5 gap-0 rounded-lg overflow-hidden shadow-lg">
      <!-- Left Column - Game Visual -->
      <div
        class="hidden sm:flex md:col-span-2 bg-gray-900 aspect-square md:aspect-auto items-center justify-center p-8 relative">
        <!-- 4x4 Grid showing gameplay -->
        <div class="grid grid-cols-4 gap-2 w-48 h-48">
          <div v-for="(cell, index) in gridCells" :key="index" :class="cell"></div>
        </div>
      </div>

      <!-- Right Column - Game Info -->
      <div class="md:col-span-3 sm:col-span-5 p-8 md:p-12 bg-white">
        <div class="inline-block px-3 py-1 bg-accent text-white text-xs font-bold mb-6 rounded-full">
          FEATURED GAME
        </div>

        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          <span class="text-gray-900">BLOCK</span>
          <span class="text-accent">BUSTER</span>
        </h2>

        <p class="text-gray-800 mb-12 leading-relaxed max-w-lg">
          A minimal puzzle adventure that challenges your mind and reflexes. Break blocks, solve puzzles, and
          unlock new worlds in this addictive game.
        </p>

        <!-- Enhanced CTA button -->
        <a href="https://play.google.com/store/apps/details?id=com.weegames.blockbuster" target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all cta-button">
          <PlayIcon class="w-5 h-5" />
          Get on Play Store
        </a>
      </div>
    </div>
  </div>
</template>
