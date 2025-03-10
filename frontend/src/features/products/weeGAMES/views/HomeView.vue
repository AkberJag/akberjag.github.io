<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheHeader from '../components/layout/TheHeader.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import GamesSection from '../components/sections/GamesSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import AppFooter from '../components/layout/TheFooter.vue'
// Import favicon
import faviconImage from '/faviconwee.png'

// State for mobile menu
const mobileMenuOpen = ref(false)
// State for scroll position
const scrolled = ref(false)
// State for active section
const activeSection = ref('home')
const sections = ['home', 'games', 'contact']
const sectionOffsets = ref({})
// Section titles mapping
const sectionTitles = {
  'home': 'Home | wee GAMES',
  'games': 'Our Games | wee GAMES',
  'contact': 'Contact Us | wee GAMES'
}

const updateFavicon = () => {
  const link = document.querySelector("link[rel~='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'icon'
  link.href = faviconImage
  document.head.appendChild(link)
}

// Update page title function
const updatePageTitle = (section) => {
  document.title = sectionTitles[section] || 'wee GAMES'
}

// Handle scroll event
const handleScroll = () => {
  scrolled.value = window.scrollY > 50

  // Determine active section
  const currentPosition = window.scrollY + window.innerHeight / 3
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const offset = element.offsetTop
      sectionOffsets.value[section] = offset
      if (
        currentPosition >= offset &&
        currentPosition < offset + element.offsetHeight
      ) {
        if (activeSection.value !== section) {
          activeSection.value = section
          // Update URL hash when section changes
          history.replaceState(null, '', `#${section}`)
          // Update page title
          updatePageTitle(section)
        }
      }
    }
  }
}

// Update active section method called from TheHeader
const updateActiveSection = section => {
  activeSection.value = section
  // Update page title
  updatePageTitle(section)
  // URL hash will be updated by the scrollToSection method in TheHeader
}

// Check URL hash on initial load
const setInitialSectionFromHash = () => {
  const hash = window.location.hash
  if (hash && sections.includes(hash.substring(1))) {
    activeSection.value = hash.substring(1)
    // Update page title for initial section
    updatePageTitle(hash.substring(1))
    // Let the browser's default scroll behavior work
  } else {
    // Set default page title if no hash
    updatePageTitle('home')
  }
}

// Add and remove scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Initial calculation of section positions
  handleScroll()
  // Check for hash in URL on initial load
  setInitialSectionFromHash()
  updateFavicon()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 font-game">
    <!-- Navigation Bar -->
    <TheHeader :active-section="activeSection" :scrolled="scrolled" :mobile-menu-open="mobileMenuOpen"
      @toggle-menu="mobileMenuOpen = !mobileMenuOpen" @update-active-section="updateActiveSection" />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Games Section -->
    <GamesSection />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

:root {
  --color-accent: 255, 107, 107;
}

.text-accent {
  color: rgb(var(--color-accent));
}

.bg-accent {
  background-color: rgb(var(--color-accent));
}

.text-accent\/90 {
  color: rgba(var(--color-accent), 0.9);
}

.bg-accent\/40 {
  background-color: rgba(var(--color-accent), 0.4);
}

.bg-accent\/80 {
  background-color: rgba(var(--color-accent), 0.8);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 65px;
  /* Ensures scrolling to anchors accounts for fixed header */
}

body {
  font-family:
    'Nunito',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}

.font-game {
  font-family: 'Nunito', sans-serif;
}

/* Button animation */
.cta-button {
  position: relative;
  overflow: hidden;
}

.cta-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  transition: 0.5s;
}

.cta-button:hover::after {
  left: 100%;
}
</style>
