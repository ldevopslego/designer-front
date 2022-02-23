<script setup lang="ts">
import Header from "@components/Header.vue"
import { version } from "../../package.json"
import SvgIcon from "@components/SvgIcon/index.vue"
import { useAppStore } from '@/store/modules/app'
import { framework } from "./data"

const appStore = useAppStore()
const data = ref(framework)

// const user = await userApi.getUserProfile()
// console.log(user, '获取用户信息')
</script>
<template>
  <div>
    <Header />
    <div class="list">
      <div class="item" v-for="(item, index) in 50" :key="index">
        <img src="@/assets/images/photo.png" alt="index" />
        <div class="description">
          <span class="name">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path
                clip-rule="evenodd"
                d="M20.076 17.534c.252.215.47.573.651.975.516 1.137-.456 2.291-1.704 2.291H2.959c-1.238 0-2.208-1.137-1.71-2.27.18-.41.398-.777.654-.996.509-.435 2.857-1.63 4.76-2.567 1.244-.612 1.572-2.333.901-3.547-.705-1.275-1.367-3.013-1.367-5.044C6.197 3.678 6.63 1 10.987 1c4.355 0 4.802 2.83 4.802 5.376 0 2.057-.655 3.813-1.348 5.097-.654 1.21-.317 2.909.917 3.516 1.882.926 4.209 2.11 4.718 2.545z"
                stroke="#333"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            初笺00{{ index }}
          </span>
          <div class="info">
            <span>
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <path
                  d="M38.083 12.912a9.929 9.929 0 01.177 13.878l-.177.18L25.76 39.273c-.972.97-2.548.97-3.52 0L9.917 26.971l-.177-.181a9.929 9.929 0 01.177-13.878c3.889-3.883 10.194-3.883 14.083 0 3.889-3.883 10.194-3.883 14.083 0z"
                  stroke="#4E5969"
                  stroke-width="2"
                />
              </svg>
              1255
            </span>
            <span>
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <path
                  clip-rule="evenodd"
                  d="M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13z"
                  stroke="#4E5969"
                  stroke-width="2"
                />
                <path d="M29 24a5 5 0 11-10 0 5 5 0 0110 0z" stroke="#4E5969" stroke-width="2" />
              </svg>
              5.5k
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Readme -->
</template>

<style lang="less" scoped>
.list {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding: 0 70px;
  margin-top: 20px;
  .item {
    height: 350px;
    img {
      height: 90%;
    }
    .description {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      span,
      div {
        display: inline-flex;
        align-items: center;
      }
      .name {
        :first-child {
          margin-right: 10px;
        }
      }
      .info {
        > :first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
