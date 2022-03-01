<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { UserOutlined, TabletOutlined } from '@ant-design/icons-vue';
import logo from '@/assets/icons/svg/enchant_logo.svg'

const router = useRouter();
const title = ref('I want to study typescript')
// 检测浏览器系统主题
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')


// const isDark = useDark({
//   selector: 'body',
//   attribute: 'arco-theme',
//   valueDark: 'dark',
//   valueLight: 'light',
//   storageKey: 'arco-theme',
//   onChanged(dark: boolean) {
//     appStore.toggleTheme(dark);
//   },
// })
// const toggleTheme = useToggle(isDark)
// const setVisible = () => {
//   appStore.updateSettings({ globalSettings: true });
// };
const ThemeChange = (val: string | number | boolean) => {
  if (!val) {
    document.documentElement.classList.add('dark')
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <header>
    <div class="logo">
      <img :src="logo" width="240" />
    </div>
    <ul class="category">
      <li>灵感</li>
      <li>找工作</li>
      <li>学习设计</li>
      <li>版权保护</li>
      <li>市场</li>
      <li>聘请设计师</li>
    </ul>
    <ul class="operate">
      <li @click="router.push('/info')">
        <user-outlined />
      </li>
      <li @click="router.push('/works')">
        <tablet-outlined />
      </li>
    </ul>
  </header>
</template>

<style lang="less">
header {
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.04), 0px 8px 32px rgba(0, 0, 0, 0.08);

  ul {
    display: inline-flex;
    justify-content: space-between;
    margin: 0;
  }

  .logo {
    font-size: 30px;
    font-weight: bold;
  }

  .category {
    font-size: 20px;
    width: 40%;
    list-style: none;
    li {
      cursor: pointer;
    }
  }

  .operate {
    display: inline-flex;

    li {
      cursor: pointer;
      margin-left: 10px;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #8e8e8e;
      box-sizing: border-box;
    }
  }
}
</style>
