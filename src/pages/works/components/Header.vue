<template>
  <div class="header">
    <img :src="logo" width="120" height="30" @click="router.push('/')" />
    <ul>
      <li @click="emit('changeMode', 'works')">作品</li>
      <li @click="emit('changeMode', 'recycle')">回收站</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/icons/svg/enchant_logo.svg'
const router = useRouter();
const emit = defineEmits(["changeMode"])

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