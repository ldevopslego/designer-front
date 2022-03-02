<template>
  <a-form :model="userFormData" class="register-form" layout="vertical" @finish="onFinish">
    <a-form-item
      name="username"
      :rules="[{ required: true, message: '用户名不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input v-model:value="userFormData.username" placeholder="请输入用户名">
        <template #prefix>
          <!-- <icon-user /> -->
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      name="nickname"
      :rules="[{ required: true, message: '昵称不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input v-model:value="userFormData.nickname" placeholder="请输入昵称">
        <template #prefix>
          <!-- <icon-user /> -->
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      name="password"
      :rules="[{ required: true, message: '密码不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input-password v-model:value="userFormData.password" allow-clear placeholder="请输入密码">
        <template #prefix>
          <!-- <icon-lock /> -->
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item
      name="confirmPassword"
      :rules="[{ validator: confirmPassword }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input-password
        v-model:value="userFormData.confirmPassword"
        allow-clear
        placeholder="请输入确认密码"
      >
        <template #prefix>
          <!-- <icon-lock /> -->
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item
      name="captcha"
      :rules="[{ required: true, message: '验证码不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input v-model:value="userFormData.captcha" allow-clear placeholder="请输入验证码">
        <template #prefix>
          <!-- <icon-lock /> -->
        </template>
        <template #suffix>
          <img :src="userFormData.imageUrl" class="register-form-captcha" />
        </template>
      </a-input>
    </a-form-item>
    <a-button type="primary" html-type="submit" long :loading="loading" block>注册</a-button>
  </a-form>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/index';
import useLoading from '@/hooks/loading';
import { ReqParams } from '@/api/user/types';
import { getCaptcha, register } from '@/api/user/index';
import { ComponentInternalInstance } from 'vue';

const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userFormData = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  captchaId: "",
  imageUrl: "",
});
const { appContext } = getCurrentInstance() as ComponentInternalInstance
const emit = defineEmits(["changeMode"])

const showCaptcha = () => {
  getCaptcha().then(res => {
    console.log(res)
    userFormData.captchaId = res.data.captchaId
    userFormData.imageUrl = res.data.imageUrl
  })
}

const onFinish = async (values: any) => {
  try {
    const res = await register({ ...values, ...{ captchaId: userFormData.captchaId } });
    if (res && res.code != 200) {
      appContext.config.globalProperties.$message.error(res.msg);
      showCaptcha()
      userFormData.captcha = ''
    } else {
      emit('changeMode', true)
    }
  } catch (err) {
    // errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
}

const confirmPassword = (rule: any, value: any, callback: (error?: any) => void) => {
  console.log(value)
  if (!value) {
    callback('确认密码不能为空')
  } else if (value !== '' && value !== userFormData.password) {
    callback('密码和确认密码不一致')
  } else {
    callback()
  }
}

onMounted(() => {
  showCaptcha()
})
</script>


<style lang="less" scoped>
.register-form {
  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-captcha {
    height: 22px;
    width: 100px;
  }
}

.operate {
  margin-top: 60px;
}
</style>

