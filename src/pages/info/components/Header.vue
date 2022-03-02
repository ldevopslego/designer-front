<template>
  <div class="header">
    <img :src="logo" width="120" height="30" @click="router.push('/')" />
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/icons/svg/enchant_logo.svg'
const router = useRouter();

</script>

<style scoped lang="less">
.header {
  background: #001529;
  padding: 10px;
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
  }
  ul {
    margin: 0;
    padding: 0;
    padding-left: 10px;
    color: white;
    list-style: none;
    display: inline-flex;
    li {
      font-size: 20px;
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
</style>