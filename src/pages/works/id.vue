<template>
  <div>
    <a-card>
      <a-descriptions title="作品信息">
        <a-descriptions-item label="作品链接" :span="3">
          <img class="workImg" :src="info.worksLink" />
        </a-descriptions-item>
        <a-descriptions-item label="作品名">{{ info.worksName }}</a-descriptions-item>
        <a-descriptions-item label="作品描述">{{ info.remark }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ info.createTime }}</a-descriptions-item>
        <a-descriptions-item label="markdown" :span="3">
          <MarkdownViewer :value="info.worksDescription" />
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-button type="primary" @click="openModal()">修改信息</a-button>
  </div>
  <Modal ref="modalRef" @change="getInfo()"></Modal>
</template>

<script setup lang="ts">
import { getWorksInfo } from '@/api/works';
import Modal from './components/Modal.vue'
import MarkdownViewer from '@/components/Markdown/src/MarkdownViewer.vue';

const info = ref({})
const modalRef = ref<InstanceType<typeof Modal>>()

const getQueryVariable = (variable: string) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

const getInfo = () => {
  getWorksInfo(getQueryVariable('id')).then(res => {
    info.value = res.data
  })
}

const openModal = () => {
  modalRef.value?.show('edit')
}


onMounted(() => {
  getInfo()
})
</script>

<style scoped lang="less">
.workImg {
  width: 200px;
  height: 200px;
}

.ant-btn {
  margin-top: 20px;
  margin-left: 20px;
}
</style>