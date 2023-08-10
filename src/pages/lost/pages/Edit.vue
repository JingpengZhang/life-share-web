<template>
  <div class="bg-white shadow rounded p-3 w-full">
    <h1 class="text-xl md:text-2xl text-center">编辑寻物/招领启事</h1>
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
          @change="changeImg($event)"
          type="file"
          name=""
          id="pic"
          class="sr-only"
        />
        <label for="pic" class="">
          <div class="w-40 h-56 upload-box">
            <span class="upload-text"
              >点击此处，上传配图，更容易找到失物或失主。</span
            >
            <img :src="pic" alt="" class="upload-img" />
          </div>
        </label>
      </div>

      <div class="flex flex-col gap-3">
        <div class="mt-3">
          <span>物品描述：</span>
        </div>
        <textarea
          class="textarea"
          v-model="description"
          cols="30"
          rows="10"
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

      <button class="btn-blue w-full md:w-24 mt-5" @click="submit()">
        发布
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { LOSTTYPE, LOSTSTATE } from "../../../tools/constant";
import { LOST } from "../../../tools/fake";
import { getDetail, changePic, editItem } from "../../../api/lost";
import { getBase64 } from "../../../tools/functions";
import { ElMessage } from "element-plus";
import router from "../../../router";
export default {
  props: { id: { type: String, default: 1 } },
  setup(props, context) {
    const id = props.id;

    const types = LOSTTYPE;
    const states = LOSTSTATE;

    let type = ref(LOST.type);
    let state = ref(LOST.state);
    let name = ref(LOST.name);
    let pic = ref(LOST.pic);
    let position = ref(LOST.postition);
    let description = ref(LOST.description);
    let linkman = ref(LOST.linkman);
    let link_way = ref(LOST.link_way);

    let isPicChange = ref(false); // 判断物品图是否被改变

    onMounted(() => {
      getDetail(id).then((result) => {
        type.value = result.lost.type;
        state.value = result.lost.state;
        name.value = result.lost.name;
        pic.value = result.lost.pic;
        position.value = result.lost.position;
        description.value = result.lost.description;
        linkman.value = result.lost.linkman;
        link_way.value = result.lost.link_way;
      });
    });

    // 上传物品图
    const changeImg = (e) => {
      isPicChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        pic.value = res;
      });
    };

    // 提交
    const submit = () => {
      editItem(id, {
        name: name.value,
        type: type.value,
        state: state.value,
        position: position.value,
        description: description.value,
        linkman: linkman.value,
        link_way: link_way.value,
      }).then((result) => {
        if (!isPicChange.value) {
          ElMessage({ message: "修改成功", type: "success" });
          router.push("/lost/" + id);
        } else {
          // 修改物品图
          changePic({
            id: id,
            pic: pic.value,
          }).then((result) => {
            ElMessage({ message: "修改成功", type: "success" });
            router.push("/lost/" + id);
          });
        }
      });
    };

    return {
      types,
      states,
      type,
      state,
      name,
      pic,
      position,
      description,
      linkman,
      link_way,
      submit,
      changeImg,
    };
  },
};
</script>

<style>
</style>