// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  supabase: {
    url: 'https://sgqgqjcpmritrfrbeoum.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncWdxamNwbXJpdHJmcmJlb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NDg1MzgsImV4cCI6MjAwODQyNDUzOH0.d_kPqdRKU6met-TF1oUalcgCHJ2Quz3od3gDUBQTKHs',
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/register'],
    },
  },
  css: ['@/assets/css/main.css'],
});
