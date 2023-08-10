<template>
  <div class="relative w-full h-96 bg-white">
    <div class="w-full h-full relative">
      <slide-item :class="showIndex === index ? '':'hidden' " v-for="(item,index) in data" :key="item.id"
                  :share="item"></slide-item>
    </div>

    <!-- 切换 -->
    <div class="absolute bottom-8 right-6 flex gap-3">
      <!-- 上一张 -->
      <div class="text-white cursor-pointer" @click="preShare()">
        <svg
            class="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
              fill="currentColor"
          />
        </svg>
      </div>
      <!-- 下一张 -->
      <div class="text-white cursor-pointer" @click="nextShare()">
        <svg
            class="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
              fill="currentColor"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import SlideItem from "./SlideItem.vue";
import {getSlideShares} from "@/api/share";
import {onMounted, ref} from "vue";

export default {
  setup() {
    let data = ref([])

    onMounted(() => {
      getSlideShares().then(result => {
        data.value = result.data
        indexNum.value = data.value.length
      })
    })

    // 总项数
    let indexNum = ref(0)
    // 当前显示的项下标
    let showIndex = ref(0)

    // 下一个 SlideItem
    const nextShare = () => {
      showIndex.value < indexNum.value - 1 ? showIndex.value++ : showIndex.value = 0
    }

    // 上一个 SlideItem
    const preShare = () =>{
      showIndex.value > 0 ? showIndex.value-- : showIndex.value = indexNum.value - 1
    }


    return {
      data, nextShare, showIndex,preShare
    }
  },
  components: {
    SlideItem,
  },
};
</script>

<style>
</style>