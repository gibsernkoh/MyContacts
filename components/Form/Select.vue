<script setup>
    const props = defineProps({
        id: {
            type: String,
            default: null
        },
        value: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: null
        },
        list: {
            type: Array,
            default: []
        }
    })

    const emits = defineEmits(['update:value', 'update:error'])

    const onChange = e => {
        emits('update:value', e.target.value);
        emits('update:error', '');
    }
</script>

<template>
    <select :id="id" :value="value" @change="onChange" :disabled="disabled" class="h-[2.5rem] px-3 w-full bg-[field] capitalize">
        <option v-for="item in list" :value="item">{{ item }}</option>
    </select>
    <p v-if="error" class="text-error">{{ error }}</p>
</template>