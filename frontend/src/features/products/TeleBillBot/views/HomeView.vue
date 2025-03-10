<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import TheTopBar from '../components/TheTopBar.vue'
import TheHero from '../components/sections/TheHero.vue'
import { useFeatureTranslations } from '@/composables/useI18n'
import TheFeatures from '../components/sections/TheFeatures.vue'
import ThePricing from '../components/sections/ThePricing.vue'
import TheFAQ from '../components/sections/TheFAQ.vue'
import TheCTA from '../components/sections/TheCTA.vue'

const isScrolled = ref(false)
const activeSection = ref('hero')
const featureName = 'TeleBillBot'
const { t } = useFeatureTranslations('products/TeleBillBot')

// Define sections and their offsets
const sections = ['hero', 'features', 'pricing', 'faq']
const sectionOffsets = ref({})

// Use computed property for section titles to ensure they're reactive
const sectionTitles = computed(() => ({
  'hero': t('title', 'TeleBillBot'),
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

// Handle scroll event to update active section
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

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

// Update page title based on active section
function updatePageTitle(section) {
  document.title = sectionTitles.value[section] || 'TeleBillBot'
}

// Add this function to handle navigation from the TopBar component
function navigateToSection(sectionId) {
  // Update active section and title
  activeSection.value = sectionId
  updatePageTitle(sectionId)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Call once to set initial state

  // Set initial page title
  updatePageTitle(activeSection.value)
  updateFavicon()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="theme-provider">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Navigation -->
      <TheTopBar :activeSection="activeSection" :isScrolled="isScrolled" :feature="featureName"
        @navigate="navigateToSection" />

      <!-- Hero Section -->
      <TheHero id="hero" />

      <!-- Features Section -->
      <TheFeatures id="features" />

      <!-- Pricing Section -->
      <ThePricing id="pricing" />

      <!-- FAQ Section -->
      <TheFAQ id="faq" />

      <!-- CTA Section -->
      <TheCTA />

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12"> </footer>
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
