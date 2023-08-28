<script setup>
    const props = defineProps({
        toggled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false
        },
        field: {
            type: Object,
            required: true
        }
    })

    const emits = defineEmits(['update:value', 'update:error']);

    const value = computed({
        get: () => props.field.input.value,
        set: new_value => emits('update:value', new_value)
    })

    const error = computed({
        get: () => props.field.input.error,
        set: new_value => emits('update:error', new_value)
    })
</script>

<template>
    <div>
        <b>{{ field.label }}{{ field.required && toggled ? ' *':'' }}</b>
        <div class="py-2">
            <FormInput 
                v-if="toggled && field.input.type === 'input'" 
                v-model:value="value" 
                v-model:error="error"
                :disabled="loading"
                />
            <FormSelect 
                v-else-if="toggled && field.input.type === 'select'" 
                :list="field.input.options" 
                v-model:value="value"
                v-model:error="error" 
                :disabled="loading"
                />
            <span v-else>{{ field.value }}</span>
        </div>
    </div>
</template>