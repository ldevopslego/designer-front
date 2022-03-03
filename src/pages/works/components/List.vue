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
        <img :src="item.worksLink" />
        <div>{{ item.worksName }}</div>
      </div>
    </section>
  </div>
  <div class="loading">
    <a-spin :spinning="loading" size="large" />
  </div>
  <Modal ref="modalRef" @change="getList()"></Modal>
</template>

<script setup lang="ts" >
import Modal from './Modal.vue'
import { getWorksList } from '@/api/works';
const router = useRouter();
const list = ref([])
const modalRef = ref<InstanceType<typeof Modal>>()
const loading = ref(false)
const page = ref(1)
const total = ref(0)

const getList = (param?: any, type?: string) => {
  if (type) {
    if (list.value.length < total.value) {
      loading.value = true
      page.value = page.value + 1
      loading.value = true
      getWorksList({ delete: 0, page: page.value, ...param }).then(res => {
        list.value = list.value.concat(res.data.lists)
        total.value = res.data.total
        loading.value = false
      })
    }
  } else {
    loading.value = true
    getWorksList({ delete: 0, page: page.value, ...param }).then(res => {
      list.value = res.data.lists
      total.value = res.data.total
      loading.value = false
    })
  }
}

const openModal = () => {
  modalRef.value?.show('add')
}

const getHeight = () => {
  return document.getElementsByClassName('list-box')[0].offsetHeight

}

onMounted(() => {
  getList()
})



defineExpose({ getList, getHeight })
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
      text-align: center;
      img {
        border: 1px solid #bbb7b7;
        width: 100%;
        height: 90%;
      }
      div {
        padding: 10px 0;
      }
    }
  }
}

.loading {
  padding: 20px 0;
  text-align: center;
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