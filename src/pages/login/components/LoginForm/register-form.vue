<template>
  <a-form
    ref="loginForm"
    :model="userFormData"
    class="login-form"
    layout="vertical"
    @submit="handleSubmit"
  >
    <a-form-item
      field="username"
      :rules="[{ required: true, message: '用户名不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input v-model="userFormData.username" placeholder="请输入用户名">
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      field="nickname"
      :rules="[{ required: true, message: '昵称不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input v-model="userFormData.nickname" placeholder="请输入昵称">
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      field="password"
      :rules="[{ required: true, message: '密码不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input-password v-model="userFormData.password" allow-clear placeholder="请输入密码">
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item
      field="confirmPassword"
      :rules="[{ validator: confirmPassword }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input-password v-model="userFormData.confirmPassword" allow-clear placeholder="请输入确认密码">
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item
      field="captcha"
      :rules="[{ required: true, message: '验证码不能为空' }]"
      :validate-trigger="['change', 'blur']"
      hide-label
    >
      <a-input v-model="userFormData.captcha" allow-clear placeholder="请输入验证码">
        <template #prefix>
          <icon-lock />
        </template>
        <template #suffix>
          <img :src="userFormData.imageUrl" class="login-form-captcha" />
        </template>
      </a-input>
    </a-form-item>
    <a-space :size="16" direction="vertical">
      <a-button type="primary" html-type="submit" long :loading="loading">注册</a-button>
    </a-space>
  </a-form>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useUserStore } from '@/store/index';
import useLoading from '@/hooks/loading';
import { ReqParams } from '@/api/user/types';
import { getCaptcha, register } from '@/api/user/index';

const router = useRouter();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userStore = useUserStore();
const userFormData = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  captcha: '',
  captchaId: "",
  imageUrl: "",
});
const emit = defineEmits(["changeMode"])

const showCaptcha = () => {
  getCaptcha().then(res => {
    console.log(res)
    userFormData.captchaId = res.data.captchaId
    userFormData.imageUrl = res.data.imageUrl
  })
}

const handleSubmit = async ({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined;
  values: ReqParams;
}) => {
  if (!errors) {
    setLoading(true);
    try {
      const res = await register({ ...values, ...{ captchaId: userFormData.captchaId } });
      if (res && res.code != 200) {
        Message.error(res.msg);
        showCaptcha()
        userFormData.captcha = ''
      } else {
        emit('changeMode', true)
      }
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  }
};

const confirmPassword = (value: any, callback: (error: any) => void) => {
  if (!value) {
    callback('确认密码不能为空')
  } else if (value !== '' && value !== userFormData.password) {
    callback('密码和确认密码不一致')
  } else {
    callback('')
  }
}

onMounted(() => {
  showCaptcha()
})
</script>


<style lang="less" scoped>
.login-form {
  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-captcha {
    height: 100%;
    width: 100px;
  }
}

.operate {
  margin-top: 60px;
}
</style>

