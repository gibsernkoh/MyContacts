<script setup>
const client = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function signIn() {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    router.push('/profile');
  } catch (error) {
    errorMsg.value = error.message;
  }
}
</script>

<template>
  <input v-model="email" type="email" placeholder="Email" />
  <input v-model="password" type="password" placeholder="Password" />
  <button class="btn" @click="signIn">Login</button>
  <NuxtLink to="/register">Register</NuxtLink>

  <p v-if="errorMsg" class="text-red">{{ errorMsg }}</p>
</template>
