<template>
  <CardWithLine>
    <template #title>
      发表失物招领
    </template>
    <template #content>
      <div class="flex flex-col lg:flex-row gap-5">
        <!--        封面-->
        <div class="w-64 m-auto shrink-0">
          <div class="">
            <input
                type="file"
                id="headshot"
                class="sr-only"
                @change="changeImg($event)"
            />
            <label for="headshot">
              <div
                  class="
                w-full
                h-64
                rounded-lg
                group
                overflow-hidden
                cursor-pointer
                border
              "
              >
                <div
                    class="w-full h-full flex relative flex-col gap-2 justify-center items-center"
                >
                  <p class="text-slate-500">配图</p>
                  <i-add-pic theme="outline" size="24"/>

                  <img
                      id="preImg"
                      :src="pic"
                      alt=""
                      class="h-96 w-full object-cover absolute top-0 left-0 hidden"
                  />
                </div>
                <div
                    class="
                  flex flex-col
                  gap-2
                  text-white
                  items-center
                  justify-center
                  w-full
                  h-64
                  bg-gray-700
                  group-hover:-translate-y-full
                  transition-all
                  duration-700
                  opacity-80
                "
                >
                  <span class="">选择配图</span>
                  <i-upload-two theme="outline" size="24"/>
                </div>
              </div>
            </label>
          </div>
        </div>
        <!--        其他信息-->
        <div class="flex-auto flex gap-5 flex-col justify-between">
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">名称</span>
            <el-input v-model="name" size="large" placeholder="请输入失物名称或对失物的描述"/>
          </div>
          <div class="flex items-center flex-col lg:flex-row gap-5">
            <div class="flex items-center lg:w-1/2 w-full">
              <span class="w-24 text-slate-500 shrink-0">类型</span>
              <el-select v-model="type" class="w-full" placeholder="请选择失物类型" size="large">
                <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </div>
            <div class="flex items-center lg:w-1/2 w-full">
              <span class="w-24 text-slate-500 shrink-0">联系人称呼</span>
              <el-input v-model="linkman" size="large" placeholder="例如：张先生"/>
            </div>
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">联系方式</span>
            <el-select v-model="link_way_type" placeholder="请选择联系方式" size="large" @change="changeLinkWay">
              <el-option
                  v-for="item in link_way_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-input class="ml-3" v-model="link_way" size="large" placeholder="例如：QQ:xxxxxxxxx"/>
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">地点</span>
            <el-input v-model="position" size="large" placeholder="请输入相关地点"/>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 mt-4">
        <span class="w-24 text-slate-500 shrink-0">描述</span>
        <el-input
            v-model="description"
            :rows="8"
            type="textarea"
            placeholder="请输入相关描述"
        />
      </div>
      <button :disabled="!isChange" class="btn-primary mt-4 w-full lg:w-fit" @click="saveLost()">保存</button>
    </template>
  </CardWithLine>
</template>

<script>
import CardWithLine from "@/components/CardWithLine.vue";
import {ref, onMounted} from "vue";
import {LOSTTYPE, LINK_WAY_TYPE} from "@/tools/constant";
import {getPhone, getEmail} from "@/api/user";
import {createItem} from "@/api/lost";
import {ElMessage} from "element-plus";
import {getBase64} from "@/tools/functions";
import router from "@/router";

export default {
  name: "CreateLost",
  setup() {
    let pic = ref('')
    let name = ref('')
    let type = ref(LOSTTYPE[0].value)
    let linkman = ref('')
    let link_way = ref('')
    let position = ref('')
    let description = ref('')
    let types = ref(LOSTTYPE)
    let link_way_type = ref(LINK_WAY_TYPE[1].value)
    let link_way_types = ref(LINK_WAY_TYPE)
    let phone = ref('')
    let email = ref('')

    onMounted(() => {
      getPhone().then((result) => {
        phone.value = result.data.PHONE
        link_way.value = phone.value
      })
      getEmail().then((result) => {
        email.value = result.data.EMAIL
      })
    })

    // 配图处理
    let isChange = ref(false)
    const changeImg = (e) => {
      document.getElementById("preImg").classList.remove("hidden");
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        pic.value = res;
      });
    };

    const changeLinkWay = (val) => {
      switch (val) {
        case '1':
          link_way.value = phone.value
          break
        case '2':
          link_way.value = email.value
          break
        default:
          link_way.value = ''
          break
      }
    }

    const saveLost = () => {
      createItem({
        name: name.value,
        pic: pic.value,
        type: type.value,
        linkman: linkman.value,
        link_way: link_way.value,
        position: position.value,
        description: description.value,
      }).then((result) => {
        ElMessage({
          message: '发布成功，正在跳转到详情页。',
          type: 'success'
        })
        router.push('/lost/detail/' + result.insertId)
      })
    }

    return {
      pic,
      name,
      type,
      linkman,
      link_way,
      position,
      description,
      types,
      link_way_type,
      link_way_types, changeLinkWay, isChange, saveLost, changeImg
    }
  },
  components: {
    CardWithLine
  }
}
</script>

<style scoped>

</style>