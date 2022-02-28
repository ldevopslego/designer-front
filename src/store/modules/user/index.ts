import { defineStore } from 'pinia'
import {
  login as userLogin,
  logout as userLogout,
  getUserProfile,
  LoginData,
} from '@/api/user/index'
import { setToken, clearToken } from '@/utils/auth'
import { UserState } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    address: undefined,
    avatar: undefined,
    bgImage: undefined,
    city: undefined,
    country: undefined,
    createTime: undefined,
    distinct: undefined,
    email: undefined,
    nickname: undefined,
    phone: undefined,
    province: undefined,
    sex: undefined,
    state: undefined,
    token: undefined,
    userId: undefined,
    username: undefined,
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'user' : 'admin'
        resolve(this.role)
      })
    },
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    // 重置用户信息
    resetInfo() {
      this.$reset()
    },
    // 获取用户信息
    async info() {
      const res = await getUserProfile()
      this.setInfo(res?.data)
    },
    // 异步登录并存储token
    async login(loginForm: LoginData) {
      const res = await userLogin(loginForm)
      const token = res?.data?.token
      if (token) {
        setToken(token)
        localStorage.setItem('userId', res?.data?.userId)

        this.setInfo(res.data)
      }
      return res
    },
    // Logout
    async logout() {
      await userLogout()
      this.resetInfo()
      clearToken()
      // 路由表重置
      // location.reload();
    },
  },
})
