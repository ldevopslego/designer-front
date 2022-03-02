<template>
  <Header></Header>
  <div class="info">
    <a-card>
      <!-- <div class="image">
        <img src="@/assets/images/login-banner.png" />
      </div>-->
      <a-descriptions title="用户信息">
        <a-descriptions-item label="用户Id">{{ info.userId }}</a-descriptions-item>
        <a-descriptions-item label="用户名">{{ info.username }}</a-descriptions-item>
        <a-descriptions-item label="用户昵称">{{ info.nickname }}</a-descriptions-item>
        <a-descriptions-item label="电话">{{ info.phone }}</a-descriptions-item>
        <a-descriptions-item label="邮箱">{{ info.email }}</a-descriptions-item>
        <a-descriptions-item label="省">{{ info.province }}</a-descriptions-item>
        <a-descriptions-item label="市">{{ info.city }}</a-descriptions-item>
        <a-descriptions-item label="区">{{ info.distinct }}</a-descriptions-item>
        <a-descriptions-item label="地址">{{ info.address }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-button type="primary" @click="openModal()">修改信息</a-button>
    <Modal ref="modalRef" @change="getInfo"></Modal>
  </div>
</template>

<script lang="ts" setup>
import { getUserProfile } from '@/api/user';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';
const defaultInfo = ({
  "userId": '', // 用户ID
  "username": "", // 用户名
  "nickname": "", // 昵称
  "avatar": "", // 头像
  "bgImage": "", // 背景图片
  "phone": "", // 联系电话
  "email": "", // 邮箱
  "province": "", // 省
  "city": "", // 市
  "distinct": "", // 区
  "address": "", // 详细地址
  "createTime": "", // 创建时间
})
const info = ref(defaultInfo)
const modalRef = ref<InstanceType<typeof Modal>>()
const getInfo = () => {
  getUserProfile(localStorage.getItem('userId')).then(res => {
    info.value = res.data
  })
}
const openModal = () => {
  modalRef.value?.show()
}
onMounted(() => {
  getInfo()
})
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  height: 100vh;
  color: white;
  background: #f0f2f5;
  .image {
    height: 200px;
    width: 200px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ant-btn {
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>