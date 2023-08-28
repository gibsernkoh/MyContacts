<template>
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn m-1 h-auto"><slot name="button"></slot></label>
        <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-slate-700 w-52 py-3 px-4 rounded-sm">
            <slot></slot>
        </div>
    </div>
</template>