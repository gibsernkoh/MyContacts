<script setup>
    import { useSystemStore } from '~/store'

    defineProps({
        toggleMode: {
            type: Boolean,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    })

    const emits = defineEmits(['update:toggleMode', 'update:loading'])

    const system = useSystemStore();
    const client = useSupabaseClient();
    const user = useSupabaseUser() 

    const { email, user_metadata } = user.value

    const init = {
        salutation: {
            label: 'Salutation',
            required: true,
            value: user_metadata?.salutation ?? '-',
            input: {
                type: 'select',
                value: user_metadata?.salutation ?? 'Mr.',
                error: '',
                options: ['Mr.', 'Ms.'],
            }
        },
        firstname: {
            label: 'First Name',
            required: true,
            value: user_metadata?.firstname ?? '-',
            input: {
                type: 'input',
                value: user_metadata?.firstname,
                error: ''
            }
        },
        lastname: {
            label: 'Last Name',
            required: true,
            value: user_metadata?.lastname ?? '-',
            input: {
                type: 'input',
                value: user_metadata?.lastname,
                error: ''
            }
        },
        email: {
            label: 'Email Address',
            required: true,
            value: email,
            input: {
                type: 'input',
                value: email,
                error: ''
            }
        },
    }

    const thumbnail = ref(user_metadata?.thumbnail ?? '');

    const fields = ref(structuredClone(init));

    const hasError = computed(() => Object.values(fields.value).filter(field => field.input.error !== '').length !== 0)

    const onSave = async _ => {
        emits('update:loading', true)

        const {
            email,
            firstname,
            lastname,
            salutation
        } = fields.value;

        // Validation
        const keys = Object.keys(fields.value)

        keys.forEach(key => {
            if(fields.value[key].input.value.trim() === '' && fields.value[key].required)
                fields.value[key].input.error = `${fields.value[key].label} is required`;
        })

        if (!hasError.value) {
            const { error } = await client.auth.updateUser({
                email: email.input.value,
                data: {
                    firstname: firstname.input.value,
                    lastname: lastname.input.value,
                    salutation: salutation.input.value,
                    thumbnail: thumbnail.value
                }
            })

            if (error) {
                system.push({
                    type: 'error',
                    message: error.message
                })
            } else {
                
                keys.forEach(key => {
                    fields.value[key].value = fields.value[key].input.value
                    fields.value[key].input.error = '';
                })

                system.push({
                    type: 'success',
                    message: 'Profile Updated'
                })

                emits('update:toggleMode', false)
            }
        }

        emits('update:loading', false)

    }

    const onCancel = _ => {
        emits('update:loading', false)
        emits('update:toggleMode', false)
    }

</script>

<template>
    <div class="flex flex-col md:flex-row items-start gap-8 lg:gap-x-12">
        <div class="w-[200px]">
            <UIThumbnailUpload v-model:thumbnail="thumbnail" :disabled="!toggleMode || loading" />
            <div v-if="toggleMode" class="text-center pt-2">
                <h3 class="underline pb-1">Upload image</h3>
                <small class="leading-[0.5em]">(JPG or PNG format with maximum size of 1 MB)</small>
            </div>
        </div>
        <div class="flex flex-col gap-6">
            <div v-for="field in fields">
                <FormTextToInput 
                    :toggled="toggleMode" 
                    :loading="loading" 
                    :field="field" 
                    v-model:value="field.input.value"
                    v-model:error="field.input.error"/>
            </div>

            <div v-if="toggleMode" class="flex gap-6">
                <button class="btn w-[125px]" @click="onSave"   :disabled="loading">Save</button>
                <button class="btn btn-neutral w-[125px]" @click="onCancel" :disabled="loading">Cancel</button>
            </div>
        </div>
    </div>
</template>