<template>
  <nav class="px-2">
    <router-link
      v-for="(item, index) in filteredMenu"
      :key="index"
      :to="{ name: item.route }"
      :class="[
        currentRoute === item.route ? activeClass : '',
        'mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150',
      ]"
    >
      <!-- <component :is="item.icon"></component> -->
      <Icon :name="item.icon" :className="'mr-3 w-6 h-6'" />
      {{ item.name }}
      <span
        v-if="item.hasBadge"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
      >
        {{ item.badgeContent }}
      </span>
      <div v-if="item.submenu" class="flex items-center">
        <Dropdown :item="item" />
      </div>
    </router-link>
  </nav>
</template>

<script>
import navigationMixin from "@/mixins/navigationMixin";
import Dropdown from "@/components/app/navigation/Dropdown.vue";
export default {
  name: "AppNavBarMobile",
  components: {
    Dropdown,
  },
  mixins: [navigationMixin],
};
</script>

<style></style>
