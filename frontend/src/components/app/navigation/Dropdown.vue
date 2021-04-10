<template>
  <div class="dropdown inline-block relative w-full">
    <button
      @click="toggleDropDown"
      class="font-semibold  rounded flex justify-between items-center focus:outline-none w-full"
    >
      <div class="inline-flex">
        <Icon :name="item.icongroup" :className="'mr-3 w-6 h-6'" />
        <span class="mr-2">{{ item.namegroup }}</span>
      </div>
      <div class="px-2">
        <Icon v-if="!isOpen" :name="'plus'" :className="'w-4 h-4 text-right'" />
        <Icon v-if="isOpen" :name="'minis'" :className="'w-4 h-4 text-right'" />
      </div>
    </button>
    <app-transition>
      <ul v-if="isOpen" class="dropdown-menu text-gray-700 pt-1 w-full">
        <li class v-for="(item, index) in item.submenu" :key="index">
          <router-link
            :to="{ name: item.route }"
            :class="[
              currentRoute === item.route ? activeClass : '',
              'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900  bg-indigo-50 hover:bg-indigo-100 focus:outline-none transition ease-in-out duration-150',
            ]"
          >
            <Icon
              v-if="isOpen"
              :name="item.icon"
              :className="
                'mr-3 w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-900 text-center'
              "
            />
            {{ item.name }}
            <span
              v-if="item.hasBadge"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
            >
              {{ item.badgeContent }}
            </span>
          </router-link>
        </li>
      </ul>
    </app-transition>
  </div>
</template>
<script>
import navigationMixin from "@/mixins/navigationMixin";
import AppTransition from "@/components/app/global/AppTransition.vue";
export default {
  props: {
    item: [String, Object, Array],
  },
  mixins: [navigationMixin],
  components: {
    AppTransition,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      //this.$emit("change", this.isOpen);
    },
    closeDropDown() {
      this.isOpen = false;
      //this.$emit("change", false);
    },
  },
};
</script>
