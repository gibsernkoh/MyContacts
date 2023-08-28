// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt',
    '@nuxtjs/supabase'],
  css: ['@/assets/css/main.css'],
  supabase: {
    redirect: false,
    cookieOptions: {
      maxAge: 86400 // 1 Day
      // maxAge: 86400 * 365  // 1 Year
    }
  },
  runtimeConfig: {
    public: {
      supabase_profile_folder: '/storage/v1/object/public/Profile/'
    }
  }
});
