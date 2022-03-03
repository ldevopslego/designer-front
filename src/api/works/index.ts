import { addSign, del, get, post, put } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'

const getWorksList = async (data) => get<IResponse>('/api/works', addSign(data))
const addWorks = async (data: any) => post<IResponse>('/api/works', data)
const editWorks = async (data: any) => put<IResponse>('/api/works', data)
const getWorksInfo = async (data) => get<IResponse>(`/api/works/${data}`, addSign())
const deleteWork = async (data) => del<IResponse>(`/api/works/${data}`)

const recycleDelete = async (data) => del<IResponse>(`/api/works/true/${data}`)
const recoveryWork = async (data) => put(`/api/works/recover/${data}`)

export { getWorksList, addWorks, editWorks, getWorksInfo, deleteWork, recycleDelete, recoveryWork }
