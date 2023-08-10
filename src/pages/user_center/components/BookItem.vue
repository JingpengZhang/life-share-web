<template>
  <div
      class="w-64 h-96 group relative rounded-md overflow-hidden"
  >
    <div class="w-64 h-96">
      <img :src="book.cover" alt="" class="headshot"/>
    </div>
    <div
        class="h-8 pr-2 pl-4 bg-black hidden group-hover:flex z-10 flex items-center justify-end gap-2 bg-white absolute top-0 right-0 rounded-bl-full">
      <button class="text-white hover:text-blue-700" title="查看" @click="go()">
        <i-link theme="outline" size="18"/>
      </button>
      <button class="text-white hover:text-purple-700" title="编辑" @click="editData()">
        <i-writing-fluently theme="outline" size="18"/>
      </button>
      <button class="text-white hover:text-red-700" title="删除" @click="deleteData()">
        <i-delete-one theme="outline" size="18"/>
      </button>
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

export default {
  name: "RecommendListItem",
  props: {
    book: {
      type: Object,
      default: {
        id: '',
        cover: '',
        name: '',
        author: "",
      },
    },
  },
  setup(props, context) {
    const id = props.book.id;

    const go = () => {
      router.push("/book/" + id);
    };

    const deleteData = () => {
      context.emit("deleteData", id);
    };

    const editData = () => {
      router.push('/user_center/editbook/' + id)
    }

    return {
      go, deleteData,editData
    };
  },
};
</script>

<style>
</style>