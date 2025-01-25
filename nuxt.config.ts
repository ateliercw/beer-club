// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en-DK",
      },
    },
  },
  ssr: true,
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxtjs/html-validator",
    "@vueuse/nuxt",
  ],
  googleFonts: {
    preload: true,
    families: {
      Bitter: "100..900",
      Inter: "100..900",
    },
  },
});