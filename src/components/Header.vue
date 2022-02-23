<script setup lang="ts">
import SvgIcon from './SvgIcon/index.vue'
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import { IconMoonFill, IconSunFill } from '@arco-design/web-vue/es/icon';
const title = ref('I want to study typescript')
// 检测浏览器系统主题
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
const appStore = useAppStore()
const useStore = useUserStore()
const theme = computed(() => {
  return appStore.theme
})
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
    <div class="logo">初笺 CHUJIAN</div>
    <ul class="category">
      <li>灵感</li>
      <li>找工作</li>
      <li>学习设计</li>
      <li>版权保护</li>
      <li>市场</li>
      <li>聘请设计师</li>
    </ul>
    <ul class="operate">
      <li>
        <svg width="15" height="15" viewBox="0 0 48 48" fill="none">
          <path
            d="M33.07 33.071c6.25-6.248 6.25-16.379 0-22.627-6.248-6.249-16.378-6.249-22.627 0-6.248 6.248-6.248 16.379 0 22.627 6.249 6.248 16.38 6.248 22.628 0zm0 0l8.486 8.485"
            stroke="#4E5969"
            stroke-width="2"
          />
        </svg>
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 9c7.18 0 13 5.82 13 13v13H11V22c0-7.18 5.82-13 13-13zm0 0V4M6 35h36m-25 7h14"
            stroke="#4E5969"
            stroke-width="2"
          />
        </svg>
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 48 48" fill="none">
          <path
            d="M18 20h-7a1 1 0 00-1 1v20a1 1 0 001 1h26a1 1 0 001-1V21a1 1 0 00-1-1h-7M32.368 14.364L24.004 6l-8.364 8.364M24.003 28V6.604"
            stroke="#4E5969"
            stroke-width="2"
            stroke-miterlimit="16"
          />
        </svg>
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 48 48" fill="none">
          <path
            d="M18.797 6.732A1 1 0 0119.76 6h8.48a1 1 0 01.963.732l1.286 4.628a1 1 0 001.213.7l4.65-1.2a1 1 0 011.117.468l4.24 7.344a1 1 0 01-.153 1.2L38.192 23.3a1 1 0 000 1.402l3.364 3.427a1 1 0 01.153 1.2l-4.24 7.344a1 1 0 01-1.116.468l-4.65-1.2a1 1 0 00-1.214.7l-1.286 4.628a1 1 0 01-.963.732h-8.48a1 1 0 01-.963-.732L17.51 36.64a1 1 0 00-1.213-.7l-4.65 1.2a1 1 0 01-1.116-.468l-4.24-7.344a1 1 0 01.152-1.2L9.81 24.7a1 1 0 000-1.402l-3.365-3.427a1 1 0 01-.152-1.2l4.24-7.344a1 1 0 011.116-.468l4.65 1.2a1 1 0 001.213-.7l1.286-4.628z"
            stroke="#4E5969"
            stroke-width="2"
          />
          <path d="M30 24a6 6 0 11-12 0 6 6 0 0112 0z" stroke="#4E5969" stroke-width="2" />
        </svg>
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 22 22" fill="none">
          <path
            clip-rule="evenodd"
            d="M20.076 17.534c.252.215.47.573.651.975.516 1.137-.456 2.291-1.704 2.291H2.959c-1.238 0-2.208-1.137-1.71-2.27.18-.41.398-.777.654-.996.509-.435 2.857-1.63 4.76-2.567 1.244-.612 1.572-2.333.901-3.547-.705-1.275-1.367-3.013-1.367-5.044C6.197 3.678 6.63 1 10.987 1c4.355 0 4.802 2.83 4.802 5.376 0 2.057-.655 3.813-1.348 5.097-.654 1.21-.317 2.909.917 3.516 1.882.926 4.209 2.11 4.718 2.545z"
            stroke="#333"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </li>
    </ul>
  </header>
</template>

<style lang="less">
header {
  display: flex;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.04), 0px 8px 32px rgba(0, 0, 0, 0.08);

  ul {
    display: inline-flex;
    justify-content: space-between;
  }

  .logo {
    font-size: 30px;
    font-weight: bold;
  }

  .category {
    font-size: 20px;
    width: 40%;
    li {
      cursor: pointer;
    }
  }

  .operate {
    display: inline-flex;

    li {
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
