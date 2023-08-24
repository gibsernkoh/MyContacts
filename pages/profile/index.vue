<script setup>
definePageMeta({
  middleware: ['auth'],
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

async function logout() {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;

    router.push('/login');
  } catch (error) {
    console.log(error.message);
  }
}
</script>

<template>
  This is ur profile <NuxtLink to="/profile/edit">Edit Profile</NuxtLink>

  <pre>
  {{ user }}
  </pre>

  <button @click="logout">Logout</button>
</template>
