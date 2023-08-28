<script setup>
    const props = defineProps({
        checked: {
            type: Boolean,
            default: false,
        }
    })

    const emits = defineEmits(['update:value'])

    const onClicked = e => {
        emits('update:value', e.target.checked)
    }
</script>

<template>
    <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" class="checkbox checkbox-inherit" :checked="checked" @change="onClicked">
        <slot></slot>
    </label>
</template>