<template>
  <div class="list-box">
    <a-button type="primary" @click="openModal()">添加作品</a-button>
    <section class="list">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="router.push(`/works/id?id=${item.worksId}`)"
      >
        <img :src="item.worksLink" alt="index" />
      </div>
    </section>
  </div>
  <Modal ref="modalRef"></Modal>
</template>

<script setup lang="ts" >
import Modal from './Modal.vue'
import { getWorksList } from '@/api/works';

const router = useRouter();
const list = ref([])
const modalRef = ref<InstanceType<typeof Modal>>()



const getList = (param) => {
  getWorksList({ delete: 0, ...param }).then(res => {
    list.value = res.data.lists
  })
}

const openModal = () => {
  modalRef.value?.show('add')
}


onMounted(() => {
  getList()
})

defineExpose({ getList })
</script>


<style lang="less" scoped>
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

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>