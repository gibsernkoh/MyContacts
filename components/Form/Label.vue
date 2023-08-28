<script setup>
    const props = defineProps({
        for: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: null
        }
    })

    const _for = computed(_ => props.for)
</script>

<template>
    <label :for="_for">
        <slot></slot>{{ required ? '*': '' }}
    </label>
</template>