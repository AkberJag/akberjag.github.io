<script setup>
import { useI18n } from 'vue-i18n';
import TheMessageBox from '../TheMessageBox.vue';
const { t } = useI18n();

const emailSubject = encodeURIComponent("TeleBillBot Inquiry");
const emailBody = encodeURIComponent("Hello TeleBillBot team,\n\nI'm interested in learning more about your service.");
const mailtoLink = `mailto:akberjag@gmail.com?subject=${emailSubject}&body=${emailBody}`;
</script>
<template>
  <section id="hero" class="min-h-screen flex items-center p-14 pt-24">
    <div class="flex flex-col md:flex-row items-center w-full">
      <div class="md:w-1/2 mb-8 md:mb-0">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('products/TeleBillBot.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {{ t('products/TeleBillBot.hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a :href=mailtoLink
            class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-center">
            {{ t('products/TeleBillBot.hero.buttons.getStarted') }}
          </a>
        </div>
      </div>
      <div class="md:w-1/2">
        <!-- Use the MessageBox component -->
        <TheMessageBox />
      </div>
    </div>
  </section>
</template>
