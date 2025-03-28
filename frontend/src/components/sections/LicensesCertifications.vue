<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n' // Import the i18n composable
import awsCFLImage from '@/assets/images/aws-certified-cloud-practitioner.png'
import radioImage from '@/assets/images/radio.png'
import Carousel from '../TheCarousel.vue'

const { t } = useI18n() // Initialize i18n

const featuredCertifications = ref([
  {
    title: t('sections.licensesAndCerts.featured.aws_cfl.title'),
    image: awsCFLImage,
    alt: t('sections.licensesAndCerts.featured.aws_cfl.alt'),
    details: t('sections.licensesAndCerts.featured.aws_cfl.details'),
    verifyLink: "https://www.credly.com/badges/a9d5e2c0-2b81-4018-9254-d53f15d8e4f4/public_url",
    featured: true
  },
  {
    title: t('sections.licensesAndCerts.featured.radio.title'),
    image: radioImage,
    alt: t('sections.licensesAndCerts.featured.radio.alt'),
    details: t('sections.licensesAndCerts.featured.radio.details'),
    featured: true
  }
])

const otherCertifications = ref([])

const allCertifications = computed(() => [...featuredCertifications.value, ...otherCertifications.value])
const hasOtherCertifications = computed(() => otherCertifications.value.length > 0)
const shouldShowOtherCertificationsCarousel = computed(() => otherCertifications.value.length > 4)

const featuredGridCols = computed(() => {
  const count = featuredCertifications.value.length
  return count === 1 ? 'grid-cols-1' : count === 2 ? 'grid-cols-2' : 'grid-cols-3'
})

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 4
  },
  {
    breakpoint: '1200px',
    numVisible: 3
  },
  {
    breakpoint: '1024px',
    numVisible: 2
  }
])
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <section class="min-w-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        {{ $t('sections.licensesAndCerts.name') }}
      </h2>

      <!-- Mobile and Tablet View: Single Carousel -->
      <div class="lg:hidden">
        <Carousel :items="allCertifications" :numVisible="1" :numScroll="1" circular>
          <template #item="{ data }">
            <div class="p-2 w-full max-w-[300px] mx-auto">
              <!-- Featured Certification Style -->
              <div v-if="data.featured" class="relative group h-64 w-64 mx-auto">
                <div
                  class="h-full w-full p-4 flex items-center justify-center rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 dark:bg-gray-800">
                  <img :src="data.image" :alt="data.alt"
                    class="max-h-48 max-w-48 w-auto h-auto object-contain rounded-lg" loading="lazy" />
                </div>
                <div
                  class="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h3 class="text-white text-lg font-semibold mb-2 text-center">{{ data.title }}</h3>
                  <p class="text-white text-sm text-center mb-3">{{ data.details }}</p>
                  <a v-if="data.verifyLink" :href="data.verifyLink" target="_blank" rel="noopener noreferrer"
                    class="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-xl ease-in-out transform hover:-translate-y-1 bg-gradient-to-bl from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700">
                    {{ $t('sections.licensesAndCerts.verifyButton') }}
                  </a>
                </div>
              </div>
              <!-- Other Certification Style -->
              <div v-else
                class="h-64 w-64 mx-auto flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4">
                <img :src="data.image" :alt="data.alt" class="max-h-48 max-w-48 w-auto h-auto object-contain rounded-lg"
                  loading="lazy" />
              </div>
            </div>
          </template>
        </Carousel>
      </div>

      <!-- Desktop View -->
      <div class="hidden lg:block space-y-12">
        <!-- Featured Certifications -->
        <div class="flex justify-center">
          <div :class="['grid gap-6', featuredGridCols, 'w-full max-w-5xl']">
            <div v-for="cert in featuredCertifications" :key="cert.title" class="relative group h-80 w-80 mx-auto">
              <div
                class="h-full w-full p-6 flex items-center justify-center rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 dark:bg-gray-800">
                <img :src="cert.image" :alt="cert.alt" class="max-h-64 max-w-64 w-auto h-auto object-contain rounded-lg"
                  loading="lazy" />
              </div>
              <div
                class="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <h3 class="text-white text-xl font-semibold mb-2 text-center">{{ cert.title }}</h3>
                <p class="text-white text-base text-center mb-4">{{ cert.details }}</p>
                <a v-if="cert.verifyLink" :href="cert.verifyLink" target="_blank" rel="noopener noreferrer"
                  class="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-xl ease-in-out transform hover:-translate-y-1 bg-gradient-to-bl from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700">
                  {{ $t('sections.licensesAndCerts.verifyButton') }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Certifications -->
        <div v-if="hasOtherCertifications" class="flex flex-col items-center w-full">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            {{ $t('sections.licensesAndCerts.additionalHeading') }}
          </h3>
          <!-- Grid for 6 or fewer items -->
          <div v-if="!shouldShowOtherCertificationsCarousel" class="flex justify-center w-full">
            <div class="inline-flex flex-wrap justify-center gap-4 max-w-[1200px]">
              <div v-for="cert in otherCertifications" :key="cert.title"
                class="h-48 w-48 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <img :src="cert.image" :alt="cert.alt" class="max-h-32 max-w-32 w-auto h-auto object-contain rounded-lg"
                  loading="lazy" />
              </div>
            </div>
          </div>
          <!-- Carousel for more than 6 items -->
          <div v-else class="w-full flex justify-center">
            <Carousel :items="otherCertifications" :responsiveOptions="responsiveOptions" :numVisible="6" :numScroll="1"
              circular class="w-full max-w-7xl">
              <template #item="{ data }">
                <div class="p-2 flex justify-center">
                  <div
                    class="h-48 w-48 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                    <img :src="data.image" :alt="data.alt"
                      class="max-h-32 max-w-32 w-auto h-auto object-contain rounded-lg" loading="lazy" />
                  </div>
                </div>
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
