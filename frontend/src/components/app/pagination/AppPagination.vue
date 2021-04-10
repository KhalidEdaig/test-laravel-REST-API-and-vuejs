<template>
  <div
    v-if="pagination"
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 shadow sm:rounded-lg"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >Précédent</a
      >
      <a
        href="#"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center">
      <div v-if="withActions" class="flex items-center">
        <p>Action:</p>
        <select
          id="actions"
          v-model="action"
          class="mt-1 ml-5 block w-48 pl-2 pr-10 py-2 text-base leading-6 border-gray-400 border rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <option></option>
          <option v-for="(item, index) in items" :key="index" :value="item.id">
            {{ item.label }}
          </option>
        </select>
        <span class="inline-flex rounded-md shadow-sm">
          <button
            @click="$emit('action-choosed-id', action)"
            type="button"
            class="inline-flex items-center px-4 py-2 ml-3 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          >
            Appliquer
          </button>
        </span>
      </div>
      <div :class="{ 'ml-10': withActions }">
        <p class="text-sm leading-5 text-gray-700">
          Afficher
          <span class="font-medium">{{
            pagination.current_page === 1
              ? "1"
              : pagination.per_page * (pagination.current_page - 1) +
                pagination.count
          }}</span>
          à
          <span class="font-medium">{{
            pagination.per_page * (pagination.current_page - 1) +
            pagination.count
          }}</span>
          de
          <span class="font-medium">{{ pagination.total }}</span>
          résultat(s)
        </p>
      </div>
      <div class="ml-auto">
        <nav class="relative z-0 inline-flex shadow-sm">
          <button
            :class="{ 'cursor-not-allowed': pagination.current_page === 1 }"
            :disabled="pagination.current_page === 1"
            @click="$emit('prev')"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            v-for="(i, index) in pagination.total_pages"
            @click="$emit('select-page', i)"
            :key="index"
            href="#"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            {{ i }}
          </button>
          <button
            @click="$emit('next')"
            :class="{
              'cursor-not-allowed':
                pagination.current_page === pagination.total_pages,
            }"
            :disabled="pagination.current_page === pagination.total_pages"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPagination",
  props: {
    pagination: {
      type: Object,
    },
    withActions: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      defaultl: [],
    },
  },
  data() {
    return {
      action: "",
    };
  },
};
</script>

<style></style>
