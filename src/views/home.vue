<template>
  <div class="home-page">
    home
    <a-button type="primary" @click="handleClick"> {{ title }}</a-button>
  </div>
</template>

<script>
// // @ts-ignore：无法被执行的代码的错误
import NProgress from "nprogress";
import { reactive, ref } from "vue";
import {
  MenuOutlined,
  FileAddOutlined,
  FrownOutlined,
  FolderOutlined,
} from "@ant-design/icons-vue";
import { GlobalStore } from "/@/store/common";
import { storeToRefs } from "pinia";

export default {
  name: "Home",
  components: {
    MenuOutlined,
    FileAddOutlined,
    FrownOutlined,
    FolderOutlined,
  },
  setup() {
    const isBomb = reactive({ value: false });
    const title = ref("test  sa aa");

    const globalStore = GlobalStore();
    const { pageData, absoluteData } = storeToRefs(globalStore);

    console.log(title.value);

    const handleLoad = (data) => {};
    const dragover = (e) => {
      // console.log("home------------", e);
      e.preventDefault();
    };

    const handleAbsoluteData = (aData) => {
      console.log(aData);
      return JSON.stringify(aData);
    };

    const handleClick = () => {
      NProgress.set(0.5);
    };
    return {
      isBomb,
      handleLoad,
      handleClick,
      dragover,
      pageData,
      absoluteData,
      handleAbsoluteData,
      title,
    };
  },
};
</script>
<style scoped lang="less">
.home-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-color: #000000;
  // color: #ffffff;

  .box-wrapper {
    flex-wrap: wrap;

    .flex-item {
      flex: 0 0 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 18px;
      text-align: center;
      line-height: 32px;

      &:hover {
        background-color: @primary-color;
      }
    }
  }
}
</style>
