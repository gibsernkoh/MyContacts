<script setup>
    import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

    const props = defineProps({
        current_page: {
            type: Number,
            required: true
        },
        max_page: {
            type: Number,
            required: true
        }
    })

    const max_page_count = 5

    const update_event = 'update:current_page'

    const emits = defineEmits([update_event])

    const onPrevPage = () => emits(update_event, +props.current_page - 1)
    const onNextPage = () => emits(update_event, +props.current_page + 1)
    const onPageSelect = page => emits(update_event, +page)

    const getBtnClass = page => {
        const classes = [];

        '-' === page && classes.push('btn-disabled')
        
        props.current_page === page && classes.push('btn-active')

        return classes.join(' ')
    }

    const pages = computed(() => {
        const max = props.max_page

        if(max <= max_page_count) {
            return max;
        }
        else {
            const pagination = [];
            const curr = +props.current_page
            const window_size = 3;
            const limit = max - 2;

            if(curr < window_size) {
                pagination.push(1)
                pagination.push(2)
                pagination.push(3)
            } else if(curr + 1 < limit) {
                pagination.push(curr - 1)
                pagination.push(curr)
                pagination.push(curr + 1)
            } else {
                for (let i = limit - 1; i >= limit - window_size; i--) {
                    pagination.unshift(i)
                }
            }

            if (curr + 2 < limit) {
                pagination.push('-');
            } else {
                pagination.push(limit)
            }
           
            return pagination.concat(max - 1, max)
        } 
    })
</script>

<template>
    <ClientOnly>
        <div class="join">
            <button class="join-item btn btn-sm" :class="current_page === 1 ? 'btn-disabled' : ''" @click="onPrevPage">
                <ChevronLeftIcon class="aspect-square w-[1.1em]" />
            </button>
            
            <button 
                v-for="page in pages" 
                class="join-item btn btn-sm" 
                :class="getBtnClass(page)"
                @click="onPageSelect(+page)">
                {{ page }}
            </button>
            
            <button class="join-item btn btn-sm" :class="current_page === max_page ? 'btn-disabled' : ''" @click="onNextPage">
                <ChevronRightIcon class="aspect-square w-[1.1em]"/>
            </button>
        </div>
    </ClientOnly>
</template>