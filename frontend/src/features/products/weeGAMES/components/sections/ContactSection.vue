<script setup>
import { Mail as MailIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const contactEmail = ref('weegames.help@gmail.com')
const emailSubject = ref('Question about a \'wee\' game')
const emailBody = ref('Hi, I have a question regarding your games...')
</script>

<template>
  <section id="contact" class="min-h-screen flex items-center py-20 px-6 bg-white">
    <div class="container mx-auto max-w-3xl text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">Get in touch</h2>
      <p class="text-gray-600 mb-10 leading-relaxed">
        Have questions or feedback about my games? I'd love to hear from you!
      </p>
      <a :href="`mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`"
        class="cta-button inline-flex items-center gap-3 px-8 py-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
        <MailIcon class="w-5 h-5 text-gray-700" />
        <span>{{ contactEmail }}</span>
      </a>
    </div>
  </section>
</template>
