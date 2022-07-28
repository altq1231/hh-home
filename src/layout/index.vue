<template>
  <div class="basic-layout">
    <div class="layout-header container-wrapper">
      <div class="header-container container flex-row">header</div>
    </div>
    <div class="bottom-main-container container-wrapper">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("admin");

    //router是全局路由对象，route= userRoute()是当前路由对象
    let router = useRouter();
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
      if (to.meta.index > from.meta.index) {
        console.log(1);
        state.transitionName = "slide-left"; // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        console.log(2);
        state.transitionName = "slide-right";
      } else {
        state.transitionName = ""; // 同级无过渡效果
      }
    });

    return {
      username,
      goToPage,
      logout,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100%;
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
