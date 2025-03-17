<script setup>
import { Menu as MenuIcon, X as XIcon, Play as PlayIcon } from 'lucide-vue-next'

defineProps({
  activeSection: {
    type: String,
    default: 'home',
  },
  scrolled: {
    type: Boolean,
    default: false,
  },
  mobileMenuOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleMenu', 'startScrolling'])

const navItems = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'Games', href: '#games', section: 'games' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

const scrollToSection = sectionId => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Emit event to parent to handle scroll locking
    emit('startScrolling', sectionId)

    // Perform the scroll
    window.scrollTo({
      top: element.offsetTop - 65,
      behavior: 'smooth',
    })
  }
}

const scrollToSectionAndCloseMenu = sectionId => {
  scrollToSection(sectionId)
  emit('toggleMenu')
}
</script>

<template>
  <header class="fixed top-0 w-full z-50 transition-all duration-300" :class="{
    'py-6 bg-white/90 backdrop-blur-md': !scrolled,
    'py-3 bg-white shadow-md': scrolled,
  }" role="banner">
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#home" class="flex items-center focus:outline-none rounded-md" aria-label="weeGAMES home"
        @click.prevent="scrollToSection('home')">
        <div
          class="bg-accent rounded-md -rotate-6 hover:rotate-[360deg] flex items-center justify-center mr-3 transition-all duration-500"
          :class="scrolled ? 'size-8' : 'size-10'">
          <span class="text-white font-bold" :class="scrolled ? 'text-sm' : 'text-lg'">W</span>
        </div>
        <div class="font-bold tracking-tight" :class="scrolled ? '' : 'text-xl'">
          <span class="text-accent">wee</span>
          <span class="text-gray-800">GAMES</span>
        </div>
      </a>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center space-x-8" aria-label="Main navigation">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          class="transition-colors relative py-1 focus:outline-none rounded" :class="activeSection === item.section
            ? 'text-gray-900 font-medium'
            : 'text-gray-600 hover:text-gray-900'
            " :aria-current="activeSection === item.section ? 'page' : undefined"
          @click.prevent="scrollToSection(item.section)">
          {{ item.label }}
          <span v-if="activeSection === item.section"
            class="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform transition-transform duration-300"></span>
        </a>
        <a href="https://play.google.com/store/apps/dev?id=8307618757460048400" target="_blank"
          rel="noopener noreferrer"
          class="cta-button px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          aria-label="Visit our Play Store page">
          <PlayIcon class="w-4 h-4 inline-block mr-1" />
          Play Store
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-600 focus:outline-none rounded p-1" @click="$emit('toggleMenu')"
        :aria-expanded="mobileMenuOpen" aria-controls="mobile-menu" aria-label="Toggle menu">
        <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6" />
        <XIcon v-else class="w-6 h-6" />
      </button>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div v-if="mobileMenuOpen" id="mobile-menu" class="fixed inset-0 z-40 bg-white md:hidden"
    aria-label="Mobile navigation">
    <div class="flex flex-col h-full">
      <div class="pt-24 px-6 flex-1">
        <div class="flex flex-col space-y-6 text-center">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            class="text-xl font-medium py-2 transition-colors focus:outline-none rounded" :class="activeSection === item.section ? 'text-gray-900' : 'text-gray-600'
              " :aria-current="activeSection === item.section ? 'page' : undefined"
            @click.prevent="scrollToSectionAndCloseMenu(item.section)">
            {{ item.label }}
          </a>
          <a href="https://play.google.com/store/apps/dev?id=8307618757460048400" target="_blank"
            rel="noopener noreferrer"
            class="text-xl font-medium py-3 mt-4 bg-gray-900 text-white rounded-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            aria-label="Visit our Play Store page">
            <PlayIcon class="w-5 h-5 inline-block mr-2" />
            Play Store
          </a>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#mobile-menu {
  animation: fadeIn 0.3s ease-out;
}
</style>
