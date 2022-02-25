import { get, post } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'

const getWorksList = async () => get<IResponse>('/api/works')
const addWorks = async (data: any) => post<IResponse>('/api/works', data)

export { getWorksList, addWorks }
