<script setup>
    import { getCompletePath } from '~/utils'

    const props = defineProps({
        thumbnail: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['update:thumbnail'])

    const client = useSupabaseClient();

    const uploading = ref(false)
    const src = ref(props.thumbnail ? getCompletePath(props.thumbnail) : '')
    const files = ref()

    const uploadAvatar = async (evt) => {
        files.value = evt.target.files

        try {
            uploading.value = true

            if (!files.value || files.value.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = files.value[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${Math.random()}.${fileExt}`

            const { data, error: uploadError } = await client.storage.from('Profile').upload(filePath, file)

            if (uploadError)
                throw uploadError

            src.value = getCompletePath(data.path)

            emit('update:thumbnail', data.path)
        } catch (error) {
            alert(error.message)
        } finally {
            uploading.value = false
        }
    }
</script>
<template>
    <label class="w-full bg-white aspect-square block relative" :class="{ 'cursor-pointer': !disabled }">
        <img v-if="src" :src="src" class="w-full h-full object-cover" />
        <span v-if="uploading" class="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        <input
            class="hidden"
            type="file"
            id="single"
            accept="image/*"
            :disabled="uploading || disabled"
            @change="uploadAvatar"
        />
    </label>
</template>