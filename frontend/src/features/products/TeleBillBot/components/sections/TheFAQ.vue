<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t, tm } = useI18n()

// Fetch the FAQs from the translation file
const faqs = computed(() => {
  const faqMessage = tm('products/TeleBillBot.faq')
  return faqMessage.items || []
})
</script>

<template>
  <section id="faq" class="min-h-screen flex items-center bg-gray-100 dark:bg-gray-800 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {{ t('products/TeleBillBot.faq.title') }}
        </p>
      </div>
      <div class="mt-12">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
          <div v-for="(faq, index) in faqs" :key="index">
            <dt class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {{ faq.question }}
            </dt>
            <dd class="mt-2 text-base text-gray-600 dark:text-gray-300">
              {{ faq.answer }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
