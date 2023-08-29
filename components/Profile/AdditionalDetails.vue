<script setup>
import { useSystemStore } from '~/store';
import { getDate, getDiffBetweenToday } from '~/utils';
import Countries from '~/assets/js/countries';

defineProps({
  toggleMode: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:toggleMode', 'update:loading']);

const system = useSystemStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

const { user_metadata } = user.value;

const max_date = getDate(-17, 'year').toISOString().split('T')[0];

const init = {
  phone: {
    label: 'Mobile Number',
    required: true,
    value: user_metadata?.phone ?? '-',
    input: {
      type: 'input',
      value: user_metadata?.phone ?? '',
      value_type: 'text',
      error: null,
    },
  },
  address: {
    label: 'Home Address',
    required: true,
    value: user_metadata?.address ?? '-',
    input: {
      type: 'input',
      value: user_metadata?.address,
      value_type: 'text',
      error: null,
    },
  },
  country: {
    label: 'Country',
    required: true,
    value: user_metadata?.country ?? '-',
    input: {
      type: 'select',
      value: user_metadata?.country ?? '',
      options: Countries,
      error: null,
    },
  },
  postcode: {
    label: 'Postal Code',
    required: true,
    value: user_metadata?.postcode ?? '-',
    input: {
      type: 'input',
      value: user_metadata?.postcode,
      value_type: 'text',
      error: null,
    },
  },
  nationality: {
    label: 'Nationality',
    required: true,
    value: user_metadata?.nationality ?? '-',
    input: {
      type: 'select',
      value: user_metadata?.nationality ?? '',
      options: Countries,
      error: null,
    },
  },
  dob: {
    label: 'Date of Birth',
    value: user_metadata?.dob ?? '-',
    input: {
      type: 'input',
      value: user_metadata?.dob,
      value_type: 'date',
      max_date,
      error: null,
    },
  },
  gender: {
    label: 'Gender',
    value: user_metadata?.gender ?? '-',
    input: {
      type: 'select',
      value: user_metadata?.gender ?? 'Male',
      options: ['Male', 'Female'],
      error: null,
    },
  },
  marital_status: {
    label: 'Marital Status',
    value: user_metadata?.marital_status ?? '-',
    input: {
      type: 'select',
      value: user_metadata?.marital_status ?? 'Single',
      options: ['Single', 'Married'],
      error: null,
    },
  },
};

const fields = ref(structuredClone(init));

const onSave = async (_) => {
  emits('update:loading', true);

  // Validation
  const keys = Object.keys(fields.value);

  let hasError = false;

  keys.forEach((key) => {
    const input = fields.value[key].input;

    if (fields.value[key].required) {
      if (input.value.trim() === '') {
        input.error = `${fields.value[key].label} is required`;
      } else if (['phone', 'postcode'].includes(key) && !+input.value) {
        input.error = `${fields.value[key].label} is invalid`;
      }
    } else if ('dob' === key && getDiffBetweenToday(input.value, 'year') < 17) {
      input.error = `You will have to be at least, 17 years old`;
    }

    if (input.error)
      hasError = true
  });

  if (!hasError) {
    const data = {};

    for (const key in fields.value) {
      data[key] = fields.value[key].input.value;
    }

    const { error } = await client.auth.updateUser({ data });

    if (error) {
      system.push({
        type: 'error',
        message: error.message,
      });
    } else {
      keys.forEach((key) => {
        fields.value[key].value = fields.value[key].input.value;
        fields.value[key].input.error = '';
      });

      system.push({
        type: 'success',
        message: 'Profile Updated',
      });

      emits('update:toggleMode', false);
    }
  }

  emits('update:loading', false);
};

const onCancel = (_) => {
  emits('update:loading', false);
  emits('update:toggleMode', false);
};
</script>

<template>
  <div class="grid grid-cols-[1fr_1fr] gap-6">
    <div v-for="field in fields">
      <FormTextToInput
        :toggled="toggleMode"
        :loading="loading"
        :field="field"
        v-model:value="field.input.value"
        v-model:error="field.input.error"
      />
    </div>

    <div v-if="toggleMode" class="flex gap-6">
      <button class="btn w-[125px]" @click="onSave" :disabled="loading">
        Save
      </button>
      <button
        class="btn btn-neutral w-[125px]"
        @click="onCancel"
        :disabled="loading"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
