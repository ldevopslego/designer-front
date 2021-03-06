import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { showMessage } from './status'
import { IResponse, ILogin } from './type'
import { API_BASE_URL } from '@config/constant'
import { clearToken, getToken } from '@/utils/auth'
import md5 from 'md5'

// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // transformRequest: [
  //   function (data) {
  //     //由于使用的 form-data传数据所以要格式化
  //     delete data.Authorization
  //     data = qs.stringify(data)
  //     return data
  //   },
  // ],
})

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.token = `${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else if (response.data && response.data.token) {
    //   localStorage.setItem('app_token', response.data.token)
    // }

    if (response.status === 200) {
      return response.data
    } else {
      showMessage(response.status)
      return response
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      if (response.status === 401) {
        clearToken()
        location.reload()
      }
      return Promise.reject(response.data)
    }
    showMessage('网络连接异常,请稍后再试!')
  },
)

const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return axiosInstance.request<T, T>({
        url: config,
      })
      // throw new Error('请配置正确的请求参数');
    } else {
      return axiosInstance.request<T, T>({
        url: config,
        ...options,
      })
    }
  } else {
    return axiosInstance.request<T, T>(config)
  }
}
export function get<T = any>(url: string, params?: object): Promise<T> {
  return request({ url, method: 'GET', params })
}

export function post<T = any>(url: string, data?: object): Promise<T> {
  return request({ url, method: 'POST', data })
}
export function put<T = any>(url: string, data?: object): Promise<T> {
  return request({ url, method: 'PUT', data })
}

export function del<T = any>(url: string, data?: object): Promise<T> {
  return request({ url, method: 'DELETE', data })
}

export function upload<T = any>(url: string, data?: object): Promise<T> {
  return request({
    url,
    method: 'POST',
    data,
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data', // 文件上传
    },
  })
}

export const addSign = (params) => {
  const timeStamp = Math.round(new Date().getTime() / 1000).toString()
  const secretKey = '78435YUI3275BK92@49357&6729GD'

  let md5Params = `${params ? qs.stringify(params) + '&' : ''}timestamp=${timeStamp}`.replace(
    /\=/g,
    ':',
  )
  console.log(md5Params)
  const sign = md5(`${md5Params}&${secretKey}`)
  return qs.parse(`${md5Params.replace(/\:/g, '=')}&sign=${sign}`)
}

export default request
export type { AxiosInstance, AxiosResponse }
/**
 * @description: 用户登录案例
 * @params {ILogin} params
 * @return {Promise}
 */
// export const login = (params: ILogin): Promise<IResponse> => {
//     return axiosInstance.post('user/login', params).then(res => res.data);
// };
