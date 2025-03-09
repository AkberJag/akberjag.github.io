<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emailSubject = encodeURIComponent("TeleBillBot Inquiry");
const emailBody = encodeURIComponent("Hello TeleBillBot team,\n\nI'm interested in learning more about your service.");
const mailtoLink = `mailto:akberjag@gmail.com?subject=${emailSubject}&body=${emailBody}`;
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {{ t('products/TeleBillBot.cta.title') }}
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        {{ t('products/TeleBillBot.cta.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a :href="mailtoLink"
          class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-center">
          {{ t('products/TeleBillBot.cta.buttons.getStarted') }}
        </a>
      </div>
    </div>
  </section>
</template>
