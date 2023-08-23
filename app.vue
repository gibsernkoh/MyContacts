<template>
  <div>
    <button class="btn">Testing</button>
  </div>
  <pre>
    Users:
    {{ users }}
  </pre>
</template>

<script setup>
const supabase = useSupabaseClient();

const users = ref([]);

async function getUsers() {
  //const res = await supabase.from('users').select();

  console.log('_gib', res);

  //users.value = res.data;
}

onMounted(() => {
  console.log('_gib: mounted');
  getUsers();
});
</script>
