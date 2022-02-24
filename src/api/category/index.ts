import { get, post } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'

const getCategory = async () => get<IResponse>('/api/category')
const addCategory = async (data: any) => post<IResponse>('/api/category', data)

export { getCategory, addCategory }
