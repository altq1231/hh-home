<template>
  <div class="basic-layout">
    <a-space class="route-link">
      <router-link to="/">home</router-link>
      <router-link to="/test">test</router-link>
    </a-space>
    <div class="layout-header container-wrapper" v-if="!hideHead">
      <div class="header-container container flex-row">header</div>
    </div>
    <div class="bottom-main-container container-wrapper">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("admin");
    const hideHead = ref(false);
    //router是全局路由对象，route= userRoute()是当前路由对象
    let router = useRouter();

    console.log(router.currentRoute.value.meta);

    if (router.currentRoute.value.meta.hideHeader) {
      hideHead.value = true;
    } else {
      hideHead.value = false;
    }

    const logout = () => {
      sessionStorage.removeItem("jwt");
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        path: "/login",
      });
    };

    const goToPage = (path) => {
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        path: path,
      });
    };

    const state = reactive({
      transitionName: "slide-left",
    });

    router.beforeEach((to, from) => {
      // if (to.meta.index > from.meta.index) {
      //   console.log(1);
      //   state.transitionName = "slide-left"; // 向左滑动
      // } else if (to.meta.index < from.meta.index) {
      //   // 由次级到主级
      //   console.log(2);
      //   state.transitionName = "slide-right";
      // } else {
      //   state.transitionName = ""; // 同级无过渡效果
      // }
      if (to.meta.hideHeader) {
        hideHead.value = true;
      } else {
        hideHead.value = false;
      }
    });

    return {
      username,
      goToPage,
      logout,
      hideHead,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100%;

  .route-link {
    position: fixed;
    top: 120px;
    left: 40px;
    z-index: 100000;
  }
  .layout-header {
    position: sticky;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 65px;
    color: @text-color;
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: saturate(180%) blur(1rem);
    backdrop-filter: saturate(180%) blur(1rem);
    overflow: hidden;
    transition: background-color 0.5s ease;

    .header-container {
      align-items: center;
      height: 100%;
      overflow: hidden;

      :deep(.ant-avatar) {
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 1rem;
      }

      .left-link {
        flex: 0 0 1.5rem;
        height: 1.5rem;
        margin-right: 2rem;
        cursor: pointer;
      }
      .left-logo-img {
        flex: 0 0 1.5rem;
        height: 1.5rem;
        cursor: pointer;
      }

      .left-title-container {
        align-items: center;
        margin-right: 1rem;
        height: 1.2rem;
        overflow: hidden;
        font-size: 0.8rem;
        color: @text-color;
      }

      .right-time-info {
        height: 1.5rem;
        border-radius: 0.2rem;
        align-items: center;

        .logo-img {
          height: 1.5rem;
          width: 1.5rem;
          border-radius: 0.2rem;
          padding: 0.25rem 0;
        }

        .user-avatar-link {
          align-items: center;
          color: @text-color;
          font-size: 0.7rem;

          .user-nick-name {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }

  .bottom-main-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
