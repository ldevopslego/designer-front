<template>
  <div class="list-box">
    <a-button type="primary" @click="openModal">添加作品</a-button>
    <section class="list">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="router.push(`/works/id?id=${item.worksId}`)"
      >
        <img :src="item.worksLink" alt="index" />
      </div>
    </section>
  </div>
  <a-modal v-model:visible="visible" title="新建作品" @ok="handleSubmit" :width="800">
    <a-form :model="form" ref="formRef">
      <a-form-item name="worksName" label="作品名" :rules="[{ required: true, message: '作品名不能为空' }]">
        <a-input v-model:value="form.worksName" />
      </a-form-item>
      <a-form-item name="catId" label="作品分类" :rules="[{ required: true, message: '作品分类不能为空' }]">
        <a-select v-model:value="form.catId">
          <a-select-option
            v-for="(item, index) in select"
            :key="index"
            :value="item.tagId"
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
      <a-form-item name="remark" label="备注" :rules="[{ required: true, message: '备注不能为空' }]">
        <a-input v-model:value="form.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts" >
import { getCategory } from '@/api/category';
import { getToken } from '@/utils/auth'
import { addWorks, getWorksList } from '@/api/works';
import MarkDown from '@/components/Markdown/src/Markdown.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { UploadChangeParam } from 'ant-design-vue';
import { uploadFile } from '@/api/system/upload';

const router = useRouter();
const form = reactive({ worksName: '', catId: '', worksLink: [], worksDescription: '' })
const modalForm = ref<FormInstance>(null)
const list = ref([])
const visible = ref(false)
const select = ref([])
const formRef = ref(null)
const valueRef = ref(`
# title

# content
`);

const handleSubmit = async () => {
  try {
    const value = await formRef.value.validateFields()

    const data = JSON.parse(JSON.stringify(value))
    data.worksLink = form.worksLink[0].url
    data.worksType = 1
    data.isOpen = 1
    await addWorks(data)
    await getList()
  } catch {
  }
}

const getSelect = () => {
  getCategory().then(res => {
    select.value = res.data.lists
  })
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
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

const getList = () => {
  getWorksList().then(res => {
    list.value = res.data.lists
  })
}

const handleChange = (v: string) => {
  valueRef.value = v;
}


const openModal = () => {
  visible.value = true
  getSelect()
}

onMounted(() => {
  getList()
})
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
      border: 1px solid #bbb7b7;
      img {
        width: 100%;
        height: 90%;
      }
    }
  }
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