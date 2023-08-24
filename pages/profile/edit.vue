<script setup>
definePageMeta({
  middleware: ['auth'],
});

const user = useSupabaseUser();
</script>

<template>
  This is edit page
  <pre>{{ user }}</pre>
</template>
