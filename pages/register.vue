<script setup>
const client = useSupabaseClient();

const salutation = ref('mr');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const errorMsg = ref('');
const successMsg = ref('');

async function signUp() {
  try {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          firstname: firstname.value,
          lastname: lastname.value,
          salutation: salutation.value,
        },
      },
    });

    if (error) throw error;

    successMsg.value = 'Your account is now created.';
  } catch (error) {
    errorMsg.value = error.message;
  }
}
</script>

<template>
  <pre>{{ salutation }}</pre>
  <WidgetsUserForm v-bind="{ salutation, firstname, lastname, email }" />
  <input v-model="password" type="password" placeholder="Password" />

  <button type="button" class="btn" @click="signUp">Sign Up</button>
  <NuxtLink to="/login">Go to Login</NuxtLink>

  <p v-if="errorMsg" class="text-red">{{ errorMsg }}</p>
  <p v-if="successMsg" class="text-green">{{ successMsg }}</p>
</template>
