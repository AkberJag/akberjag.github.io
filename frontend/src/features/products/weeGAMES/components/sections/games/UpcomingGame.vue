<script setup>

defineProps({
  game: {
    type: Object,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="relative mb-24 md:mb-32">
    <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      <!-- Timeline Dot -->
      <div
        class="absolute left-0 md:left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full transform -translate-y-1/2 md:-translate-x-2">
      </div>

      <!-- Left Side -->
      <div :class="[
        isReversed ? 'md:text-right order-2 md:order-1' : 'order-2 md:order-2 md:text-left'
      ]">
        <div class="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium mb-3 rounded-full">
          COMING SOON
        </div>
        <h3 class="text-2xl font-bold mb-4">{{ game.title }}</h3>
        <p class="text-gray-600 mb-4">
          {{ game.description }}
        </p>
      </div>

      <!-- Right Side -->
      <div :class="[isReversed ? 'order-1 md:order-2' : 'order-1 md:order-1']">
        <div :class="['h-48 flex items-center justify-center relative rounded-lg', game.background]">
          <div class="text-3xl font-bold">
            <span :class="['block', game.titleColor]">{{ game.title.split(' ')[0] }}</span>
            <span :class="['block', game.titleAccentColor]">{{ game.title.split(' ')[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
