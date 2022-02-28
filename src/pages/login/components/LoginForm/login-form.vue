<template>
    <a-form :model="userFormData" class="login-form" layout="vertical" @finish="onFinish">
        <a-form-item
            name="username"
            :rules="[{ required: true, message: '用户名不能为空' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
        >
            <a-input v-model:value="userFormData.username" placeholder="请输入用户名">
                <template #prefix>
                    <!-- <icon-user /> -->
                    <user-outlined type="user" />
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
                    <lock-outlined />
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
                    <audit-outlined />
                </template>
                <template #suffix>
                    <img
                        :src="userFormData.imageUrl"
                        class="login-form-captcha"
                        @click="showCaptcha"
                    />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading" block>登录</a-button>
            <a-button
                type="text"
                block
                class="login-form-register-btn"
                @click="emit('changeMode', false)"
            >注册</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/index';
import useLoading from '@/hooks/loading';
import { getCaptcha } from '@/api/user/index';
import { UserOutlined, LockOutlined, AuditOutlined } from '@ant-design/icons-vue';
import { ComponentInternalInstance } from 'vue';

const router = useRouter();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userStore = useUserStore();
const userFormData = reactive({
    username: 'admin',
    password: 'admin',
    captcha: "",
    captchaId: "",
    imageUrl: "",
});
const emit = defineEmits(["changeMode"])
const { appContext } = getCurrentInstance() as ComponentInternalInstance

const showCaptcha = () => {
    getCaptcha().then(res => {
        userFormData.captchaId = res.data.captchaId
        userFormData.imageUrl = res.data.imageUrl
    })
}

const onFinish = async (values: any) => {
    try {
        const res = await userStore.login({ ...values, ...{ captchaId: userFormData.captchaId } });
        if (res && res.code != 200) {
            appContext.config.globalProperties.$message.error(res.msg);
            showCaptcha()
            userFormData.captcha = ''
        } else {
            router.push('/');
        }
    } catch (err) {
        // proxy.message.error(res.msg);
    } finally {
        setLoading(false);
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
        height: 22px;
        width: 100px;
    }
}

.operate {
    margin-top: 60px;
}
</style>

