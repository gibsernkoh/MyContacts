<script setup>
    import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

    const props = defineProps({
        show: {
            type: Boolean,
            default: false
        }
    })

    const emits = defineEmits(['update:show'])

    const onClick = () => emits('update:show', !props.show)
</script>
<template>
    <div class="text-[1em] p-2" @click="onClick">
        <EyeSlashIcon v-if="show" class="text-[1em]" />
        <EyeIcon v-else class="text-[1em]" />
    </div>
</template>