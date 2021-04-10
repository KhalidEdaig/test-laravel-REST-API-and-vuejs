<template>
  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div class="w-screen max-w-md" v-show="isShown">
            <div
              class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"
            >
              <div class="h-0 flex-1 space-y-6 overflow-y-scroll">
                <header class="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6">
                  <div class="flex items-center justify-between space-x-3">
                    <h2 class="text-lg leading-7 font-medium text-white">
                      {{ title }}
                    </h2>
                    <div class="h-7 flex items-center">
                      <button
                        @click="$emit('cancel')"
                        aria-label="Close panel"
                        class="text-indigo-200 hover:text-white transition ease-in-out duration-150"
                      >
                        <svg
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
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
                  <div>
                    <p class="text-sm leading-5 text-gray-300">
                      {{ subtitle }}
                    </p>
                  </div>
                </header>
                <div class="relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <slot></slot>
                  <!-- /End replace -->
                </div>
              </div>
              <div class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                <span class="inline-flex rounded-md shadow-sm">
                  <button
                    @click="$emit('cancel')"
                    type="button"
                    class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                  >
                    {{ cancelLabel }}
                  </button>
                </span>
                <span class="inline-flex rounded-md shadow-sm">
                  <button
                    @click="$emit('confirm')"
                    type="button"
                    class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    {{ confirmLabel }}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSlideOver",
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    isShown: {
      type: Boolean,
      default: false,
    },
    confirmLabel: {
      type: String,
      default: "Enregistrer",
    },
    cancelLabel: {
      type: String,
      default: "Annuler",
    },
  },
};
</script>

<style></style>
