<script setup>
    import { useSystemStore } from '@/store';

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const system = useSystemStore();
    const router = useRouter();

    const onLogout = async _ => {
        const { error } = await supabase.auth.signOut();

        if (error)
            system.push({
                type: 'error',
                message: error.message
            })
        else router.push('/')
    }
</script>

<template>
    <div class="flex flex-col h-full">
        <div class="py-3 container mb-7 flex justify-between items-center">
            <NuxtLink to="/">
                <UILogo />
            </NuxtLink>

            <div v-if="user" class="flex gap-4">
                <UIDropDownDialog class="[&>.btn]:bg-transparent [&>.btn]:border-0 [&>.btn]:w-auto [&>.btn]:p-0 [&>.dropdown-content]:p-0">
                    <template #button>
                        <div class="avatar placeholder">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                                <span class="text-3xl">K</span>
                            </div>
                        </div> 
                    </template>
                    <div class="header-menu cursor-pointer flex flex-col [&>*]:py-3 [&>*]:px-4 drop-shadow-lg">
                        <NuxtLink to="/my-contacts">My Contacts</NuxtLink>
                        <NuxtLink to="/my-profile">My Profile</NuxtLink>
                        <div @click="onLogout" class="border-t-[1px] border-t-slate-500">
                            Logout
                        </div>
                    </div>
                </UIDropDownDialog>
            </div>
        </div>
        <div class="container">
            <slot></slot>
        </div>
        <ClientOnly>
            <WidgetsGlobalToast />
        </ClientOnly>
    </div>
  </template>