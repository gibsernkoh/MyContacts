<script setup>
    import { useSystemStore } from '@/store'
    import { storeToRefs } from 'pinia'

    const system = useSystemStore();
    const { alerts } = storeToRefs(system);

    const alertsRef = ref([])

    const getAlertType = type => type === 'success' ? 'alert-success' : type === 'warning' ? 'alert-warning' : type === 'error' ? 'alert-error' : 'alert-info'

    const trackTimeout = {};

    watch(alerts, newAlerts => {
        if(!newAlerts.length)
            return

        const { key } = newAlerts[newAlerts.length - 1];

        if (trackTimeout.hasOwnProperty(key))
            return

        setTimeout(() => {
            const el = alertsRef.value.find(el => el.dataset.key === key);

            if (!el) 
                return // Stop if cannot find element

            el.classList.add('opacity-0')
            el.style.marginTop = `-${el.offsetHeight}px`;

            setTimeout(() => {
                system.pop(key)
            }, 200) // Tailwind default duration
        }, 3000)
    }, { deep: true })
</script>

<template>
    <div class="toast toast-top toast-right">
        <div v-for="alert in alerts" ref="alertsRef" :data-key="alert.key" class="alert text-white text-sm py-2 rounded-md transition-all mt-0" :class="getAlertType(alert.type)">
            <span>{{ alert.message }}</span>
        </div>
    </div>
</template>