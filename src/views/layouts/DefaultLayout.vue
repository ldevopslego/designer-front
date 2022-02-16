<template>
  <div >
    <!-- <img alt="Vue logo" src="@/assets/logo.png">   -->
    <body class="header_full_true kalles-template css_scrollbar lazy_icons btnt4_style_2 zoom_tp_2 css_scrollbar template-index kalles_toolbar_true hover_img2 swatch_style_rounded swatch_list_size_small label_style_rounded wrapper_full_width header_full_true header_sticky_true hide_scrolld_true des_header_3 h_banner_true top_bar_true prs_bordered_grid_1 search_pos_canvas lazyload">
    <div id="nt_wrapper">
    <NavBar msg="Welcome to Your Vue.js App"/>

    <Footer msg="Welcome to Your Vue.js App"/>
    </div>
    </body>
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
