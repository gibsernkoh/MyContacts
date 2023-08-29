<script setup>
    import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline'

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            required: true
        }
    })

    const add = ref('')

    const emits = defineEmits(['update:list'])

    const onRemove = e => {
        const { index } = e.target;
        const nList = [...props.list];
        nList.splice(index, 1)
        emits('update:list', nList);
    }

    const onAdd = _ => {
        if (!add.value.trim())
            return;

        const nList = [...props.list, add.value.trim()]

        emits('update:list', [...new Set(nList)]);
        add.value = ''
    }
</script>
<template>
    <div class="bg-slate-800 rounded-md p-4 flex flex-col gap-6">
        <h2>{{ title }}</h2>
        
        <div class="flex flex-wrap gap-3">
            <div v-for="(item, index) in list" class="badge badge-lg py-4 px-3 flex gap-3">
                <span>{{ item }}</span>
                <MinusCircleIcon class="w-[1.3rem] cursor-pointer" :data-index="index" @click="onRemove" />
            </div>
            <div class="badge badge-lg py-4 px-3 flex gap-3 relative overflow-hidden">
                <input type="text" class="ps-3 absolute top-0 left-0 w-[calc(100%-1.9rem)] h-full bg-transparent focus:outline-none" v-model="add" @keyup.enter="onAdd" />
                <span :class="{ 'text-slate-700': !add }">{{ add ? add : 'Add' }}</span>
                <PlusCircleIcon class="w-[1.3rem] cursor-pointer" data-index="1" @click="onAdd" />
            </div>
        </div>
    </div>
</template>