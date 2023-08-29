<script setup>
import { useSystemStore } from '~/store'

const system = useSystemStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

const { user_metadata } = user.value;

const hobbies = ref(user_metadata?.hobbies ?? [])
const sports = ref(user_metadata?.sports ?? [])
const musics = ref(user_metadata?.musics ?? [])
const shows = ref(user_metadata?.shows ?? [])

watch([hobbies, sports, musics, shows], async ([hobbies, sports, musics, shows]) => {
    await client.auth.updateUser({
        data: {
            hobbies, sports, musics, shows
        }
    })
})
</script>

<template>
    <div class="grid sm:grid-cols-2 gap-6">
        <FormBadgeList 
            title="Hobbies and Intrests"
            v-model:list="hobbies"/>

        <FormBadgeList 
            title="Favorite sport(s)" 
            v-model:list="sports"/>

        <FormBadgeList 
            title="Preferred music genre(s)" 
            v-model:list="musics"/>

        <FormBadgeList 
            title="Preferred movie/TV show(s)" 
            v-model:list="shows"/>
    </div>
</template>