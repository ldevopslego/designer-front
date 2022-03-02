<template>
    <div class="container">
        <LoginBanner />
        <div class="content">
            <div class="content-inner">
                <transition name="fade">
                    <LoginForm />
                </transition>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import Footer from '@components/footer/index.vue';
import LoginBanner from './components/banner.vue';
import LoginForm from './components/LoginForm/index.vue';
import logo from '@/assets/icons/svg/logo.svg'

</script>

<style lang="less" scoped>
.container {
    display: flex;
    height: calc(100vh - 40px);

    .banner {
        width: 50%;
        background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding-bottom: 40px;
    }
}

.logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
        margin-right: 4px;
        margin-left: 4px;
        color: var(--color-fill-1);
        font-size: 20px;
    }
}
</style>
