<template>
  <div
    class="w-64 h-96 cursor-pointer group relative rounded-md overflow-hidden"
    @click="go()"
  >
    <div class="w-64 h-96">
      <img :src="book.cover" alt="" class="headshot" />
    </div>
    <div
      class="
        bg-gradient-to-t
        from-black
        to-transparent
        p-4
        flex flex-col
        gap-2
        absolute
        bottom-0
        right-0
        w-full
        text-white
        group-hover:pb-10
         group-hover:h-full
        justify-end
        transition-all
        duration-500
      "
    >
      <span class="font-bold">《{{ book.name }}》</span>
      <span class="">{{ book.author }}</span>
    </div>
  </div>
  <!-- <div
    class="flex w-24 flex-col gap-2 items-center cursor-pointer"
    @click="go()"
  >
    <div class="w-24 h-32">
      <img :src="book.pic" alt="" class="headshot" />
    </div>
    <span class="text-gray-500">{{ book.title }}</span>
  </div> -->
</template>

<script>
import router from "../../../router";
import { BOOK } from "../../../tools/fake";
export default {
  name: "RecommendListItem",
  props: {
    book: {
      type: Object,
      default: {
        id: BOOK.id,
        cover: BOOK.cover,
        name: BOOK.name,
        author: "",
      },
    },
  },
  setup(props) {
    const id = props.book.id;

    const go = () => {
      router.push("/book/" + id);
    };

    return {
      go,
    };
  },
};
</script>

<style>
</style>