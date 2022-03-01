<template>
  <Header @change-mode="e => mode = e"></Header>
  <div class="infobox">
    <div class="content">
      <template v-if="mode == 'works'">
        <Category @tag-change="tagChange" />
        <List ref="listRef" />
      </template>
      <template v-else>
        <Recycle></Recycle>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Category from './components/Category.vue';
import List from './components/List.vue';
import Header from './components/Header.vue'
import Recycle from './components/Recycle.vue'

const mode = ref('works')
const listRef = ref()

const tagChange = (value) => {
  listRef.value.getList({ tagId: value.join(',') })
}

</script>

<style lang="less" scoped>
.infobox {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
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