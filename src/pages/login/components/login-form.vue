<template>
    <div class="login-form-wrapper">
        <div class="login-form-title">
            <span>初笺</span>
            <span>CHU JIAN</span>
        </div>
        <div class="login-form-sub-title">———创意社区一体化平台</div>
        <div class="login-form-error-msg">{{ errorMessage }}</div>
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
                <!-- <div class="login-form-password-actions">
                    <a-checkbox checked="rememberPassword" @change="setRememberPassword">记住密码</a-checkbox>
                    <a-link>忘记密码</a-link>
                </div>-->
                <a-button type="primary" html-type="submit" long :loading="loading">登录</a-button>
                <a-button type="text" long class="login-form-register-btn">注册</a-button>
            </a-space>
        </a-form>
    </div>
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
                Message.success('欢迎使用');
                router.push('/');
                userStore.info()
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
    &-wrapper {
        width: 320px;
    }

    &-title {
        color: rgba(254, 99, 47, 1);
        display: flex;
        justify-content: space-around;
        font-weight: 500;
        font-size: 40px;
        line-height: 40px;
    }

    &-sub-title {
        text-align: right;
        font-size: 16px;
        line-height: 24px;
    }

    &-error-msg {
        height: 32px;
        line-height: 32px;
    }

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
