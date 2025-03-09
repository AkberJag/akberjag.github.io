<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Gamepad as GamepadIcon } from 'lucide-vue-next'

const showGames = ref(true)
const particles = reactive([])

const createParticles = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#6B5CA5', '#44AF69', '#2A9D8F', '#E76F51', '#8338EC']
  particles.length = 0

  for (let i = 0; i < 10; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.1 + Math.random() * 0.15,
      animationDuration: `${10 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      rotation: Math.random() * 360,
    })
  }
}

onMounted(() => {
  setInterval(() => showGames.value = !showGames.value, 3000)
  createParticles()
})
</script>

<template>
  <section id="home" class="min-h-screen flex items-center px-6 relative overflow-hidden">
    <!-- Background particles -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <div v-for="particle in particles" :key="particle.id" class="particle absolute" :style="{
        '--x': `${particle.x}%`,
        '--y': `${particle.y}%`,
        '--size': `${particle.size}px`,
        '--color': particle.color,
        '--opacity': particle.opacity,
        '--rotation': `${particle.rotation}deg`,
        '--animation-duration': particle.animationDuration,
        '--animation-delay': particle.animationDelay,
      }"></div>
    </div>
    <!-- Content -->
    <div class="container mx-auto max-w-5xl">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          <span class="block text-gray-900 text-2xl">Small studio.</span>
          <span class="block text-accent relative">
            <span class="absolute transition-opacity duration-1000"
              :class="{ 'opacity-100': showGames, 'opacity-0': !showGames }">Big Games.</span>
            <span class="absolute transition-opacity duration-1000"
              :class="{ 'opacity-100': !showGames, 'opacity-0': showGames }">Big Dreams.</span>
            <span class="invisible">Big Games.</span> <!-- Spacer to maintain layout -->
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10">
          At weeGAMES, I create delightful gaming experiences that prove the best things come in small packages.
        </p>
        <div>
          <a href="#games"
            class="cta-button px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-md font-medium text-center transition-colors inline-flex items-center">
            <GamepadIcon class="size-6 mr-2" />
            See games
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(10%, 10%) rotate(90deg);
  }

  50% {
    transform: translate(20%, -10%) rotate(180deg);
  }

  75% {
    transform: translate(-10%, 20%) rotate(270deg);
  }

  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background-color: var(--color);
  opacity: var(--opacity);
  transform: rotate(var(--rotation));
  animation: float var(--animation-duration) var(--animation-delay) infinite ease-in-out;
  will-change: transform, opacity;
}

.text-accent span {
  transition: opacity 1s ease-in-out;
}
</style>
