<template>
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

<script setup lang="ts">
import { editUserProfile, getUserProfile } from '@/api/user';
import type { FormInstance } from 'ant-design-vue';

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

const visible = ref(false)
const form = ref(defaultInfo)
const formRef = ref<FormInstance>()



const show = async () => {
  const res = await getInfo()
  console.log(res)
  if (res) {
    form.value = res
    visible.value = true
  }
}

const getInfo = () => {
  return getUserProfile(localStorage.getItem('userId')).then(res => {
    return res.data
  })
}

const handleSubmit = async () => {
  const res = await formRef.value?.validateFields()
  await editUserProfile(res)
  visible.value = false
}

defineExpose({
  show
})
</script>

<style scoped>
</style>