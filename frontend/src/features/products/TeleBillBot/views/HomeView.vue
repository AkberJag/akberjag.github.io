<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import TheHeader from '../components/layout/TheHeader.vue'

import TheHeroSection from '../components/sections/TheHero.vue'
import TheFeatures from '../components/sections/TheFeatures.vue'
import ThePricing from '../components/sections/ThePricing.vue'
import TheFAQ from '../components/sections/TheFAQ.vue'
import TheCTA from '../components/sections/TheCTA.vue'

import { useFeatureTranslations } from '@/composables/useI18n'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')
const sections = ['home', 'features', 'pricing', 'faq']
const sectionOffsets = ref({})

const { t } = useFeatureTranslations('products/TeleBillBot')

// Use computed property for section titles to ensure they're reactive
const sectionTitles = computed(() => ({
  'home': t('title', 'TeleBillBot'),
  'features': `${t('navigation.features')} | ${t('title')}`,
  'pricing': `${t('navigation.pricing')} | ${t('title')}`,
  'faq': `${t('navigation.faq')} | ${t('title')}`
}))

const updateFavicon = () => {
  const link = document.querySelector("link[rel~='icon']") || document.createElement('link')
  link.type = 'image/svg+xml'
  link.rel = 'icon'

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(37, 99, 235)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`

  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`

  link.href = dataUrl
  document.head.appendChild(link)
}

// Update page title function
const updatePageTitle = (section) => {
  document.title = sectionTitles.value[section] || 'Tele Bill Bot'
}

// Handle scroll event
const handleScroll = () => {
  scrolled.value = window.scrollY > 50

  // Calculate section offsets
  updateSectionOffsets()

  // Determine active section
  const currentPosition = window.scrollY + window.innerHeight / 3

  // Find the current active section
  let newActiveSection = sections[0] // Default to first section

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (sectionOffsets.value[section] && currentPosition >= sectionOffsets.value[section]) {
      newActiveSection = section
      break
    }
  }

  // Only update if section changed
  if (activeSection.value !== newActiveSection) {
    activeSection.value = newActiveSection
    // Update URL hash when section changes
    history.replaceState(null, '', `#${newActiveSection}`)
    // Update page title
    updatePageTitle(newActiveSection)
  }
}

// Update the section offsets
const updateSectionOffsets = () => {
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      sectionOffsets.value[section] = element.offsetTop
    }
  }
}

// Update active section (called from header)
const updateActiveSection = (section) => {
  activeSection.value = section
  updatePageTitle(section)
}

// Check URL hash on initial load
const setInitialSectionFromHash = () => {
  const hash = window.location.hash.substring(1)
  if (hash && sections.includes(hash)) {
    activeSection.value = hash
    // Update page title for initial section
    updatePageTitle(hash)
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
  updateSectionOffsets()
  // Check for hash in URL on initial load
  setInitialSectionFromHash()
  updateFavicon()

  // Initial scroll handler to set the correct active section
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="theme-provider">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Navigation Bar -->
      <TheHeader :active-section="activeSection" :scrolled="scrolled" :mobile-menu-open="mobileMenuOpen"
        @toggle-menu="mobileMenuOpen = !mobileMenuOpen" />

      <!-- Hero Section -->
      <TheHeroSection id="home" />

      <!-- Features Section -->
      <TheFeatures id="features" />

      <!-- Pricing Section -->
      <ThePricing id="pricing" />

      <!-- FAQ Section -->
      <TheFAQ id="faq" />

      <!-- CTA Section -->
      <TheCTA />
    </div>
  </div>
</template>

<style scoped>
.theme-provider {
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-200: #bae6fd;
  --primary-300: #7dd3fc;
  --primary-400: #38bdf8;
  --primary-500: #0ea5e9;
  --primary-600: #0284c7;
  --primary-700: #0369a1;
  --primary-800: #075985;
  --primary-900: #0c4a6e;
  --primary-950: #082f49;
  scroll-behavior: smooth;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

:deep(.dark) .theme-provider {
  --primary-50: #082f49;
  --primary-100: #0c4a6e;
  --primary-200: #075985;
  --primary-300: #0369a1;
  --primary-400: #0284c7;
  --primary-500: #0ea5e9;
  --primary-600: #38bdf8;
  --primary-700: #7dd3fc;
  --primary-800: #bae6fd;
  --primary-900: #e0f2fe;
  --primary-950: #f0f9ff;
}

.bg-primary-100 {
  background-color: var(--primary-100);
}

.bg-primary-500 {
  background-color: var(--primary-500);
}

.bg-primary-600 {
  background-color: var(--primary-600);
}

.bg-primary-700 {
  background-color: var(--primary-700);
}

.bg-primary-900 {
  background-color: var(--primary-900);
}

.text-primary-200 {
  color: var(--primary-200);
}

.text-primary-400 {
  color: var(--primary-400);
}

.text-primary-600 {
  color: var(--primary-600);
}

.text-primary-800 {
  color: var(--primary-800);
}

.border-primary-500 {
  border-color: var(--primary-500);
}
</style>
