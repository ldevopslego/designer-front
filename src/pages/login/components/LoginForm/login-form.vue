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
            <a-input v-model="userFormData.username" placeholder="saodimangseng">
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
            <a-input-password v-model="userFormData.password" allow-clear>
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
            <a-input v-model="userFormData.captcha" allow-clear>
                <template #prefix>
                    <icon-lock />
                </template>
                <template #suffix>
                    <img :src="userFormData.imageUrl" class="login-form-captcha" />
                </template>
            </a-input>
        </a-form-item>
        <a-space :size="16" direction="vertical">
            <a-button type="primary" html-type="submit" long :loading="loading">登录</a-button>
            <a-button
                type="text"
                long
                class="login-form-register-btn"
                @click="emit('changeMode', false)"
            >注册</a-button>
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
import { getCaptcha } from '@/api/user/index';

const router = useRouter();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userStore = useUserStore();
const userFormData = reactive({
    username: 'admin',
    password: 'admin',
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
            const res = await userStore.login({ ...values, ...{ captchaId: userFormData.captchaId } });
            if (res && res.code != 200) {
                Message.error(res.msg);
                showCaptcha()
                userFormData.captcha = ''
            } else {
                router.push('/');
            }
        } catch (err) {
            errorMessage.value = (err as Error).message;
        } finally {
            setLoading(false);
        }
    }
};


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

