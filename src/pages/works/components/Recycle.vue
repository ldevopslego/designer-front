<template>
  <div class="list-box">
    <section class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img :src="item.worksLink" alt="index" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getWorksList } from '@/api/works';
const list = ref([])

const getList = () => {
  getWorksList({ delete: 1 }).then(res => {
    list.value = res.data.lists
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="less">
.list-box {
  margin-top: 20px;
  .list {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding: 0 20px;
    margin-top: 10px;
    .item {
      height: 350px;
      border: 1px solid #bbb7b7;
      img {
        width: 100%;
        height: 90%;
      }
    }
  }
}
</style>