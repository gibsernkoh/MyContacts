<script setup>
const client = useSupabaseClient();

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

async function signUp() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;
    successMsg.value = 'Check your email to confirm your account.';
  } catch (error) {
    errorMsg.value = error.message;
  }
}
</script>

<template>
  <input v-model="email" type="email" placeholder="Email" />
  <input v-model="password" type="password" placeholder="Password" />

  <button type="button" class="btn" @click="signUp">Sign Up</button>
  <NuxtLink to="/login">Go to Login</NuxtLink>

  <p v-if="errorMsg" class="text-red">{{ errorMsg }}</p>
  <p v-if="successMsg" class="text-green">{{ successMsg }}</p>
</template>
