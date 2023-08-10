<template>
  <router-link :to="'/lost/' + lost.ID">
    <div class="flex pb-3 border-b box-border gap-3 group">
      <div class="h-24 w-24 shrink-0 overflow-hidden rounded group-hover:-translate-x-1 transition-all duration-500">
        <img :src="lost.PIC" alt="" class="coverImg" />
      </div>
      <div class="w-full h-24 flex flex-col gap-4 justify-between group-hover:-translate-x-1 transition-all duration-500">
        <div class="flex flex-col gap-1">
          <div
            class="
              flex
              w-full
              justify-between
              items-center
              group-hover:-translate-x-1
              transition-all
              duration-500
            "
          >
            <div class="w-9/12 flex gap-2">
              <span class="font-semibold line-clamp-1">{{ lost.NAME }}</span>
            </div>
            <div class="w-3/12 flex items-center justify-end shrink-0">
              <span :class="type_class">{{ lost.TYPE }}</span>
            </div>
          </div>
          <span class="text-sm">{{ lost.POSITION }}</span>
        </div>

        <span
          class="
            text-sm text-slate-400
            group-hover:-translate-x-1
            transition-all
            duration-500
          "
          >{{ lost.CREATE_TIME }}</span
        >
      </div>
    </div>
  </router-link>
</template>

<script>
import { onMounted, ref } from "vue";
import moment from "moment";
export default {
  props: {
    lost: {
      type: Object,
      default: {
        ID: "",
        PIC: "",
        NAME: "",
        TYPE: "",
        POSITION: "",
        CREATE_TIME: "",
      },
    },
  },
  setup(props) {
    let type_class = ref("");
    onMounted(() => {
      props.lost.CREATE_TIME = moment(props.lost.CREATE_TIME).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      if (props.lost.TYPE == "寻物") {
        type_class.value =
          "px-2 py-1 text-xs text-white bg-blue-600 rounded-md";
      } else {
        type_class.value =
          "px-2 py-1 text-xs text-white bg-green-600 rounded-md";
      }
    });

    return {
      type_class,
    };
  },
};
</script>

<style>
</style>