import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  target: "static",
  devtools: { enabled: true },
  css: ["~/assets/css/app.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    "/": { prerender: true },
  },
});
