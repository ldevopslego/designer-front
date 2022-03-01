<template>
  <a-space>
    <a-checkable-tag
      v-for="(item, index) in list"
      v-model:checked="item.checkable"
      :key="index"
      closable
      @change="e => handleChange(e, item)"
    >
      {{ item.tagName }}
      <close-outlined @click.prevent.stop="handleClose(item)" />
    </a-checkable-tag>
    <plus-outlined :style="{ fontSize: '16px' }" @click="() => visible = true" />
  </a-space>
  <a-modal v-model:visible="visible" title="新建分类" @ok="handleSubmit">
    <a-form :model="form" ref="formRef">
      <a-form-item name="name" label="分类名称" :rules="[{ required: true, message: '不能为空' }]">
        <a-input v-model:value="form.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { getCategory, addCategory, deleteCategory } from '@/api/category';
import { ExclamationCircleOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';

const list = ref([])
const visible = ref(false)
const form = reactive({ name: '' })
const formRef = ref(null)

const emit = defineEmits(['tagChange'])
const handleSubmit = async () => {
  const res = await formRef.value.validateFields()

  await addCategory({ tagName: form.name })
  form.name = ''
  await getList()
  visible.value = false
}

const handleClose = (info) => {
  Modal.confirm({
    title: '确认删除该分类？',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确认',
    cancelText: '取消',
    onOk() {
      deleteCategory(info.tagId).then(res => {
        getList()
      })
    }
  });
}

const handleChange = (e, item) => {

  list.value = list.value.map((ele, index, array) => {
    if (ele.tagId === item.tagId) {
      ele.checkable = e
    }
    return ele
  })
  emit('tagChange', list.value.filter(item => item.checkable).map(ele => ele.tagId))
}

const getList = () => {
  getCategory({ tagId: '' }).then(res => {
    const data = res.data.lists.map(element => {
      element.checkable = false
      return element
    });
    list.value = data
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