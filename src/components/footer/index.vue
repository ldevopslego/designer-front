<template>
    <a-layout-footer class="footer">
        <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2022004472号</a>
        <div>Tel:15900733604</div>
        <div>地址：上海市闵行区剑川路600号G202</div>

        <div class="copyright">
            <img src="@/assets/images/copyright.jpg" />
            <a
                target="_blank"
                hrefs="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202014154"
            >沪公网安备 31011202014154号</a>
        </div>
    </a-layout-footer>
</template>

<script setup lang="ts">
import SvgIcon from '@components/SvgIcon/index.vue'
</script>

<style lang="less" scoped>
.footer {
    padding: 0 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
    .copyright {
        display: inline-flex;
        align-items: center;
        img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
