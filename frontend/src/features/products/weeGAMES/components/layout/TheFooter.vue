<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="py-12 px-6 bg-gray-50">
    <div class="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center">
        <div class="h-7 w-7 bg-accent rounded-lg flex items-center justify-center mr-2">
          <span class="text-white font-bold text-sm">W</span>
        </div>
        <div class="text-lg font-bold">
          <span class="text-accent">wee</span>
          <span class="text-gray-800">GAMES</span>
        </div>
      </div>
      <div class="text-gray-500 text-sm">
        © {{ currentYear }} wee GAMES. All rights reserved.
      </div>
    </div>
  </footer>
</template>
