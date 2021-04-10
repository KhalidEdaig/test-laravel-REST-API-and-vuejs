<template>
  <div class="max-w-md rounded overflow-hidden shadow-lg px-2">
    <button
      class="bg-indigo-600 p-3 rounded text-white shadow-inner w-full flex justify-between items-center"
    >
      <span class="float-left">{{ title }}</span>
      <Icon
        :name="'chevronDown'"
        :className="'w-4 h-4 float-right fill-current ml-4'"
      />
    </button>
    <div class="rounded shadow-md my-2 relative pin-t pin-l">
      <ul class="list-reset">
        <li v-for="(item, index) in items" :key="index">
          <p class="p-2 block text-black hover:bg-grey-light cursor-pointer">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: [Array, Object],
  },
};
</script>

<style></style>
