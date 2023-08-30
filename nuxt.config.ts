// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/supabase'],
  css: ['@/assets/css/main.css'],
  supabase: {
    redirect: false,
    url: 'https://sgqgqjcpmritrfrbeoum.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncWdxamNwbXJpdHJmcmJlb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NDg1MzgsImV4cCI6MjAwODQyNDUzOH0.d_kPqdRKU6met-TF1oUalcgCHJ2Quz3od3gDUBQTKHs',
    cookieOptions: {
      maxAge: 86400, // 1 Day
      // maxAge: 86400 * 365  // 1 Year
    },
  },
  runtimeConfig: {
    public: {
      supabase_profile_folder: '/storage/v1/object/public/Profile/',
    },
  },
});
