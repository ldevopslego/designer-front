<template>
  <div>
    <Header></Header>
    <a-card>
      <a-descriptions title="作品信息">
        <a-descriptions-item label="作品链接" :span="3">
          <img class="workImg" :src="info.worksLink" />
        </a-descriptions-item>
        <a-descriptions-item label="作品标签" :span="3">
          <a-tag v-for="item in info.tags">{{ item.tagName }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="作品名">{{ info.worksName }}</a-descriptions-item>
        <a-descriptions-item label="作品描述">{{ info.remark }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ info.createTime }}</a-descriptions-item>
        <a-descriptions-item label="markdown" :span="3">
          <MarkdownViewer :value="info.worksDescription" />
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-button type="primary" @click="openModal()">修改作品</a-button>
    <a-button type="primary" @click="handleDelete()">删除作品</a-button>
  </div>
  <WorksModal ref="modalRef" @change="getInfo()"></WorksModal>
</template>

<script setup lang="ts">
import { deleteWork, getWorksInfo } from '@/api/works';
import WorksModal from './components/Modal.vue'
import Header from '../info/components/Header.vue'
import MarkdownViewer from '@/components/Markdown/src/MarkdownViewer.vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';

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

const handleDelete = () => {
  console.log(info)
  Modal.confirm({
    title: '确认删除该作品？',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确认',
    cancelText: '取消',
    onOk() {
      deleteWork(info.value.worksId).then(() => {
        history.go(-1)
      })
    }
  });

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