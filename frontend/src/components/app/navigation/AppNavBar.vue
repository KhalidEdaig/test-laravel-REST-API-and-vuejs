<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    enter-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <nav class="flex-1 px-2 bg-white">
      <router-link
        v-for="(item, index) in filteredMenu"
        :key="index"
        :to="{ name: item.route }"
        :class="[
          currentRoute === item.route ? activeClass : '',
          !item.submenu ? 'hover:bg-gray-100' : '',
          'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900  focus:outline-none transition ease-in-out duration-150',
        ]"
      >
        <Icon :name="item.icon" :className="'mr-3 w-6 h-6'" />
        {{ item.name }}
        <span
          v-if="item.hasBadge"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
        >
          {{ item.badgeContent }}
        </span>

        <Dropdown :item="item" v-if="item.submenu" />
      </router-link>
    </nav>
  </transition>
</template>

<script>
import Dropdown from "@/components/app/navigation/Dropdown.vue";
import navigationMixin from "@/mixins/navigationMixin";
export default {
  name: "AppNavBar",
  components: {
    Dropdown,
  },
  mixins: [navigationMixin],
};
</script>

<style></style>
