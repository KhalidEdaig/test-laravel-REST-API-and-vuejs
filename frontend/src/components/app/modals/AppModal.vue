<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-40"
  >
    <transition
      enter-active-class="ease-out duration-300"
      leave-active-class="ease-in duration-200"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 transition-opacity" v-show="isShown">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>
    <transition
      enter-active-class="ease-out duration-300"
      leave-active-class="ease-in duration-200"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-show="isShown"
        class="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        :class="{ 'overflow-hidden': isOverflowHidden }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div :class="{ 'sm:flex  sm:items-start': isFlex }">
            <slot>
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">{{ subtitle }}</p>
                </div>
              </div>
            </slot>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              :disabled="loading"
              @click="$emit('confirm')"
              type="button"
              :class="confirmButtonClass"
              class="inline-flex justify-center items-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <div
                v-show="loading"
                class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-4 w-4 mr-2"
              ></div>
              <span v-show="!loading">{{ confirmLabel }}</span>
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              @click="$emit('cancel')"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              {{ cancelLabel }}
            </button>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    confirmLabel: {
      type: String,
      default: "Confirmer",
    },
    confirmButtonClass: {
      type: String,
      default: "bg-red-600 hover:bg-red-500",
    },
    cancelLabel: {
      type: String,
      default: "Annuler",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isShown: {
      type: Boolean,
      default: false,
    },
    isOverflowHidden: {
      type: Boolean,
      default: true,
    },
    isFlex: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
