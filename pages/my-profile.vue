<script setup>
    import BasicInfo from '~/components/Profile/BasicInfo.vue'
    import AdditionalDetails from '~/components/Profile/AdditionalDetails.vue'
    import SpouseDetails from '~/components/Profile/SpouseDetails.vue';
    import PersonalPreferences from '~/components/Profile/PersonalPreferences.vue';

    useHead({
        title: 'My Profile'
    })

    const loading = ref(false);

    const toggleMode = ref(false)

    const tabsList = ref([
        { active: true, show: true, label: 'Basic Details' },
        { active: false, show: true, label: 'Additional Details' },
        { active: false, show: true, label: 'Spouse Details' },
        { active: false, show: true, label: 'Personal Preferences' },
    ])

    const tabs = computed(() => tabsList.value.filter(tab => tab.show))

    const tab = computed(() => tabsList.value.findIndex(tab => tab.active))

    const onTabClick = e => {
        const { index } =  e.target.dataset;
        const current_active = tabs.value.find(tab => tab.active);

        current_active.active = false;
        tabs.value[index].active = true
    }

    const toggleModeChange = _ => toggleMode.value = !toggleMode.value;
</script>

<template>
    <div class="lg:grid lg:grid-cols-[auto_1fr_auto] gap-x-8 lg:gap-x-20 gap-y-6">

        <div class="lg:col-start-2 flex justify-between items-center">
            <h1 >My <b>Profile</b></h1>
            <button v-if="toggleMode" class="btn" @click="toggleModeChange" :disabled="loading">Cancel</button>
            <button v-else            class="btn" @click="toggleModeChange" :disabled="loading">Edit</button>
        </div>

        <div class="tabs profile-sidemenu">
            <div 
                v-for="(tab, index) in tabs"
                class="tab tab-bordered" 
                :class="{ 'tab-active': tab.active }" 
                :data-index="index" 
                @click="onTabClick">
                {{ tab.label }}
            </div> 
        </div>

        <div class="py-8 lg:py-0">
            <component :is="tab === 0 ? BasicInfo 
                            : tab === 1 ? AdditionalDetails
                            : tab === 2 ? SpouseDetails
                            : PersonalPreferences" 
                            v-model:toggleMode="toggleMode"
                            v-model:loading="loading"/>
        </div>
    </div>

    
</template>