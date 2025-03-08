<!-- lol this is too bad, but I don't want to use v-html -->
<template>
  <div class="flex justify-center items-center min-h-screen w-full p-4">
    <div class="max-w-2xl text-center px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
        {{ $t('sections.about.heading') }}
      </h2>
      <div class="text-sm md:text-lg text-gray-600 dark:text-gray-300 space-y-6">
        <p>
          {{ $t('sections.about.paragraph1.before_flask') }}
          <span class="font-bold">{{ $t('sections.about.paragraph1.flask') }}</span>
          {{ $t('sections.about.paragraph1.between_flask_fastapi') }}
          <span class="font-bold">{{ $t('sections.about.paragraph1.fastapi') }}</span>
          {{ $t('sections.about.paragraph1.between_fastapi_vue') }}
          <span class="font-bold">{{ $t('sections.about.paragraph1.vue') }}</span>
          {{ $t('sections.about.paragraph1.after_vue') }}
        </p>
        <p>
          {{ $t('sections.about.paragraph2.before_godot') }}
          <span class="font-bold">{{ $t('sections.about.paragraph2.godot') }}</span>
          {{ $t('sections.about.paragraph2.after_godot') }}
        </p>
        <p>
          {{ $t('sections.about.paragraph3.before_radio') }}
          <span class="font-bold">{{ $t('sections.about.paragraph3.radio') }}</span>
          {{ $t('sections.about.paragraph3.middle') }}
          <span class="font-bold">{{ $t('sections.about.paragraph3.field') }}</span>
          {{ $t('sections.about.paragraph3.between_field_problem') }}
          <span class="font-bold">{{ $t('sections.about.paragraph3.problem') }}</span>
          {{ $t('sections.about.paragraph3.after_problem') }}
        </p>
        <p>{{ $t('sections.about.paragraph4') }}</p>
      </div>
    </div>
  </div>
</template>
