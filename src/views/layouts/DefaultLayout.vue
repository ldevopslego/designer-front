<template>
  <div >
    <!-- <img alt="Vue logo" src="@/assets/logo.png">   -->
    <body class="header_full_true kalles-template css_scrollbar lazy_icons btnt4_style_2 zoom_tp_2 css_scrollbar template-index kalles_toolbar_true hover_img2 swatch_style_rounded swatch_list_size_small label_style_rounded wrapper_full_width header_full_true header_sticky_true hide_scrolld_true des_header_3 h_banner_true top_bar_true prs_bordered_grid_1 search_pos_canvas lazyload">
    <TopAd msg="Welcome to Your Vue.js App"/>
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
import TopAd from '@/views/layouts/components/TopAd.vue'
import NavBar from '@/views/layouts/components/NavBar.vue'
import Footer from '@/views/layouts/components/Footer.vue'

import '@/assets/css/font-icon.min.css'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/reset.css'
import '@/assets/css/defined.css'
import '@/assets/css/base.css'
import '@/assets/css/style.css'
import '@/assets/css/home-default.css'


import '@/assets/js/jquery-3.5.1.min.js'
import '@/assets/js/jarallax.min.js'
import '@/assets/js/packery.pkgd.min.js'
import '@/assets/js/jquery.hoverIntent.min.js'
import '@/assets/js/magnific-popup.min.js'
import '@/assets/js/flickity.pkgd.min.js'
import '@/assets/js/lazysizes.min.js'
import '@/assets/js/js-cookie.min.js'
import '@/assets/js/jquery.countdown.min.js'
import '@/assets/js/interface.js'


export default {
  name: 'Home',
  components: {
    TopAd,
    NavBar,
    Footer
    // AppMain
  }
}
</script>



