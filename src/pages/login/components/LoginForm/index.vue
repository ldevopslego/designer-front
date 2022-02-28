<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">
      <span>初笺</span>
      <span>CHU JIAN</span>
    </div>
    <div class="login-form-sub-title">———创意社区一体化平台</div>
    <!-- <div class="login-form-error-msg">{{ }}</div> -->

    <transition-group name="slide" v-show="isLogin">
      <LoginForm @change-mode="e => isLogin = e" v-if="isLogin"></LoginForm>

      <!-- <RegisterForm @change-mode="e => isLogin = e" v-else></RegisterForm> -->
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './login-form.vue'
// import RegisterForm from './register-form.vue';

const isLogin = ref(true)

</script>


<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
    overflow: hidden;
  }

  &-title {
    color: rgba(254, 99, 47, 1);
    display: flex;
    justify-content: space-around;
    font-weight: 500;
    font-size: 40px;
    line-height: 40px;
  }

  &-sub-title {
    text-align: right;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  &-error-msg {
    height: 32px;
    line-height: 32px;
  }
}

.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-active {
  transition: all 0.75s ease;
}
/**
    * 动画开始之前,和动画完成之后的元素位置
    */
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
