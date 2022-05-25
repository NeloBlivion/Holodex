<template>
  <div class="relative py-8">
    <div
      class="absolute inset-0 bg-[url(/img/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    <div class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5">
      <header class="px-4 pt-6 prose-sm md:px-6 md:prose">
        <h1>Holodex Test Kitchensink</h1>
        <p class="pb-4 text-xl leading-relaxed tracking-wide text-gray-700">
          Built with <b>Vite + Vue 3 + TypeScript + Tailwind + Cypress Starter Template</b>: Opinionated, production ready template for Vite and Vue 3. MIT licensed,
          <a href="https://github.com/Uninen/vite-ts-tailwind-starter">Docs on GitHub</a>.
        </p>
        <p>
          The current build contains DAISY UI & HeadlessUI. The plan is to migrate in vuetify and start component level migration using this file as the Kitchensink.
        </p>
      </header>
      <main>
        <div class="p-4 mx-auto prose md:px-6 prose-indigo sm:rounded-md">
          <HelloWorld msg="Hello World Component" />
        </div>
      </main>
      <footer class="py-6 text-sm text-center text-gray-700">
        <p>
          Holodex Test Kitchensink.
          <template v-if="BUILD_DATE"> Site built {{ BUILD_DATE.toLocaleDateString() }}. </template>
          <template v-else> Development mode. </template>
        </p>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
// useRoute, useHead, and HelloWorld are automatically imported. See vite.config.ts for details.
const route = useRoute()

useHead({
  bodyAttrs: {
    title: route.meta.title,
  },
  meta: [
    {
      property: 'og:title',
      content: route.meta.title,
    },
    {
      name: 'twitter:title',
      content: route.meta.title,
    },
  ],
})

const VERSION = import.meta.env.VITE_APP_VERSION
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined
// const thisYear = new Date().getFullYear()
</script>
