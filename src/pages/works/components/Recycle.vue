<template>
  <div class="list-box">
    <section class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img :src="item.worksLink" alt="index" />
        <div class="button">
          <a-button @click="handleDelete(item)">删除</a-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getWorksList, recycleDelete } from '@/api/works';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

const list = ref([])

const getList = () => {
  getWorksList({ delete: 1 }).then(res => {
    list.value = res.data.lists
  })
}

const handleDelete = (item) => {
  Modal.confirm({
    title: '确认从回收站删除该作品？',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确认',
    cancelText: '取消',
    onOk() {
      recycleDelete(item.worksId).then(res => {
        getList()
      })
    }
  });

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
      position: relative;
      overflow: hidden;
      &:hover {
        > .button {
          bottom: 0;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
        position: absolute;
        bottom: -20%;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 15%;
        background: #e7e7e7;
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>