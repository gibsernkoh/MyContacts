<script setup>
  import { useSystemStore } from '~/store';
  import { storeToRefs } from 'pinia';

  const system = useSystemStore();
  const { windowWidth } = storeToRefs(system);

  const setWindowWidth = () => windowWidth.value = window.innerWidth;

  onMounted(() => {
    addEventListener('resize', setWindowWidth)

    setWindowWidth()
  })

  onUnmounted(() => {
    removeEventListener('resize', setWindowWidth)
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>