<script setup>
    import { useSystemStore } from '@/store'

    useHead({
        title: "Login"
    })

    const router = useRouter();
    const client = useSupabaseClient();
    const system = useSystemStore();

    const loading = ref(false)

    const payload = ref({
        email: 'gibsernkoh1@gmail.com',
        password: 'gibsernkoh',
        longSession: false,
    })

    const onLogin = async () => {

        loading.value = true

        const {
            email,
            password,
            longSession
        } = payload.value

        const { error } = await client.auth.signInWithPassword({ email, password });

        loading.value = false

        if (error)
            system.push({
                type: 'error',
                message: error.message
            })
        else {

            if (longSession) {
                await useFetch('/api/keep-session')
            }

            router.push('/my-contacts')

            system.push({
                type: 'success',
                message: 'Login Successful'
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
                <FormInput v-model:value="payload.email" />
                
                <FormLabel required>Password</FormLabel>
                <FormInput v-model:value="payload.password" type="password" />
                
                <div class="flex flex-col items-start gap-4 col-start-2 text-xs">
                    <FormCheckbox v-model:value="payload.longSession">
                        Keep Me Logged In
                    </FormCheckbox>
                </div>

            <div class="col-span-2 text-center">
                    <button class="btn block w-[140px] mx-auto mb-7" :disabled="loading" @click="onLogin">Login</button>

                    <small>No account? <NuxtLink to="register"><u>Register here.</u></NuxtLink></small>
                </div>
            </div>
        </div>
    </UIPanel>
    
</template>