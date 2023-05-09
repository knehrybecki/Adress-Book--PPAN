import axios from 'axios'
import { RoutePath } from 'lib/config'
import {
  StatusCheck,
  ErrorFromServer,
  FetchTypes,
  SessionType,
} from 'lib/types'
import { FetchLogin, LoginTypes } from 'lib/types/login'
import { useDispatch } from 'react-redux'

export const useFetch = () => {
  const BaseUrl: string = import.meta.env.VITE_BASE_URL

  const { Bad, NotConnectedDB } = StatusCheck
  const { LOGGED } = LoginTypes
  const { FETCH_END, FETCH_ERROR_SERVER, FETCH_START } = FetchTypes
  const { tokenSession } = SessionType
  const { adressBook, loginPath, checkConnect, checkUser } = RoutePath

  const getToken = sessionStorage.getItem(tokenSession)

  const dispatch = useDispatch()

  const checkConnectToServer = async () => {
    return await axios
      .get(`${BaseUrl}${checkConnect}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res)
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

  const login = async (
    event: React.MouseEvent<HTMLButtonElement>,
    user: string,
    password: string
  ) => {
    event.preventDefault()

    dispatch({ type: FETCH_START })
    return await axios
      .post(`${BaseUrl}${loginPath}`, {
        username: user,
        password: password,
      })
      .then((res: FetchLogin) => {
        if (res.data.error) {
          dispatch({ type: FETCH_ERROR_SERVER, payload: res.data.error })

          return
        }

        if (res.data.token) {
          dispatch({ type: LOGGED, payload: true })
          sessionStorage.setItem(tokenSession, res.data.token)
          location.pathname = adressBook
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: FETCH_ERROR_SERVER,
          payload: ErrorFromServer.somethngWrong,
        })
      })
      .finally(() => {
        dispatch({ type: FETCH_END })
      })
  }

  const GetkUserFromServ = () => {
    const { loggedSession, StatusServerSession } = SessionType
    const getStatusServer = sessionStorage.getItem(StatusServerSession)
    const { home, loginPath } = RoutePath
    const { Unauthorized, LOGGED } = LoginTypes
    return axios
      .get(`${BaseUrl}${checkUser}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const resLogged = res.data

        if (resLogged) {
          dispatch({ type: LOGGED, payload: resLogged })

          return resLogged
        }
      })
      .catch((err) => {
        console.log(err.response)
        const errMessage: string = err.response.data

        if (errMessage === Unauthorized) {
          sessionStorage.removeItem(loggedSession)

          if (!getStatusServer) {
            if (location.pathname === loginPath) return
            if (location.pathname === home) {
              return
            }

            location.pathname = home
          }

          if (getStatusServer) {
            if (location.pathname === loginPath) {
              return
            }

            location.pathname = loginPath
          }
        }
      })
  }
  return { checkConnectToServer, login, GetkUserFromServ }
}
