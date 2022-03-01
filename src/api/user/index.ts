// 权限问题后期增加
import { addSign, get, post, put } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './types'
import { UserState } from '@/store/modules/user/types'
// import axios from 'axios';
enum URL {
  captcha = '/captcha',
  login = '/auth/login',
  logout = '/user/logout',
  profile = '/auth',
  register = '/auth/register',
  editProfile = '/auth/edit',
}
interface LoginRes {
  token: string
}

export interface LoginData {
  username: string
  password: string
}

const getCaptcha = async () => get<IResponse>(URL.captcha)
const getUserProfile = async (id) => get<IResponse>(`${URL.profile}/${id}`, addSign())
const editUserProfile = async (data) => put<IResponse>(`${URL.editProfile}`, data)
const login = async (data: LoginData) => post<IResponse>(URL.login, data)
const logout = async () => post<LoginRes>(URL.logout)
const register = async (data: any) => post<IResponse>(URL.register, data)

export { getUserProfile, logout, login, getCaptcha, register, editUserProfile }
