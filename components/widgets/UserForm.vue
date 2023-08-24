<script setup>
defineProps({
  salutation: {
    type: String,
    default: 'mr',
    validation: (value) => ['mr', 'ms'].includes(value),
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const emits = defineEmits([
  'update:salutation',
  'update:firstname',
  'update:lastname',
  'update:email',
]);

const onChange = {
  salutation: (value) => emits('update:salutation', value),
  firstname: (value) => emits('update:firstname', value),
  lastname: (value) => emits('update:lastname', value),
  email: (value) => emits('update:email', value),
};
</script>

<template>
  <select :value="salutation" @input="onChange.salutation">
    <option value="mr">Mr.</option>
    <option value="ms">Ms.</option>
  </select>

  <input
    value="firstname"
    placeholder="First name"
    @input="onChange.firstname"
  />
  <input value="lastname" placeholder="Last name" @input="onChange.lastname" />

  <input
    value="email"
    type="email"
    placeholder="Email"
    @input="onChange.email"
  />
</template>
