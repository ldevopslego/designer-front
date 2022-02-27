import { upload } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'

const uploadFile = async (data) => {
  let bodyFormData = new FormData()
  bodyFormData.append('filename', data)
  return upload<IResponse>('upload', bodyFormData)
}

export { uploadFile }
