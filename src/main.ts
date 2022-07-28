import { createApp } from "vue";
import App from "/@/App.vue";
import Antd from "ant-design-vue";
import router from "/@/router/index";
import pinia from "/@/store/index";
import "/@/style/global.less";

createApp(App).use(Antd).use(router).use(pinia).mount("#app");
