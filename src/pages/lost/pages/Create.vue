<template>
  <div class="bg-white shadow rounded p-3 w-full">
    <h1 class="text-xl md:text-2xl text-center">寻物/招领启事</h1>
    <div class="mt-5 md:px-8 flex flex-col gap-3 w-full">
      <div class="flex gap-3 items-center">
        <span class="w-20">类型：</span>
        <el-select v-model="type" class="" placeholder="Select">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex gap-3 items-center">
        <span class="w-20">状态：</span>
        <el-select v-model="state" class="" placeholder="Select">
          <el-option
            v-for="item in states"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex gap-3 items-center">
        <span class="w-20">启事标题：</span>
        <input
          type="text"
          class="input w-64"
          v-model="name"
          placeholder="物品名称"
        />
      </div>
      <div class="flex gap-3 items-center">
        <span class="w-20">地点：</span>
        <input
          type="text"
          class="input w-64"
          v-model="position"
          placeholder="寻到或丢失物品的地点"
        />
      </div>

      <div class="flex flex-col w-full gap-3 items-start">
        <span class="w-20">物品配图：</span>
        <input
          type="file"
          name=""
          id="pic"
          class="sr-only"
          @change="changeImg($event)"
        />
        <label for="pic" class="">
          <div class="w-40 h-56 upload-box">
            <span class="upload-text"
              >点击此处，上传配图，更容易找到失物或失主。</span
            >
            <img id="preImg" :src="pic" alt="" class="upload-img hidden" />
          </div>
        </label>
      </div>

      <div class="flex flex-col gap-3">
        <div class="mt-3">
          <span>物品描述：</span>
        </div>
        <textarea
          v-model="description"
          cols="30"
          rows="10"
          class="textarea"
          placeholder="对物品、丢失/拾到地点、或者过程的描述。"
        ></textarea>
      </div>
      <div class="flex gap-3 items-center">
        <span class="w-20">联系人：</span>
        <input
          type="text"
          class="input w-64"
          v-model="linkman"
          placeholder="称呼"
        />
      </div>
      <div class="flex gap-3 items-center">
        <span class="w-20">联系方式：</span>
        <input
          type="text"
          class="input w-64"
          v-model="link_way"
          placeholder="手机号、QQ、微信号等"
        />
      </div>

      <button
        class="btn-blue w-full md:w-24 mt-5"
        :disabled="!isChange"
        @click="submit()"
      >
        发布
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { LOSTTYPE, LOSTSTATE } from "../../../tools/constant";
import { createItem } from "../../../api/lost";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
import router from "../../../router";
export default {
  setup() {
    const types = ref(LOSTTYPE);
    const states = ref(LOSTSTATE);

    let isChange = ref(false);

    let type = ref("寻物");
    let state = ref("未解决");

    let name = ref("");
    let position = ref("");
    let pic = ref("");
    let description = ref("");
    let linkman = ref("");
    let link_way = ref("");

    // 上传物品图
    const changeImg = (e) => {
      document.getElementById("preImg").classList.remove("hidden");
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        pic.value = res;
      });
    };

    // 提交
    const submit = () => {
      createItem({
        type: type.value,
        state: state.value,
        name: name.value,
        position: position.value,
        pic: pic.value,
        description: description.value,
        linkman: linkman.value,
        link_way: link_way.value,
      }).then((result) => {
        ElMessage({ message: "发布成功", type: "success" });
        router.push("/lost/" + result.insertId);
      });
    };

    return {
      types,
      states,
      type,
      state,
      name,
      position,
      pic,
      description,
      linkman,
      link_way,
      submit,
      changeImg,
      isChange,
    };
  },
};
</script>

<style>
</style>