<template>
  <div class="infobox">
    <div class="info"></div>
    <div class="content">
      <a-space>
        <a-tag v-for="(item, index) in list" :key="index">{{ item.catName }}</a-tag>
        <IconPlus :style="{ fontSize: '16px' }" @click="() => visible = true" />
      </a-space>
    </div>
  </div>
  <a-modal v-model:visible="visible">
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item field="name" label="名称" :rules="[{ required: true, message: '不能为空' }]">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button html-type="submit">提交</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { IconPlus, IconCheckCircle } from '@arco-design/web-vue/es/icon';
import { getCategory, addCategory } from '@/api/category';



const list = ref([])
const visible = ref(false)
const form = reactive({ name: '' })

const handleSubmit = async ({ values, errors }) => {
  await addCategory({ catName: values.name, parentId: 1 })
  visible.value = false
  form.name = ''
  await getList()
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

<style lang="less" scoped>
.infobox {
  display: flex;
  .info {
    width: 400px;
  }
  .content {
    flex: 1 1 auto;
    padding: 20px;
  }
}
</style>