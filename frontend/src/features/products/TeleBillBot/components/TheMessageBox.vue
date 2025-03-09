<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { Send } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import billImage from '@/assets/images/billImage.png';
import offerImage from '@/assets/images/offerImage.png'
import happyNYImage from '@/assets/images/happyNYImage.png'

const { t } = useI18n();
const messages = ref([]);
const messageContainer = ref(null);
const hasStarted = ref(false);

// utils
// Format date as DD.MM.YYYY
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Date parameters
const currentDate = computed(() => {
  const now = new Date();
  return formatDate(now);
});

const weekAgoDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return formatDate(date);
});

const scrollToBottom = () => {
  if (messageContainer.value) {
    nextTick(() => {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    });
  }
};

const addMessage = (message) => {
  const delay = message.delay || 0; // Default delay is 0
  setTimeout(() => {
    messages.value.push({
      ...message,
      text: t(message.key, message.params || {}),
    });
    scrollToBottom();
  }, delay);
};

// Function to send a message
const inputText = ref('');
const sendMessage = () => {
  const text = inputText.value.trim();
  if (text) {
    addMessage({ type: 'user', key: text, delay: 500 }); // Add user message with a delay of 500ms
    if (text === '/start') {
      handleStartCommand();
    } else if (text === '/old_bills') {
      handleOldBillsCommand();
    }
    inputText.value = ''; // Clear the input after sending
  }
};

// Handle /start command
const handleStartCommand = () => {
  if (hasStarted.value) {
    addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.alreadyRegistered', delay: 1500 });
  } else {
    hasStarted.value = true;
    addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.welcome', delay: 1500, params: { user: 'User' } });
    // Simulate sending the bill after a delay
    setTimeout(() => {
      addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.billReady', delay: 0, params: { date: currentDate.value } });
    }, 3500);
  }
};

// Handle /old_bills command
const handleOldBillsCommand = () => {
  if (hasStarted.value) {
    addMessage({
      type: 'bot',
      key: 'products/TeleBillBot.hero.messages.bot.usageBreakdown',
      delay: 1500,
      image: billImage,
      params: {
        from: weekAgoDate.value,
        to: currentDate.value
      }
    });

    setTimeout(() => {
      addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.specialOffer', delay: 2000, image: offerImage });
    }, 4000);

    setTimeout(() => {
      addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.specialOffer', delay: 2000, image: happyNYImage });
    }, 4000);
  } else {
    addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.initialPrompt', delay: 1000 });
  }
};

// Simulate an initial message
onMounted(() => {
  addMessage({ type: 'bot', key: 'products/TeleBillBot.hero.messages.bot.initialPrompt', delay: 1000 });
});
</script>
<template>
  <div class="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg h-[400px] lg:h-[600px] flex flex-col">
    <!-- Sticky Header -->
    <div
      class="sticky top-0 bg-gray-200 dark:bg-gray-800 p-4 rounded-t-xl z-10 border-b border-gray-300 dark:border-gray-700">
      <div class="flex items-center">
        <div class="size-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
          <Send />
        </div>
        <div class="ml-3">
          <h3 class="font-bold text-gray-900 dark:text-white">{{ t('products/TeleBillBot.title') }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{
            t('products/TeleBillBot.hero.messages.bot.subTitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Scrollable Messages -->
    <div ref="messageContainer" class="flex-1 overflow-y-auto p-6">
      <transition-group name="message" tag="div">
        <div v-for="(message, index) in messages" :key="index"
          :class="['rounded-lg p-4 mb-3', message.type === 'user' ? 'bg-white dark:bg-gray-700 ml-auto' : 'bg-primary-100 dark:bg-primary-900']"
          style="max-width: fit-content;">
          <img v-if="message.image" :src="message.image" alt="Graph" class="mt-2 rounded-lg max-w-[400px] h-auto" />
          <p :class="['text-gray-800 dark:text-gray-200', message.type === 'user' ? 'text-right' : 'text-left']"
            class="whitespace-pre-line">
            {{ message.text }}
          </p>
        </div>
      </transition-group>
    </div>

    <!-- Input Section -->
    <div
      class="sticky bottom-0 bg-gray-200 dark:bg-gray-800 p-4 rounded-b-xl border-t border-gray-300 dark:border-gray-700">
      <div class="flex gap-2">
        <input v-model="inputText" type="text" placeholder="Type /start"
          class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          @keyup.enter="sendMessage" list="suggestions" />
        <datalist id="suggestions">
          <option value="/start"></option>
          <option value="/old_bills"></option>
        </datalist>
        <button @click="sendMessage"
          class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.message-enter-active,
.message-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.message-enter-to,
.message-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
