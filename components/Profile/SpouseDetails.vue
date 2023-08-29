<script setup>
import { useSystemStore } from '~/store';

import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  toggleMode: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const toggleModeRef = toRef(props.toggleMode);

const emits = defineEmits(['update:toggleMode', 'update:loading']);

const system = useSystemStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

const { user_metadata } = user.value;

const spouses = ref(user_metadata?.spouses ?? []);

const spouse_index = ref(null)

const fields = ref({
        salutation: {
            label: 'Salutation',
            required: true,
            value: '',
            input: {
              value: 'Mr.',
              error: null,
              type: 'select',
              options: ['Mr.', 'Ms.'],
            }
        },
        firstname: {
            label: 'First Name',
            required: true,
            value: '',
            input: {
              value: '',
              error: null
            }
        },
        lastname: {
            label: 'Last Name',
            required: true,
            value: '',
            input: {
              value: '',
              error: null
            }
        },
    });

const handleSaveSpouses = async _ => {
    const { error } = await client.auth.updateUser({
        data: { spouses: spouses.value }
    })

    if (error) {
        system.push({
            type: 'error',
            message: error.message
        })
    } else {
        
        spouse_index.value = null

        system.push({
            type: 'success',
            message: 'Profile Updated'
        })

        emits('update:toggleMode', false)
    }
}

const onSave = async _ => {
        emits('update:loading', true)

        // Validation
        const keys = Object.keys(fields.value)

        let hasError = false;

        const data = {};

        keys.forEach(key => {
            if(fields.value[key].input.value.trim() === '' && fields.value[key].required) {
                fields.value[key].input.error = `${fields.value[key].label} is required`;
                hasError = true;
            }
        })

        if (!hasError) {
            const fieldsRef = fields.value;
            const spousesRef = spouses.value;

            if (spouse_index.value !== null) {

              // Update
              keys.forEach(key => {
                const new_value = fieldsRef[key].input.value;
                spousesRef[spouse_index.value][key] = new_value;
              })
            } else {
              // Add
              spousesRef.push({
                salutation: fieldsRef.salutation.input.value,
                firstname: fieldsRef.firstname.input.value,
                lastname: fieldsRef.lastname.input.value,
              })
            }
            
            await handleSaveSpouses();
        }

        emits('update:loading', false)

    }

const editSpouse = async e => {
  const { index } = e.target.dataset;

  spouse_index.value = index;

  emits('update:toggleMode', true)
}

const deleteSpouse = async e => {
  const { index } = e.target.dataset;

  spouses.value.splice(index, 1);

  await handleSaveSpouses();
}

const onCancel = _ => {
    spouse_index.value = null

    emits('update:loading', false)
    emits('update:toggleMode', false)
}

watch(_ => props.toggleMode, toggleMode => {
  if (!toggleMode)
    onCancel()
})

watch(spouse_index, spouse_index => {

  const spouse = spouses.value[spouse_index];

  fields.value.salutation.input.value = spouse?.salutation ?? 'Mr.'
  fields.value.firstname.input.value = spouse?.firstname
  fields.value.lastname.input.value = spouse?.lastname
})
</script>

<template>
  <div class="overflow-x-auto" v-if="!toggleMode">
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
          <th width="1">{{ 1 + index }}</th>
          <td>{{ spouse.salutation }}</td>
          <td>{{ spouse.firstname }}</td>
          <td>{{ spouse.lastname }}</td>
          <td width="1">
            <!-- CTA -->
            <div class="btn-group">
              <button class="btn tooltip" data-tip="Edit" :data-index="index" @click="editSpouse">
                <PencilSquareIcon class="w-[1.2em]" />
              </button>
              <button class="btn tooltip" data-tip="Delete" :data-index="index" @click="deleteSpouse">
                <TrashIcon class="w-[1.2em]" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="!spouses.length">
          <td colspan="4" class="text-center">No Record</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <div class="profile-detail-panel">
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
        <button class="btn w-[125px]" @click="onSave"   :disabled="loading">Save</button>
        <button class="btn btn-neutral w-[125px]" @click="onCancel" :disabled="loading">Cancel</button>
      </div>
    </div>
  </div>
</template>
