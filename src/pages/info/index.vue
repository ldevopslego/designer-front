<template>
  <div class="info">
    <div class="image">
      <img src="@/assets/images/login-banner.png" />
    </div>
    <div class="name">用户Id：{{ info.userId }}</div>
    <div class="name">用户名：{{ info.username }}</div>
    <div class="name">用户昵称：{{ info.nickname }}</div>
    <div class="name">电话：{{ info.phone }}</div>
    <div class="name">邮箱：{{ info.email }}</div>
    <div class="name">省：{{ info.province }}</div>
    <div class="name">市：{{ info.city }}</div>
    <div class="name">区：{{ info.distinct }}</div>
    <div class="name">地址：{{ info.address }}</div>
    <a-button type="primary" @click="openModal()">修改信息</a-button>
  </div>
  <a-modal v-model:visible="visible" title="修改个人信息" @ok="handleSubmit">
    <a-form :model="form" ref="formRef">
      <a-form-item name="username" label="用户名" :rules="[{ required: true, message: '用户名不能为空' }]">
        <a-input v-model:value="form.username" />
      </a-form-item>
      <a-form-item name="nickname" label="昵称" :rules="[{ required: true, message: '昵称不能为空' }]">
        <a-input v-model:value="form.nickname" />
      </a-form-item>
      <a-form-item name="phone" label="电话" :rules="[{ required: true, message: '电话不能为空' }]">
        <a-input v-model:value="form.phone" />
      </a-form-item>
      <a-form-item name="email" label="邮箱" :rules="[{ required: true, message: '邮箱不能为空' }]">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item name="province" label="省" :rules="[{ required: true, message: '省不能为空' }]">
        <a-input v-model:value="form.province" />
      </a-form-item>
      <a-form-item name="city" label="市" :rules="[{ required: true, message: '市不能为空' }]">
        <a-input v-model:value="form.city" />
      </a-form-item>
      <a-form-item name="distinct" label="区" :rules="[{ required: true, message: '区不能为空' }]">
        <a-input v-model:value="form.distinct" />
      </a-form-item>
      <a-form-item name="address" label="地址" :rules="[{ required: true, message: '地址不能为空' }]">
        <a-input v-model:value="form.address" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { editUserProfile, getUserProfile } from '@/api/user';

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
const visible = ref(false)
const form = ref(defaultInfo)
const formRef = ref(null)

const getInfo = () => {
  getUserProfile(localStorage.getItem('userId')).then(res => {
    info.value = res.data
  })
}

const handleSubmit = async () => {
  const res = await formRef.value.validateFields()
  await editUserProfile(res)
  await getInfo()
  visible.value = false
}

const openModal = () => {
  getUserProfile(localStorage.getItem('userId')).then(res => {
    form.value = res.data
    visible.value = true
  })
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="less" scoped>
.info {
  background: rgb(25, 58, 136);
  width: 100%;
  height: 100vh;
  text-align: center;
  color: white;
  padding: 10% 0;
  .image {
    margin: 0 auto;
    height: 200px;
    width: 200px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    line-height: 30px;
  }
}
</style>