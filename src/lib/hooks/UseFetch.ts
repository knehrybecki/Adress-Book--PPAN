import axios from 'axios'
import { RoutePath } from '../../lib/config'

export const useFetch = () => {
  const { home, login } = RoutePath

  const checkConnectToServer = async () => {
    return await axios
      .get('http://127.0.0.1:3000/api/checkConnect')
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
        const status = 'Bad'
        const errMessage = err.code

        return { status, errMessage }
      })
  }

  return { checkConnectToServer }
}
