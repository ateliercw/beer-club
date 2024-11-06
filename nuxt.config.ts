// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxt/icon", "@nuxt/scripts"],
  googleFonts: {
    preload: true,
    families: {
      Bitter: "100..900",
      Inter: "100..900",
    },
  },
});
