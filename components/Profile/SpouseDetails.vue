<script setup>
import { useSystemStore } from '~/store';

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

const spouses = ref([]);
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Salutation</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(spouse, index) in spouses" class="hover">
          <th>{{ 1 + index }}</th>
          <td>{{ spouse.salutation }}</td>
          <td>{{ spouse.firstname }}</td>
          <td>{{ spouse.lastname }}</td>
          <td>
            <!-- CTA -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
