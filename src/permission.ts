import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useUserStore } from './store'
import { getToken } from './utils/auth'

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  if (getToken()) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next()
    } else {
      next()
    }
  } else {
    if (['/login', '/'].indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
