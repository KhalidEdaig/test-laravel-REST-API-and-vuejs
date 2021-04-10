<template>
  <transition
    enter-active-class="transform ease-out duration-500 transition"
    leave-active-class="transition ease-in duration-500"
    enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2 scale-70"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-70"
  >
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: "AppTransition",
};
</script>
