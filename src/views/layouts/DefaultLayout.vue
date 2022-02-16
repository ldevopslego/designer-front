<template>
  <div >
    <!-- <img alt="Vue logo" src="@/assets/logo.png">   -->
    <NavBar msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Footer msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import AppMain from '@/views/layouts/components/AppMain.vue'
import NavBar from '@/views/layouts/components/NavBar.vue'
import Footer from '@/views/layouts/components/Footer.vue'

import '@/assets/css/font-icon.min.css'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/reset.css'
import '@/assets/css/defined.css'
import '@/assets/css/base.css'
import '@/assets/css/style.css'
import '@/assets/css/home-decor.css'

export default {
  name: 'Home',
  components: {
    NavBar,
    Footer
    // AppMain
  }
}
</script>
