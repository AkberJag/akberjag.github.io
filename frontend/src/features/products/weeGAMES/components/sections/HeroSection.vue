<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Gamepad as GamepadIcon } from 'lucide-vue-next'
// State for text alternation
const showGames = ref(true)
// Background animation elements
const particles = reactive([])

// Create particles
const createParticles = () => {
  // Array of colors to choose from
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#6B5CA5', '#44AF69', '#2A9D8F', '#E76F51', '#8338EC']
  particles.length = 0

  console.log("Creating particles...")

  // Reduced number of particles for memory efficiency (from 20 to 10)
  for (let i = 0; i < 10; i++) {
    // Position particles both inside and outside the viewport for immediate visibility
    let x, y

    // Initialize some particles inside the viewport for immediate visibility
    if (i < 5) {
      x = Math.random() * 100
      y = Math.random() * 100
    } else {
      // And others outside the viewport
      const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left

      if (side === 0) { // top
        x = Math.random() * 100
        y = -10 // Above viewport
      } else if (side === 1) { // right
        x = 110 // Right of viewport
        y = Math.random() * 100
      } else if (side === 2) { // bottom
        x = Math.random() * 100
        y = 110 // Below viewport
      } else { // left
        x = -10 // Left of viewport
        y = Math.random() * 100
      }
    }

    particles.push({
      id: i,
      x: x,
      y: y,
      size: 20 + Math.random() * 40, // Single size value for both dimensions
      borderRadius: 0, // Square particles
      opacity: 0.1 + Math.random() * 0.15,
      speed: 0.01 + Math.random() * 0.05, // Slow movement
      color: colors[Math.floor(Math.random() * colors.length)],
      direction: Math.random() * Math.PI * 2, // Random direction
      rotation: Math.random() * 360,
      // Add randomness to direction changes
      changeDirectionChance: 0.01 // 1% chance to change direction each frame
    })
  }
}

// Animate particles
const animateParticles = () => {
  console.log(`Animating ${particles.length} particles`)

  particles.forEach(particle => {
    // Random direction change
    if (Math.random() < particle.changeDirectionChance) {
      particle.direction = Math.random() * Math.PI * 2
    }

    // Move particle
    particle.x += Math.cos(particle.direction) * particle.speed
    particle.y += Math.sin(particle.direction) * particle.speed

    // If particle moves far out of view, reset it to start outside the viewport again
    if (particle.x < -20 || particle.x > 120 || particle.y < -20 || particle.y > 120) {
      // Determine new spawn position outside viewport
      const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left

      if (side === 0) { // top
        particle.x = Math.random() * 100
        particle.y = -10
      } else if (side === 1) { // right
        particle.x = 110
        particle.y = Math.random() * 100
      } else if (side === 2) { // bottom
        particle.x = Math.random() * 100
        particle.y = 110
      } else { // left
        particle.x = -10
        particle.y = Math.random() * 100
      }

      // New random direction
      particle.direction = Math.random() * Math.PI * 2
    }
  })
  requestAnimationFrame(animateParticles)
}

// Set up text alternation and background animation
onMounted(() => {
  setInterval(() => {
    showGames.value = !showGames.value
  }, 3000)
  createParticles()
  animateParticles()
})
</script>
<template>
  <section id="home" class="min-h-screen flex items-center px-6 relative overflow-hidden">
    <!-- Background particles -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <div v-for="particle in particles" :key="particle.id" class="absolute" :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: particle.color,
        borderRadius: `${particle.borderRadius}px`,
        opacity: particle.opacity,
        transform: `rotate(${particle.rotation}deg)`,
        zIndex: 0
      }">
      </div>
    </div>
    <div class="container mx-auto max-w-5xl">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          <span class="block text-gray-900 text-2xl">Small studio.</span>
          <span class="block text-accent relative">
            <span class="absolute transition-opacity duration-1000" :class="showGames ? 'opacity-100' : 'opacity-0'">Big
              Games.</span>
            <span class="absolute transition-opacity duration-1000"
              :class="!showGames ? 'opacity-100' : 'opacity-0'">Big Dreams.</span>
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
