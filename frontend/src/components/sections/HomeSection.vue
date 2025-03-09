<script setup>
import { ref, computed, inject, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronRight, ExternalLink, X } from 'lucide-vue-next'

const { t, locale } = useI18n()

const data = computed(() => ({
  greeting: t('sections.home.greeting'),
  name: t('sections.home.personName'),
  secondaryName: t('sections.home.secondaryName'),
  title: t('sections.home.title'),
  subtitle: t('sections.home.subtitle')
}))

const products = [
  { name: 'sections.home.products.items[0]', url: 'products/telebot' },
  { name: 'sections.home.products.items[1]', url: 'products/weeGames' },
]

const sections = inject('sections')
const contactSection = computed(() => sections.find(section => section.key === 'contact'))

// Animation refs and state
const greetingRef = ref(null)
const alternatingTextRef = ref(null)
const showCursor = ref(true)
const showContent = ref(false)

// Products popup state
const productsOpen = ref(false)
const productsButtonRef = ref(null)
const popupPosition = ref({ top: 0, left: 0 })
const isMobile = ref(false)

// Animation control and timing
let cursorInterval = null
let animationController = null
const TYPE_SPEED = 100
const ERASE_SPEED = 50
const NAME_DISPLAY_TIME = 5000
const SECONDARY_NAME_DISPLAY_TIME = 3000

// Animation functions
const createAnimationController = () => {
  if (animationController) animationController.abort()
  return new AbortController()
}

const typeWriter = async (element, text, speed = TYPE_SPEED, signal) => {
  if (!element) return

  element.textContent = ''
  for (let i = 0; i < text.length && !signal?.aborted; i++) {
    element.textContent += text.charAt(i)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

const eraseText = async (element, speed = ERASE_SPEED, signal) => {
  if (!element) return

  while (element.textContent.length > 0 && !signal?.aborted) {
    element.textContent = element.textContent.slice(0, -1)
    await new Promise(resolve => setTimeout(resolve, speed))
  }
}

const blinkCursor = () => {
  if (cursorInterval) clearInterval(cursorInterval)
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

const alternateText = async (signal) => {
  if (!alternatingTextRef.value) return

  if (!data.value.secondaryName) {
    await typeWriter(alternatingTextRef.value, data.value.name, TYPE_SPEED, signal)
    return
  }

  while (!signal?.aborted) {
    await typeWriter(alternatingTextRef.value, data.value.name, TYPE_SPEED, signal)
    if (signal?.aborted) break

    await new Promise(resolve => {
      const timeout = setTimeout(resolve, NAME_DISPLAY_TIME)
      signal?.addEventListener('abort', () => clearTimeout(timeout))
    })
    if (signal?.aborted) break

    await eraseText(alternatingTextRef.value, ERASE_SPEED, signal)
    if (signal?.aborted) break

    await typeWriter(alternatingTextRef.value, data.value.secondaryName, TYPE_SPEED, signal)
    if (signal?.aborted) break

    await new Promise(resolve => {
      const timeout = setTimeout(resolve, SECONDARY_NAME_DISPLAY_TIME)
      signal?.addEventListener('abort', () => clearTimeout(timeout))
    })
    if (signal?.aborted) break

    await eraseText(alternatingTextRef.value, ERASE_SPEED, signal)
  }
}

const startAnimations = async () => {
  animationController = createAnimationController()
  const signal = animationController.signal

  blinkCursor()
  await typeWriter(greetingRef.value, data.value.greeting, TYPE_SPEED, signal)
  if (signal.aborted) return

  showContent.value = true

  await new Promise(resolve => {
    const timeout = setTimeout(resolve, 1000)
    signal?.addEventListener('abort', () => clearTimeout(timeout))
  })
  if (signal.aborted) return

  alternateText(signal)
}

// Products popup functions
const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const updatePopupPosition = () => {
  if (!productsButtonRef.value) return

  checkIsMobile()

  if (!isMobile.value) {
    const buttonRect = productsButtonRef.value.getBoundingClientRect()
    const width = Math.max(buttonRect.width, 280)

    let left = buttonRect.left
    // Ensure popup stays within viewport horizontally
    if (left + width > window.innerWidth - 16) {
      left = window.innerWidth - width - 16
    }
    if (left < 16) {
      left = 16
    }

    // Calculate available space below the button
    const spaceBelow = window.innerHeight - buttonRect.bottom - 16 // 16px margin
    const popupHeight = 200 // Approximate height of the popup, adjust as needed

    let top = buttonRect.bottom + window.scrollY + 8 // Default position below the button

    // If there's not enough space below, show the popup above the button
    if (spaceBelow < popupHeight) {
      top = buttonRect.top + window.scrollY - popupHeight + 50 // 8px margin
    }

    popupPosition.value = {
      top,
      left,
      width
    }
  }
}

const toggleProducts = () => {
  checkIsMobile()
  updatePopupPosition()
  productsOpen.value = !productsOpen.value

  // Prevent scrolling when popup is open on mobile
  document.body.style.overflow = (isMobile.value && productsOpen.value) ? 'hidden' : ''
}

const closeProducts = () => {
  productsOpen.value = false
  document.body.style.overflow = ''
}

// Event handlers
const closeProductsOnOutsideClick = (event) => {
  if (!productsOpen.value || !productsButtonRef.value) return

  const popover = document.querySelector('.products-popover')
  const backdrop = document.querySelector('.products-backdrop')

  if (!productsButtonRef.value.contains(event.target) &&
    ((popover && !popover.contains(event.target)) ||
      (backdrop && backdrop.contains(event.target)))) {
    closeProducts()
  }
}

const handleResize = () => {
  checkIsMobile()
  if (productsOpen.value && !isMobile.value) {
    updatePopupPosition()
  }
}

const handleScroll = () => {
  if (productsOpen.value && !isMobile.value) {
    closeProducts()
  }
}

// Watch for language changes
watch(locale, startAnimations)

onMounted(() => {
  startAnimations()
  checkIsMobile()

  document.addEventListener('click', closeProductsOnOutsideClick)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (cursorInterval) clearInterval(cursorInterval)
  if (animationController) animationController.abort()

  document.body.style.overflow = ''
  document.removeEventListener('click', closeProductsOnOutsideClick)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Main content -->
    <div class="flex flex-col items-center justify-center min-h-screen text-gray-800 dark:text-white p-4 relative">
      <div class="text-center z-10 space-y-6">
        <!-- Animated greeting -->
        <h1 class="text-4xl md:text-5xl font-bold">
          <span ref="greetingRef" class="inline-block"></span>
          <span class="inline-block w-0.5 h-8 bg-gray-800 dark:bg-white ml-1"
            :class="{ 'opacity-0': !showCursor }"></span>
        </h1>

        <!-- Content that appears after greeting -->
        <div class="space-y-6 transition-opacity duration-1000"
          :class="{ 'opacity-0': !showContent, 'opacity-100': showContent }">
          <h2 class="text-3xl md:text-4xl font-bold">
            <span class="text-teal-500 dark:text-teal-400">{{ t('sections.home.itsMe') }}</span>&nbsp;
            <span ref="alternatingTextRef" class="text-yellow-500 dark:text-yellow-400"></span>
          </h2>
          <p class="text-xl md:text-2xl">{{ data.title }}</p>
          <p class="text-lg text-gray-600 dark:text-gray-400">{{ data.subtitle }}</p>

          <!-- Action buttons -->
          <div class="flex flex-wrap justify-center gap-4">
            <router-link v-if="contactSection" :to="'/' + contactSection.path"
              class="inline-block px-8 py-3 font-bold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-bl from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 dark:from-primary-500 dark:to-primary-700 dark:hover:from-primary-600 dark:hover:to-primary-800">
              {{ t('sections.home.getInTouch') }}
            </router-link>

            <button ref="productsButtonRef"
              class="inline-flex items-center px-8 py-3 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
              @click.stop="toggleProducts">
              <span>{{ t('sections.home.products.title') }}</span>
              <ChevronRight :class="{ 'rotate-90': productsOpen }"
                class="size-5 ml-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popups (Teleported to body) -->
    <Teleport to="body">
      <!-- Mobile backdrop -->
      <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="productsOpen && isMobile" class="products-backdrop fixed inset-0 bg-black bg-opacity-50 z-40"
          @click="closeProducts">
        </div>
      </Transition>

      <!-- Desktop popover -->
      <Transition enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0">
        <div v-if="productsOpen && !isMobile"
          class="products-popover fixed rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          :style="{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            width: `${popupPosition.width}px`,
            maxWidth: 'calc(100vw - 32px)',
          }" role="menu" aria-orientation="vertical" aria-labelledby="products-menu">
          <div class="py-2 space-y-4" role="none">
            <div class="space-y-3 max-h-[60vh] overflow-y-auto">
              <a v-for="product in products" :key="product.name" :href="product.url" target="_blank"
                rel="noopener noreferrer"
                class="block p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <div class="flex items-start justify-between">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ t(product.name) }}</h4>
                  <ExternalLink class="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Mobile action sheet -->
      <Transition enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="transform translate-y-full" enter-to-class="transform translate-y-0"
        leave-active-class="transition-transform duration-200 ease-in" leave-from-class="transform translate-y-0"
        leave-to-class="transform translate-y-full">
        <div v-if="productsOpen && isMobile"
          class="products-action-sheet fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-xl z-50 overflow-hidden max-h-[85vh] flex flex-col">
          <!-- Drag handle -->
          <div class="pt-2 pb-1 flex justify-center">
            <div class="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>

          <!-- Header -->
          <div class="px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ t('sections.home.products.title') }}
            </h3>
            <button class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" @click="closeProducts">
              <X class="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <!-- Content -->
          <div class="py-2 overflow-y-auto flex-grow">
            <div class="space-y-1">
              <a v-for="product in products" :key="product.name" :href="product.url" target="_blank"
                rel="noopener noreferrer"
                class="block p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <div class="flex items-start justify-between">
                  <h4 class="font-medium text-gray-900 dark:text-white text-lg">{{ t(product.name) }}</h4>
                  <ExternalLink class="h-5 w-5 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                </div>
              </a>
            </div>
          </div>

          <!-- iOS safe area -->
          <div class="h-6"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
