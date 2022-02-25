<template>
  <div class="list-box">
    <a-button type="primary" @click="visible = true">添加作品</a-button>
    <section class="list">
      <div class="item" v-for="(item, index) in 50" :key="index">
        <img src="@/assets/images/photo.png" alt="index" />
      </div>
    </section>
  </div>
  <a-modal v-model:visible="visible" @before-ok="handleSubmit">
    <a-form :model="form" ref="modalForm">
      <a-form-item field="worksName" label="作品名" :rules="[{ required: true, message: '作品名不能为空' }]">
        <a-input v-model="form.worksName" />
      </a-form-item>
      <a-form-item field="catId" label="作品分类" :rules="[{ required: true, message: '作品分类不能为空' }]">
        <a-select v-model="form.catId">
          <a-option
            v-for="(item, index) in select"
            :key="index"
            :value="item.catId"
          >{{ item.catName }}</a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        field="worksLink"
        label="作品图片"
        :rules="[{ required: true, message: '作品图片不能为空' }]"
      >
        <a-upload
          action="/api/upload"
          :file-list="[form.worksLink]"
          :headers="{ token: getToken() }"
          name="image"
          :show-file-list="false"
          @change="onChange"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${form.worksLink && form.worksLink.status === 'error' ? ' arco-upload-list-item-error' : ''
              }`"
            >
              <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="form.worksLink && form.worksLink.url"
              >
                <img :src="form.worksLink.url" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="form.worksLink.status === 'uploading' && form.worksLink.percent < 100"
                  :percent="form.worksLink.percent"
                  type="circle"
                  size="mini"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }"
                />
              </div>
              <div class="arco-upload-picture-card" v-else>
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="margin-top: 10px; font-weight: 600">上传</div>
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </a-form-item>
      <a-form-item field="remark" label="备注" :rules="[{ required: true, message: '备注不能为空' }]">
        <a-input v-model="form.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts" >
import { getCategory } from '@/api/category';
import { IconPlus, IconEdit } from '@arco-design/web-vue/es/icon';
import { getToken } from '@/utils/auth'
import { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
import { addWorks } from '@/api/works';
import { stringify } from 'querystring';
import { FormInstance } from '@arco-design/web-vue/es/form';

const form = reactive({ worksName: '', catId: '', worksLink: {}, remark: '' })
const modalForm = ref<FormInstance>(null)
const list = ref([])
const visible = ref(false)
const select = ref([])

const handleSubmit = async (done: (close: boolean) => void) => {
  const res = await modalForm.value.validate()
  if (!res) {
    const data = JSON.parse(JSON.stringify(form))
    data.worksLink = form.worksLink.response.data.url
    await addWorks(data)
    done(true)
    await getList()
  } else {
    done(false)
  }
}

const getList = () => {
  getCategory().then(res => {
    select.value = res.data.lists
  })
}

const onChange = (_, currentFile) => {
  console.log(currentFile)
  form.worksLink = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 0 20px;
    margin-top: 10px;
    .item {
      height: 350px;
      img {
        width: 100%;
        height: 90%;
      }
    }
  }
}
</style>