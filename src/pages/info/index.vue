<template>
  <div class="infobox">
    <div class="info"></div>
    <div class="content">
      <Category />
      <List />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Category from './components/Category.vue';
import List from './components/List.vue';

</script>

<style lang="less" scoped>
.infobox {
  display: flex;
  min-height: 100vh;
  .info {
    background: rgb(25, 58, 136);
    width: 400px;
  }
  .content {
    flex: 1 1 auto;
    padding: 20px;
  }
}
</style>