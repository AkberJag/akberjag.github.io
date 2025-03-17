<script setup>
import { Check, InfoIcon, X, TriangleAlert } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const pricingPlans = [
  {
    title: 'products/TeleBillBot.pricing.plans.selfHosted.title',
    price: '₹999',
    duration: 'products/TeleBillBot.pricing.plans.selfHosted.duration',
    description: 'products/TeleBillBot.pricing.plans.selfHosted.description',
    features: [
      { text: 'products/TeleBillBot.pricing.plans.selfHosted.features[0]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.selfHosted.features[1]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.selfHosted.features[2]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.selfHosted.features[3]', included: true, icon: TriangleAlert },
      { text: 'products/TeleBillBot.pricing.plans.selfHosted.features[4]', included: false, icon: X },
    ],
    isPopular: false,
  },
  {
    title: 'products/TeleBillBot.pricing.plans.threeYear.title',
    price: '₹3,499',
    duration: 'products/TeleBillBot.pricing.plans.threeYear.duration',
    description: 'products/TeleBillBot.pricing.plans.threeYear.description',
    features: [
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[0]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[1]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[2]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[3]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[4]', included: true },
    ],
    isPopular: true,
  },
  {
    title: 'products/TeleBillBot.pricing.plans.annual.title',
    price: '₹4,499',
    duration: 'products/TeleBillBot.pricing.plans.annual.duration',
    description: 'products/TeleBillBot.pricing.plans.annual.description',
    features: [
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[0]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[1]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[2]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[3]', included: true },
      { text: 'products/TeleBillBot.pricing.plans.commonFeatures[4]', included: true },
    ],
    isPopular: false,
  },

];
</script>

<template>
  <section id="pricing" class="min-h-screen flex items-center py-8">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
        {{ t('products/TeleBillBot.pricing.title') }}
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        {{ t('products/TeleBillBot.pricing.subtitle') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Dynamic Pricing Cards -->
        <div v-for="plan in pricingPlans" :key="plan.title"
          class="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-600 flex flex-col"
          :class="{ 'border-2 border-primary-500 transform md:scale-105': plan.isPopular }">
          <!-- Popular Badge -->
          <div v-if="plan.isPopular" class="bg-primary-500 text-white text-center py-2 text-sm font-medium">
            {{ t('products/TeleBillBot.pricing.plans.annual.label') }}
          </div>

          <!-- Plan Details -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-600">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ t(plan.title) }}
            </h3>
            <div class="flex items-baseline mb-4">
              <span class="text-4xl font-bold text-gray-900 dark:text-white">{{ plan.price }}</span>
              <span class="ml-2 text-gray-600 dark:text-gray-400"> {{ t(plan.duration) }}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t(plan.description) }}
            </p>
          </div>

          <!-- Features List -->
          <div class="p-6 flex-grow">
            <ul class="space-y-3">
              <li v-for="feature in plan.features" :key="feature.text" class="flex">
                <!-- Icon Container with Fixed Width -->
                <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <!-- Icon Logic -->
                  <template v-if="feature.included">
                    <component :is="feature.icon || Check" :size="20" :class="{
                      'text-green-500': !feature.icon,
                      'text-yellow-500': feature.icon === TriangleAlert,
                    }" />
                  </template>
                  <X v-else :size="20" class="text-red-500" />
                </div>
                <!-- Text with proper spacing -->
                <span class="ml-2 text-gray-700 dark:text-gray-300"
                  :class="{ 'text-gray-400 dark:text-gray-500': !feature.included }">
                  {{ t(feature.text) }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Button at the Bottom -->
          <!-- <div class="p-6">
            <button
              class="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              {{ t('products/TeleBillBot.pricing.button') }}
            </button>
          </div> -->
        </div>
      </div>

      <!-- Note Section -->
      <div class="mt-12 bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-3xl mx-auto">
        <div class="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <!-- Icon -->
          <InfoIcon class="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
          <!-- Text -->
          <p class="ml-3">
            <strong>Note:</strong> {{ t('products/TeleBillBot.pricing.note') }}
          </p>
        </div>
      </div>

      <!-- Custom Price Message -->
      <div class="mt-2 text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        <p>
          {{ t('products/TeleBillBot.pricing.customPriceMessage') }}
        </p>
      </div>
    </div>
  </section>
</template>
