import axios, { AxiosResponse } from 'axios'
import { RoutePath } from '../../lib/config'
import { pathConnect } from '../../lib/types'

export const useFetch = () => {
  const { checkConnect } = pathConnect
  const BaseUrl: string = import.meta.env.VITE_BASE_URL

  const checkConnectToServer = async () => {
    return await axios
      .get(`${BaseUrl}${checkConnect}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        const status = 'Bad'
        const errMessage: string = err.code

        return { status, errMessage }
      })
  }

  return { checkConnectToServer }
}
