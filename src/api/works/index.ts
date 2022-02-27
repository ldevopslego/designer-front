import { get, post } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'

const getWorksList = async (data) => get<IResponse>('/api/works', data)
const addWorks = async (data: any) => post<IResponse>('/api/works', data)
const getWorksInfo = async (data) => get<IResponse>(`/api/works/${data}`)

export { getWorksList, addWorks, getWorksInfo }
