<script setup>
    import { useSystemStore } from '@/store'
    import { storeToRefs } from 'pinia'

    const system = useSystemStore();
    const { alerts } = storeToRefs(system);

    const alertsRef = ref([])

    const getAlertType = type => type === 'success' ? 'alert-success' : type === 'warning' ? 'alert-warning' : type === 'error' ? 'alert-error' : 'alert-info'

    const trackTimeout = {};

    const playFadeOut = key => {
        const el = alertsRef.value.find(el => el.dataset.key === key);

        if (!el) 
            return // Stop if cannot find element

        el.classList.add('opacity-0')
        el.style.marginTop = `-${el.offsetHeight}px`;

        setTimeout(() => {
            system.pop(key)

            if(trackTimeout[key])
                delete trackTimeout[key]
        }, 200) // Tailwind default duration
    }
    
    const dismissToast = e => {
        const { key } = e.target.dataset;
        
        clearTimeout(trackTimeout[key]);
        delete(trackTimeout[key])

        playFadeOut(key);
    }

    watch(alerts, newAlerts => {
        if(!newAlerts.length)
            return

        const { key } = newAlerts[newAlerts.length - 1];

        if (trackTimeout.hasOwnProperty(key))
            return

        trackTimeout[key] = setTimeout(() => playFadeOut(key), 3000)
    }, { deep: true })
</script>

<template>
    <div class="toast toast-top toast-right">
        <div 
            v-for="alert in alerts" 
            ref="alertsRef" 
            :data-key="alert.key" 
            class="alert text-white text-sm py-2 rounded-md transition-all mt-0 cursor-pointer" 
            :class="getAlertType(alert.type)"
            @click="dismissToast">
            <span>{{ alert.message }}</span>
        </div>
    </div>
</template>