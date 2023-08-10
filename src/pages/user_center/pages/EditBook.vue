<template>
  <CardWithLine>
    <template #title>
      编辑推荐
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
                h-96
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
                  <p class="text-slate-500">封面</p>
                  <i-add-pic theme="outline" size="24"/>

                  <img
                      id="preImg"
                      :src="cover"
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
                  h-96
                  bg-gray-700
                  group-hover:-translate-y-full
                  transition-all
                  duration-700
                  opacity-80
                "
                >
                  <span class="">选择封面</span>
                  <i-upload-two theme="outline" size="24"/>
                </div>
              </div>
            </label>
          </div>
        </div>
        <!--        其他信息-->
        <div class="flex-auto flex gap-5 flex-col justify-between">
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">书名</span>
            <el-input v-model="name" size="large" placeholder="请输入书名"/>
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">作者名</span>
            <el-input v-model="author" size="large" placeholder="请输入作者名"/>
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">出版社名称</span>
            <el-input v-model="press" size="large" placeholder="请输入出版社名称"/>
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">出版时间</span>
            <el-date-picker
                size="large"
                v-model="publication_time"
                type="month"
                placeholder="请选择出版日期"
            />
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">页数</span>
            <el-input-number v-model="page_num" :min="1" :max="99999"/>
          </div>
          <div class="flex items-center">
            <span class="w-24 text-slate-500 shrink-0">ISBN</span>
            <el-input v-model="ISBN" size="large" placeholder="请输入图书ISBN号"/>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 mt-4">
        <span class="w-24 text-slate-500 shrink-0">推荐语</span>
        <el-input
            v-model="recommend"
            :rows="8"
            type="textarea"
            placeholder="请输入推荐语"
        />
      </div>
      <button class="btn-primary mt-4 w-full lg:w-fit" @click="saveBook()">保存</button>
    </template>
  </CardWithLine>
</template>

<script>
import CardWithLine from "@/components/CardWithLine.vue";
import {ref, onMounted} from "vue";
import {getBase64} from "@/tools/functions";
import {ElMessage} from "element-plus";
import router from "@/router";
import {getDetail, changePic, editItem} from "@/api/book";

export default {
  name: "EditBook",
  props: {
    id: {type: String, default: ''}
  },
  setup(props, context) {
    let id = props.id

    let cover = ref('')
    let name = ref('')
    let author = ref('')
    let press = ref('')
    let publication_time = ref('')
    let page_num = ref(1)
    let ISBN = ref('')
    let recommend = ref('')

    onMounted(() => {
      getDetail(id).then(result => {
        cover.value = result.data.COVER
        name.value = result.data.NAME
        author.value = result.data.AUTHOR
        press.value = result.data.PRESS
        publication_time.value = result.data.PUBLICATION_TIME
        ISBN.value = result.data.ISBN
        recommend.value = result.data.RECOMMEND
      })
    })

    // 封面处理
    let isChange = ref(false)
    const changeImg = (e) => {
      isChange.value = true;
      getBase64(e.target.files[0]).then((res) => {
        cover.value = res;
      });
    };

    const saveBook = () => {
      editItem(id, {
        name: name.value,
        author: author.value,
        press: press.value,
        publication_time: publication_time.value,
        page_num: page_num.value,
        ISBN: ISBN.value,
        recommend: recommend.value
      }).then((result) => {
        if (isChange.value) {
          changePic({
            id: id,
            cover: cover.value
          }).then((result) => {
            ElMessage({
              message: '修改成功！正在跳转到详情页。',
              type: 'success'
            })
            isChange.value = false;
            router.push('/book/' + id)
          })
        } else {
          ElMessage({
            message: '修改成功！正在跳转到详情页。',
            type: 'success'
          })
          router.push('/book/' + id)
        }

      })
    }

    return {
      cover,
      name,
      author,
      press,
      publication_time,
      page_num,
      ISBN,
      recommend,
      changeImg, saveBook
    }
  },
  components: {
    CardWithLine
  }
}
</script>

<style scoped>

</style>