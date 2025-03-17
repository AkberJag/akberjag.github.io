<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { MessageCircle, Palette, Menu, X } from 'lucide-vue-next';
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const settingsOpen = ref(false);

const emit = defineEmits(['toggleMenu', 'startScrolling'])

const navItems = computed(() => [
  { label: t('products/TeleBillBot.navigation.features'), section: 'features', href: '#features' },
  { label: t('products/TeleBillBot.navigation.pricing'), section: 'pricing', href: '#pricing' },
  { label: t('products/TeleBillBot.navigation.faq'), section: 'faq', href: '#faq' }
]);

const scrollToSection = sectionId => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Emit event to parent to handle scroll locking
    emit('startScrolling', sectionId)

    // Perform the scroll
    window.scrollTo({
      top: element.offsetTop - 52,
      behavior: 'smooth',
    })
  }
}

const scrollToSectionAndCloseMenu = sectionId => {
  scrollToSection(sectionId)
  emit('toggleMenu')
}

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value;
}

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
  <nav class="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out"
    :class="[
      scrolled ? 'py-2 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' : 'py-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/50 dark:to-indigo-950/50']"
    role="banner">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center">
        <MessageCircle class="text-primary-600 dark:text-primary-400 mr-2" :class="[
          'transition-all',
          scrolled ? 'size-6' : 'size-8'
        ]" />
        <div :class="['font-bold text-primary-600 dark:text-primary-400 transition-all duration-300',
          { 'text-xl': scrolled, 'text-2xl': !scrolled }]">{{ t('products/TeleBillBot.title') }}</div>
      </div>

      <!-- Navigation Links - Desktop Only -->
      <nav class="hidden md:flex items-center justify-center space-x-8 flex-1" aria-label="Main navigation">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          class="cursor-pointer transition-colors text-center relative" :class="activeSection === item.section
            ? 'text-primary-600 dark:text-primary-400 font-medium' :
            'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
            " :aria-current="activeSection === item.section ? 'page' : undefined"
          @click.prevent="scrollToSection(item.section)">
          {{ item.label }}
          <span v-if="activeSection === item.section"
            class="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform transition-transform duration-300"></span>
        </a>
      </nav>

      <!-- Mobile Controls Container -->
      <div class="flex items-center space-x-2">
        <!-- Settings Button -->
        <button @click="toggleSettings"
          class="settings-button p-2 rounded-full text-gray-700 dark:text-gray-300 focus:outline-none">
          <Palette class="w-5 h-5" />
        </button>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-gray-600 focus:outline-none rounded p-1" @click="$emit('toggleMenu')"
          :aria-expanded="mobileMenuOpen" aria-controls="mobile-menu" aria-label="Toggle menu">
          <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Settings Popover -->
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
              <LanguageSwitcher />
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
            {{ $t('settings.customize.label') }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </nav>

  <!-- Mobile Menu - Full screen overlay -->
  <div v-if="mobileMenuOpen" id="mobile-menu" class="fixed inset-0 z-40 md:hidden bg-white dark:bg-gray-900"
    aria-label="Mobile navigation">
    <div class="flex flex-col h-full">
      <div class="pt-24 px-6 flex-1">
        <div class="flex flex-col space-y-6 text-center">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            class="text-xl font-medium py-2 transition-colors focus:outline-none rounded flex items-center justify-center"
            :class="activeSection === item.section ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'"
            :aria-current="activeSection === item.section ? 'page' : undefined"
            @click.prevent="scrollToSectionAndCloseMenu(item.section)">
            {{ item.label }}
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
