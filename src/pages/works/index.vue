<template>
  <Header @change-mode="e => mode = e"></Header>
  <div class="infobox" @scroll="handleScroll">
    <div class="content" id="content" ref="contentRef">
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
const contentRef = ref()

const tagChange = (value) => {
  listRef.value.getList({ tagId: value.join('_') })
}


const handleScroll = (e) => {
  let box = parseInt(window.getComputedStyle(contentRef.value).height)
  let list = listRef.value.getHeight()
  if (list - (box + e.target.scrollTop) < 20) {
    console.log(123)
  }
}

onMounted(() => {

  console.log(listRef.value)
})
</script>

<style lang="less" scoped>
.infobox {
  display: flex;
  height: calc(100vh - 55px);
  overflow: auto;
  background: #f0f2f5;

  .content {
    flex: 1 1 auto;
    padding: 20px;
  }
}
</style>