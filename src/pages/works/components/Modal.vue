<template>
  <a-modal
    :style="{ top: '30px' }"
    v-model:visible="visible"
    title="新建作品"
    @ok="handleSubmit"
    :width="800"
  >
    <a-form :model="form" ref="formRef">
      <a-form-item name="worksName" label="作品名" :rules="[{ required: true, message: '作品名不能为空' }]">
        <a-input v-model:value="form.worksName" />
      </a-form-item>
      <a-form-item name="tagId" label="作品分类" :rules="[{ required: true, message: '作品分类不能为空' }]">
        <a-select v-model:value="form.tagId" mode="multiple">
          <a-select-option
            v-for="(item, index) in select"
            :key="index"
            :value="`${item.tagId}`"
          >{{ item.tagName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="worksLink" label="作品图片" :rules="[{ required: true, message: '作品图片不能为空' }]">
        <a-upload
          action="/api/upload"
          v-model:file-list="form.worksLink"
          :headers="{ token: getToken() }"
          :show-upload-list="false"
          list-type="picture-card"
          class="avatar-uploader"
          name="filename"
          :show-file-list="false"
          :custom-request="handleUpload"
        >
          <img v-if="form.worksLink.length > 0" :src="form.worksLink[0].url" alt="avatar" />
          <div v-else>
            <plus-outlined></plus-outlined>
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item name="worksDescription" label="markdown">
        <MarkDown
          v-model:value="form.worksDescription"
          @change="handleChange"
          ref="markDownRef"
          placeholder="这是占位文本"
        ></MarkDown>
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-input v-model:value="form.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">

import { getToken } from '@/utils/auth'
import { getCategory } from '@/api/category';
import { uploadFile } from '@/api/system/upload';
import { addWorks, getWorksInfo } from '@/api/works';
import MarkDown from '@/components/Markdown/src/Markdown.vue';
import { PlusOutlined } from '@ant-design/icons-vue';


const visible = ref(false)
const select = ref([])
const formRef = ref(null)
const valueRef = ref(`
# title

# content
`);


const emit = defineEmits(['change'])

const form = reactive({ worksName: '', tagId: [], worksLink: [], worksDescription: '' })

const getSelect = () => {
  getCategory().then(res => {
    select.value = res.data.lists
  })
}


const getQueryVariable = (variable: string) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

const show = (mode: string) => {
  visible.value = true
  getSelect()
  nextTick(() => {
    formRef.value.resetFields();
  })
  if (mode === 'edit') {
    getWorksInfo(getQueryVariable('id')).then(res => {
      for (let i in res.data) {
        if (i !== 'worksLink') {
          form[i] = res.data[i]
        } else {
          form.worksLink = [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: res.data.worksLink,
            }]
        }
      }
    })
  }
}

const handleUpload = (options) => {
  const { file } = options
  uploadFile(file).then(res => {
    form.worksLink = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: res.data.url,
      }]
  })
}

const handleChange = (v: string) => {
  valueRef.value = v;
}

const handleSubmit = async () => {
  const value = await formRef.value.validateFields()
  const data = JSON.parse(JSON.stringify(value))
  data.worksLink = form.worksLink[0].url
  data.worksType = 1
  data.isOpen = 1
  data.tagId = form.tagId.join(',')
  await addWorks(data)
  visible.value = false
  emit("change")
}

defineExpose({ show })
</script>

<style  lang="less" scoped>
.avatar-uploader {
  :deep(.ant-upload.ant-upload-select-picture-card) {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>