<script setup>
import { useI18n } from 'vue-i18n';
import { Receipt, MessageSquare, Users, Smartphone, Calendar, Megaphone } from 'lucide-vue-next';

const { t } = useI18n();

const features = [
  {
    icon: Receipt,
    title: 'products/TeleBillBot.features.items[0].title',
    description: 'products/TeleBillBot.features.items[0].description',
  },
  {
    icon: MessageSquare,
    title: 'products/TeleBillBot.features.items[1].title',
    description: 'products/TeleBillBot.features.items[1].description',
  },
  {
    icon: Users,
    title: 'products/TeleBillBot.features.items[2].title',
    description: 'products/TeleBillBot.features.items[2].description',
  },
  {
    icon: Smartphone,
    title: 'products/TeleBillBot.features.items[3].title',
    description: 'products/TeleBillBot.features.items[3].description',
  },
  {
    icon: Calendar,
    title: 'products/TeleBillBot.features.items[4].title',
    description: 'products/TeleBillBot.features.items[4].description',
  },
  {
    icon: Megaphone,
    title: 'products/TeleBillBot.features.items[5].title',
    description: 'products/TeleBillBot.features.items[5].description',
  },
];
</script>

<template>
  <section id="features" class="min-h-screen flex items-center bg-gray-100 dark:bg-gray-800 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        {{ t('products/TeleBillBot.features.title') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Dynamically render features -->
        <div v-for="(feature, index) in features" :key="index"
          class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
            <component :is="feature.icon" class="text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ t(feature.title) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t(feature.description) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
