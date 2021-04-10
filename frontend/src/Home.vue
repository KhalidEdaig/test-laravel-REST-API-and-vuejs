<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Off-canvas menu for mobile -->
    <div class="lg:hidden" :class="{ hidden: closeNavBar }">
      <div class="fixed inset-0 flex z-40">
        <div class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        <div
          class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
        >
          <div class="flex justify-between items-center">
            <div class="flex-shrink-0 flex items-center px-4">
              <span class="text-xl font-bold tracking-wide text-gray-900"
                >Test Laravel and Vue Js</span
              >
            </div>
            <div class="absolute top-0 right-0 -mr-14 p-1">
              <button
                @click="closeNavBar = !closeNavBar"
                class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                aria-label="Close sidebar"
              >
                <svg
                  class="h-6 w-6 text-gray-800"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <app-nav-bar-mobile></app-nav-bar-mobile>
          </div>
        </div>
        <div class="flex-shrink-0 w-14">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </div>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div
        class="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white"
      >
        <div class="flex items-center flex-shrink-0 px-4">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/v1/workflow-logo-on-white.svg"
            alt="Workflow"
          />
        </div>
        <div class="mt-5 h-0 flex-1 flex flex-col overflow-y-auto">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <app-nav-bar></app-nav-bar>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-1 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          @click="closeNavBar = !closeNavBar"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-end">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              class="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
              aria-label="Notifications"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                  @click="showDropDown = !showDropDown"
                >
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
                    alt
                  />
                </button>
              </div>
              <app-transition>
                <div
                  v-show="showDropDown"
                  class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg mt-4"
                >
                  <div
                    class="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <button
                      @click="logout"
                      class="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150 focus:outline-none"
                      role="menuitem"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </app-transition>
            </div>
          </div>
        </div>
      </div>

      <main
        class="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-150"
        tabindex="0"
      >
        <router-view></router-view>
        <app-notification
          v-show="notification.show"
          :is-shown="notification.show"
          :title="notification.title"
          :subtitle="notification.subtitle"
          :type="notification.type"
          @close="hideNotification"
        ></app-notification>
      </main>
    </div>
  </div>
</template>

<script>
import AppNavBar from "@/components/app/navigation/AppNavBar.vue";
import AppNavBarMobile from "@/components/app/navigation/AppNavBarMobile.vue";
import AppNotification from "@/components/app/notifications/AppNotification.vue";
import AppTransition from "@/components/app/global/AppTransition.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      showDropDown: false,
    };
  },
  computed: {
    ...mapState("display", {
      notification: "notification",
    }),

    closeNavBar: {
      get() {
        return this.$store.state.display.closeNavBar;
      },
      set(value) {
        this.updatecloseNavBar(value);
      },
    },
  },
  methods: {
    ...mapMutations("display", {
      hideNotification: "HIDE_NOTIFICATION",
      updatecloseNavBar: "SET_CLOSE_NAV_BAR",
    }),
    logout() {
      this.$store.dispatch("auth/LOGOUT");
    },
    goTo(routeName) {
      this.$router.push({
        name: routeName,
      });
      this.showDropDown = false;
    },
  },
  components: {
    AppNavBar,
    AppNavBarMobile,
    AppNotification,
    AppTransition,
  },
};
</script>

<style></style>
