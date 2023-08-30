<script setup>
import { useSystemStore } from '@/store';
import { UserIcon } from '@heroicons/vue/24/solid';
import { getCompletePath } from '~/utils';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const system = useSystemStore();
const router = useRouter();

const avatar_url = computed(() =>
  getCompletePath(user.value?.user_metadata?.thumbnail)
);

const onLogout = async (_) => {
  const { error } = await supabase.auth.signOut();

  if (error)
    system.push({
      type: 'error',
      message: error.message,
    });
  else {
    router.push('/');
    system.push({
      type: 'info',
      message: 'You have logged out',
    });
  }
};

const handleClick = () => {
  const elem = document.activeElement;

  if (elem) elem?.blur();
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="py-3 container mb-7 flex justify-between items-center">
      <NuxtLink to="/">
        <UILogo />
      </NuxtLink>

      <div v-if="user" class="flex gap-4">
        <UIDropDownDialog
          class="
            [&>.btn]:bg-transparent
            [&>.btn]:border-0
            [&>.btn]:w-auto
            [&>.btn]:p-0
            [&>.dropdown-content]:p-0
          "
        >
          <template #button>
            <div class="avatar placeholder">
              <div
                class="
                  bg-neutral-focus
                  text-neutral-content
                  rounded-full
                  w-11
                  overflow-hidden
                  outline
                  outline-2
                  outline-solid
                  outline-slate-700
                  outline-offset-[5px]
                "
              >
                <img
                  v-if="avatar_url"
                  :src="avatar_url"
                  class="w-full h-full object-cover"
                />
                <UserIcon v-else class="w-[1.2rem]" />
              </div>
            </div>
          </template>
          <div
            class="
              header-menu
              cursor-pointer
              flex flex-col
              [&>*]:py-3 [&>*]:px-4
              drop-shadow-lg
            "
          >
            <NuxtLink to="/my-contacts" @mouseup="handleClick"
              >My Contacts</NuxtLink
            >
            <NuxtLink to="/my-profile" @mouseup="handleClick"
              >My Profile</NuxtLink
            >
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
