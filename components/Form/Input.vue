<script setup>
import FormEye from '@/components/Form/Eye.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (type) =>
      ['text', 'number', 'tel', 'email', 'password'].includes(type),
  },
  id: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: null,
  },
  max: {
    type: String,
    default: null,
  },
});

const emits = defineEmits(['update:value', 'update:error']);

const onInput = (e) => {
  emits('update:value', e.target.value);
  emits('update:error', '');
};

const isPassword = computed(() => props.type === 'password');

const show = ref(false);
</script>

<template>
  <div class="bg-[field] flex">
    <input
      :id="id"
      :type="show ? 'text' : type"
      :value="value"
      @input="onInput"
      class="h-[2.5rem] px-3 w-full"
      :disabled="disabled"
      :max="max"
    />
    <FormEye
      v-if="isPassword"
      v-model:show="show"
      class="w-[2.5rem] shrink-0"
    />
  </div>
  <p v-if="error" class="text-error">{{ error }}</p>
</template>
