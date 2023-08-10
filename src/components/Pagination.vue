<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li
        class="page-item"
        @click="pagePrev()"
      >
        <i-left theme="filled" size="18" />
      </li>
      <li
        v-for="(item, index) in pages"
        :key="index"
        :class="[page == item ? 'page-active' : 'page-item']"
        @click="page = item"
      >
        {{ item }}
      </li>
      <li
        class="page-item"
        @click="pageNext()"
      >
        <i-right theme="filled" size="18" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    pages: {
      type: Array,
      default: [],
    },
    current_page: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    let page = ref();
    page.value = props.current_page;
    const pagePrev = () => {
      page.value > 1 ? page.value-- : (page.value = page.value);
    };
    const pageNext = () => {
      page.value < props.pages.length
        ? page.value++
        : (page.value = page.value);
    };

    watch(page, (val, old) => {
      context.emit("changePage", val);
    });
    return {
      page,
      pagePrev,
      pageNext,
    };
  },
};
</script>

<style>
</style>