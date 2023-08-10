<template>
  <CardWithLine>
    <template #title>
      编辑失物招领
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
                      :src="pic"
                      alt=""
                      class="h-96 w-full object-cover absolute top-0 left-0"
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
              <span class="w-24 text-slate-500 shrink-0">状态</span>
              <el-select v-model="state" class="w-full" placeholder="请选择失物状态" size="large">
                <el-option
                    v-for="item in states"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </div>
            <div class="flex items-center lg:w-1/2 w-full">
              <span class="w-24 lg:w-16 text-slate-500 shrink-0">类型</span>
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
      <button class="btn-primary mt-4 w-full lg:w-fit" @click="saveLost()">保存</button>
    </template>
  </CardWithLine>
</template>

<script>
import CardWithLine from "@/components/CardWithLine.vue";
import {onMounted,ref} from "vue";
import {LINK_WAY_TYPE, LOSTTYPE,LOSTSTATE} from "@/tools/constant";
import {getEmail, getPhone} from "@/api/user";
import {getDetail,editItem,changePic} from "@/api/lost";
import {getBase64} from "@/tools/functions";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "EditLost",
  props:{
    id:{type:String,default:''}
  },
  setup(props,context){
    let id = props.id

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
    let states = ref(LOSTSTATE)
    let state = ref('')

    onMounted(() => {
      getPhone().then((result) => {
        phone.value = result.data.PHONE
        link_way.value = phone.value
      })
      getEmail().then((result) => {
        email.value = result.data.EMAIL
      })
      getDetail(id).then(result=>{
        pic.value = result.data.PIC
        name.value = result.data.NAME
        type.value = result.data.TYPE
        linkman.value = result.data.LINKMAN
        link_way.value = result.data.LINK_WAY
        position.value = result.data.POSITION
        description.value = result.data.DESCRIPTION
        state.value = result.data.STATE
      })
    })

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

    let isChange = ref(false)
    const changeImg = (e) => {
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        pic.value = res;
      });
    };

    // 保存
    const saveLost = () =>{
      editItem(id,{
        name: name.value,
        state:state.value,
        type: type.value,
        linkman: linkman.value,
        link_way: link_way.value,
        position: position.value,
        description: description.value,
      }).then(result=>{
        if(isChange){
          changePic({
            id:id,
            pic:pic.value
          }).then(result=>{
            ElMessage({
              message:"更新成功，正在跳转到详情页。",
              type:'success'
            })

            router.push('/lost/detail/'+id)
          })
        }else{
          ElMessage({
            message:"更新成功，正在跳转到详情页。",
            type:'success'
          })
          router.push('/lost/detail/'+id)
        }
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
      link_way_types,
      phone,
      email,
      states,
      state,changeLinkWay,changeImg,saveLost
    }
  },
  components:{
    CardWithLine
  }
}
</script>

<style scoped>

</style>