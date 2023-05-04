import axios from 'axios'
import { pathConnect, StatusCheck } from '../../lib/types'

export const useFetch = () => {
  const { Bad, NotConnectedDB } = StatusCheck

  const { checkConnect } = pathConnect
  const BaseUrl: string = import.meta.env.VITE_BASE_URL

  const checkConnectToServer = async () => {
    return await axios
      .get(`${BaseUrl}${checkConnect}`)
      .then((res) => {
        const statusServer: string = res.data.statusServer
        const statusDB: string = res.data.statusDB

        if (statusDB === Bad) {
          throw Error
        }

        return { statusServer, statusDB }
      })

      .catch((err) => {
        console.log(err)
        const status = Bad
        const errMessage: string = err.code

        if (!errMessage) {
          throw Error
        }

        return { status, errMessage }
      })
      .catch(() => {
        const errMessage = NotConnectedDB

        return { errMessage }
      })
  }

  const login = async () => {
    return await axios
      .post(`${BaseUrl}/login`, {
        username: 'admin',
        password: 'admin',
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  return { checkConnectToServer, login }
}
