<script setup>
import { useSystemStore } from '@/store';
import { getName, getAddress } from '@/utils';
import { storeToRefs } from 'pinia';

import DropDownDialog from '~/components/UI/DropDownDialog.vue'
import { FunnelIcon } from '@heroicons/vue/24/solid'

useHead({ title: 'My Contacts' })

const system = useSystemStore();
const { isXS } = storeToRefs(system)

const contacts = ref([]);
const current_page = ref(1);

const genderFilters = computed(() => ['female', 'male'].filter(gender => contacts.value.map(c => c.gender).includes(gender)))
const countryFilters = computed(() => [...new Set(contacts.value.map(c => c.location.country.toCapitalize()))].sort())

const genderFilter = ref('all');
const countryFilter = ref('all');

const per_page = ref(isXS.value ? 8 : 9);

const filtered_contacts = computed(() => contacts.value.filter(c => {
        
    const genderMatch = genderFilter.value === 'all' || c.gender === genderFilter.value;
    const countryMatch = countryFilter.value === 'all' || c.location.country === countryFilter.value;

    return genderMatch && countryMatch
}))

const contacts_page = computed(() => {
    
    const start_index = (current_page.value - 1) * per_page.value

    const end_index = start_index + per_page.value;

    return filtered_contacts.value.slice(start_index, end_index);
})

const max_page = computed(() => Math.ceil(filtered_contacts.value.length/per_page.value))

try {
    const { data, error } = await useFetch(`https://randomuser.me/api/?results=100`)

    if (data.value?.results)
        contacts.value = data.value.results.map((d, i) => ({
                ...d, 
                formatted_name: getName(d.name), 
                formatted_address:  getAddress(d.location.street)
            }))
    else if(error.value)
        throw error.value;

} catch (error) {
    system.push({
        type: 'error',
        message: error.message
    });
}

watch(isXS, isXS => {
    if(isXS) per_page.value = 8
    else per_page.value = 9
})

watch([genderFilter, countryFilter], _ => current_page.value = 1)

</script>

<template>
    <ClientOnly>
        
        <div class="flex justify-between items-center leading-[2.8rem] mb-7">
            <h1>My <b>Contacts</b></h1>
            
            <component :is="isXS ? DropDownDialog : 'v-fragment'">
                <template #button>
                    <FunnelIcon class="aspect-square w-[1.25rem]" /> Filter
                </template>
                <div class="flex flex-col md:flex-row gap-3">
                    <select v-model="genderFilter" class="select select-info select-sm capitalize">
                        <option value="all">All Gender</option>
                        <option v-for="gender in genderFilters" :value="gender">{{ gender }}</option>
                    </select>

                    <select v-model="countryFilter" class="select select-info select-sm">
                        <option value="all">All Country</option>
                        <option v-for="country in countryFilters" :value="country">{{ country }}</option>
                    </select>
                </div>
            </component>
        </div>

        <div class="pb-7">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div v-for="contact in contacts_page" class="flex flex-col lg:flex-row items-start gap-4 bg-slate-800 border-b-2 border-slate-500 p-4">
                    <img :src="contact.picture.medium" :alt="contact.formatted_name" />
                    <div class="overflow-hidden text-sm max-w-full flex flex-col gap-1">
                        <h2 class="card-title pb-1">{{ contact.formatted_name }}</h2>
                        <a class="truncate block" :href="`mailto:${contact.email}`" :title="contact.email">{{ contact.email }}</a>
                        <a class="truncate" :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
                        <address class="pt-1">{{ contact.formatted_address }}</address>
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <UIPagination v-model:current_page="current_page" :max_page="max_page" />
            </div>
        </div>
    </ClientOnly>
</template>