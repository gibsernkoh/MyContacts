<script setup>
const client = useSupabaseClient();

const salutation = ref('mr');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const passwordCfm = ref('');

const errorMsg = ref('');
const successMsg = ref('');

async function signUp() {
  try {
    if (passwordCfm.value !== password.value)
      throw new Error("Password and Comfirm password does not match");

    const { error } = await client.auth.signUp({
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

  <WidgetsUserForm 
    v-model:salutation="salutation" 
    v-model:firstname="firstname"
    v-model:lastname="lastname"
    v-model:email="email"
    />
  <input v-model="password" type="password" placeholder="Password" />
  <input v-model="passwordCfm" type="password" placeholder="Confirm Password" />

  <button type="button" class="btn" @click="signUp">Sign Up</button>
  <NuxtLink to="/login">Go to Login</NuxtLink>

  <p v-if="errorMsg" class="text-red">{{ errorMsg }}</p>
  <p v-if="successMsg" class="text-green">{{ successMsg }}</p>
</template>
