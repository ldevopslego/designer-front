// 权限问题后期增加
import { get, post } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './types'
import { UserState } from '@/store/modules/user/types'
// import axios from 'axios';
enum URL {
  captcha = '/captcha',
  login = '/auth/login',
  logout = '/user/logout',
  profile = '/user/profile',
}
interface LoginRes {
  token: string
}

export interface LoginData {
  username: string
  password: string
}

const getCaptcha = async () => get<IResponse>(URL.captcha)
const getUserProfile = async () => get<IResponse>(URL.profile)
const login = async (data: LoginData) => post<IResponse>(URL.login, data)
const logout = async () => post<LoginRes>(URL.logout)

export { getUserProfile, logout, login, getCaptcha }
