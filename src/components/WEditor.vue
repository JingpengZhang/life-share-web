<template>
  <div ref="editor"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, onBeforeUpdate } from "vue";
import WangEditor from "wangeditor";
import { getBase64 } from "../tools/functions";
import { uploadImg } from "../api/editor";
export default {
  name: "app",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const editor = ref();

    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);

      Object.assign(instance.config, {
        onchange() {
          context.emit("contentChange", instance.txt.html());
        },
      });
      instance.config.uploadImgHeaders = {
        Authorization: localStorage.getItem("token"),
      };
      instance.config.customUploadImg = function (resultFiles, insertImgFn) {
        getBase64(resultFiles[0]).then((res) => {
          uploadImg({ img: res }).then((result) => {
            insertImgFn(result.data);
          });
        });
      };
      instance.config.zIndex = 100;
      instance.create();
    });

    onBeforeUpdate(() => {
      instance.txt.html(props.content);
    });

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    return {
      editor,
    };
  },
};
</script>

<style>
</style>