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

    const { phone, user_metadata } = user.value

    const init = {
        phone: {
            label: 'Mobile Number',
            value: phone ?? '-',
            input: {
                type: 'input',
                value: phone,
                error: '',
            }
        },
        address: {
            label: 'Home Address',
            value: user_metadata?.address ?? '-',
            input: {
                type: 'input',
                value: user_metadata?.address,
                error: ''
            }
        },
        postcode: {
            label: 'Postal Code',
            value: user_metadata?.postcode ?? '-',
            input: {
                type: 'input',
                value: user_metadata?.postcode,
                error: ''
            }
        },
        dob: {
            label: 'Date of Birth',
            value: user_metadata?.dob ?? '-',
            input: {
                type: 'input',
                value: user_metadata?.dob,
                error: ''
            }
        },
        gender: {
            label: 'Gender',
            value: user_metadata?.gender ?? '-',
            input: {
                type: 'select',
                value: user_metadata?.gender,
                options: ['Male', 'Female'],
                error: ''
            }
        },
        marital_status: {
            label: 'Gender',
            value: user_metadata?.marital_status ?? '-',
            input: {
                type: 'select',
                value: user_metadata?.marital_status,
                options: ['Single', 'Married'],
                error: ''
            }
        },
    }
</script>

<template>
    Additional Details
</template>