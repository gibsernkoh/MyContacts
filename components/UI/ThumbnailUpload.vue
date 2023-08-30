<script setup>
import { getCompletePath } from '~/utils';
import { useSystemStore } from '~/store';

const props = defineProps({
  thumbnail: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:thumbnail']);

const client = useSupabaseClient();
const system = useSystemStore();

const uploading = ref(false);
const src = ref(props.thumbnail ? getCompletePath(props.thumbnail) : '');
const files = ref();

const uploadAvatar = async (evt) => {
  files.value = evt.target.files;

  try {
    uploading.value = true;

    if (!files.value || files.value.length === 0) {
      return;
    }

    const file = files.value[0];
    const maxSize = 1024 * 1024; // 1MB

    const extension = file.type.split('/').pop();

    if (file.size > maxSize)
      throw new Error('The image selected is more than 1MB 😅');
    else if (!['jpg', 'jpeg', 'png'].includes(extension))
      throw new Error('Please update your image in .jpg, .jpeg or .png');

    const fileExt = file.name.split('.').pop();
    const filePath = `${Math.random()}.${fileExt}`;

    const { data, error: uploadError } = await client.storage
      .from('Profile')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    src.value = getCompletePath(data.path);

    emit('update:thumbnail', data.path);
  } catch (error) {
    system.push({
      type: 'error',
      message: error.message,
    });
  } finally {
    uploading.value = false;
  }
};
</script>
<template>
  <label
    class="w-full bg-white aspect-square block relative"
    :class="{ 'cursor-pointer': !disabled }"
  >
    <img v-if="src" :src="src" class="w-full h-full object-cover" />
    <span
      v-if="uploading"
      class="
        loading loading-bars loading-lg
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
      "
    ></span>
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
