<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { MessageCircle, Palette } from 'lucide-vue-next';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const mobileMenuOpen = ref(false);
const settingsOpen = ref(false);

defineProps({
  activeSection: {
    type: String,
    required: true,
  },
  isScrolled: {
    type: Boolean,
    required: true,
  },
  feature: {}
});

const navItems = computed(() => [
  { name: t('products/TeleBillBot.navigation.features'), id: 'features' },
  { name: t('products/TeleBillBot.navigation.pricing'), id: 'pricing' },
  { name: t('products/TeleBillBot.navigation.faq'), id: 'faq' }
]);

// Define emits for parent component communication
const emit = defineEmits(['navigate']);

function scrollToSection(sectionId) {
  // First, emit the navigate event so the parent can update state and URL
  emit('navigate', sectionId);

  // Then handle the actual scrolling
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 60,
      behavior: 'smooth'
    });
  }

  // Close mobile menu if open
  mobileMenuOpen.value = false;
}

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value;
}

// Close settings popover when clicking outside
const closeSettingsPopover = (event) => {
  if (settingsOpen.value &&
    !event.target.closest('.settings-button') &&
    !event.target.closest('.settings-popover')) {
    settingsOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeSettingsPopover);
});

onUnmounted(() => {
  document.removeEventListener('click', closeSettingsPopover);
});


</script>

<template>
  <nav :class="[
    'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
    isScrolled ? 'py-2 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' : 'py-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/50 dark:to-indigo-950/50'
  ]">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <div class="flex items-center">
        <MessageCircle class="text-primary-600 dark:text-primary-400 mr-2" :class="[
          'transition-all',
          isScrolled ? 'size-6' : 'size-8 '
        ]" />
        <div :class="['font-bold text-primary-600 dark:text-primary-400 transition-all duration-300',
          { 'text-xl': isScrolled, 'text-2xl': !isScrolled }]">{{ t('products/TeleBillBot.title') }}</div>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <a v-for="(item, index) in navItems" :key="index" @click.prevent="scrollToSection(item.id)" :class="['cursor-pointer transition-colors',
          activeSection === item.id ?
            'text-primary-600 dark:text-primary-400 font-medium' :
            'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400']" href="#">
          {{ item.name }}
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center space-x-4">
        <button @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none">
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <!-- Settings Button (Desktop) -->
        <button @click="toggleSettings"
          class="settings-button p-2 rounded-full text-gray-700 dark:text-gray-300 focus:outline-none">
          <Palette class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen"
      class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
      <div class="container mx-auto px-4 flex flex-col space-y-4">
        <a v-for="(item, index) in navItems" :key="index" @click="scrollToSection(item.id); mobileMenuOpen = false"
          :class="['block py-2 px-4 rounded-md cursor-pointer transition-colors',
            activeSection === item.id ?
              'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium' :
              'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800']" href="#">
          {{ item.name }}
        </a>
      </div>
    </div>

    <!-- Settings Popover with Teleport and Animation -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0">
        <div v-if="settingsOpen"
          class="settings-popover fixed top-20 right-4 md:right-8 w-72 rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
          role="menu" aria-orientation="vertical" aria-labelledby="settings-menu">
          <div class="p-4 space-y-6" role="none">
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <LanguageSwitcher :feature="feature" />
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
            {{ $t('settings.customize.label') }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>
