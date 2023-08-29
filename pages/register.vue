<script setup>
import { useSystemStore } from '@/store'

const client = useSupabaseClient();
const system = useSystemStore();

const payload = ref({
  email: '',
  password: '',
})

const passwordCfm = ref('');

const loading = ref(false);

async function onRegister() {
  try {
    if (passwordCfm.value !== payload.value.password)
      throw new Error("Password and Comfirm password does not match");

    const { error } = await client.auth.signUp(payload.value);

    if (error) throw error;

    system.push({
        type: 'success',
        message: 'Your account is now created.'
    })

    payload.value.email = '';
    payload.value.password = '';
    passwordCfm.value = '';
    
  } catch (error) {
    if (error)
        system.push({
            type: 'error',
            message: error.message
        })
  }
}
</script>

<template>

  <UIPanel class="max-w-[400px]">
    
    <UIHeadline class="mb-8">
        Welcome To <b>MY CONTACTS</b>
    </UIHeadline>

        <div class="table w-[320px]">
            <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 items-center [&>label]:text-right [&>.text-error]:col-start-2 [&>.text-error]:-mt-3">
                <FormLabel required>E-mail</FormLabel>
                <FormInput v-model:value="payload.email" :disabled="loading" />
                
                <FormLabel required>Password</FormLabel>
                <FormInput v-model:value="payload.password" type="password" :disabled="loading" />

                <FormLabel required>Confirm<br/>Password</FormLabel>
                <FormInput v-model:value="passwordCfm" type="password" :disabled="loading" />

                <div class="col-span-2 text-center pt-3">
                    <button class="btn block w-[140px] mx-auto mb-7" :disabled="loading" @click="onRegister">Register</button>

                    <small>Already Registered? <NuxtLink to="/"><u>Login here.</u></NuxtLink></small>
                </div>
            </div>
        </div>
  </UIPanel>
</template>
