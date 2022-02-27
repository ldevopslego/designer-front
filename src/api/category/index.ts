import { get, post, del } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'

const getCategory = async () => get<IResponse>('/api/tags')
const addCategory = async (data: any) => post<IResponse>('/api/tags', data)
const deleteCategory = (id: string) => del<IResponse>(`/api/tags/${id}`)

export { getCategory, addCategory, deleteCategory }
