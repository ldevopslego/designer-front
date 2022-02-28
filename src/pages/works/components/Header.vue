<template>
  <div class="header">
    <ul>
      <li @click="emit('changeMode', 'works')">作品</li>
      <li @click="emit('changeMode', 'recycle')">回收站</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["changeMode"])
</script>

<style scoped lang="less">
.header {
  background: #001529;
  padding: 10px;
  ul {
    margin: 0;
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