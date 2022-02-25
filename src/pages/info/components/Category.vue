<template>
  <a-space>
    <a-tag v-for="(item, index) in list" :key="index">{{ item.catName }}</a-tag>
    <IconPlus :style="{ fontSize: '16px' }" @click="() => visible = true" />
  </a-space>
  <a-modal v-model:visible="visible" @before-ok="handleSubmit">
    <a-form :model="form" ref="modalForm">
      <a-form-item field="name" label="分类名称" :rules="[{ required: true, message: '不能为空' }]">
        <a-input v-model="form.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { IconPlus, IconCheckCircle } from '@arco-design/web-vue/es/icon';
import { getCategory, addCategory } from '@/api/category';
import { FormInstance } from '@arco-design/web-vue/es/form';

const list = ref([])
const visible = ref(false)
const form = reactive({ name: '' })
const modalForm = ref<FormInstance>(null)
const handleSubmit = async (done: (close: boolean) => void) => {
  const res = await modalForm.value.validate()
  if (!res) {
    await addCategory({ catName: form.name, parentId: 1 })
    done(true)
    form.name = ''
    await getList()
  } else {
    done(false)
  }
}

const getList = () => {
  getCategory().then(res => {
    list.value = res.data.lists
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>