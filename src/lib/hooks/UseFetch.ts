import axios from 'axios'
import { FetchPath, RoutePath } from 'lib/config/config'
import {
  StatusCheck,
  ErrorFromServer,
  FetchTypes,
  SessionType,
  GroupReducerTypes,
  ContactType,
  Contacts,
} from 'lib/types'
import { FetchLogin, LoginTypes } from 'lib/types/login'
import { useDispatch } from 'react-redux'

export const useFetch = () => {
  const BaseUrl: string = import.meta.env.VITE_BASE_URL

  const { Bad, NotConnectedDB } = StatusCheck
  const { LOGGED } = LoginTypes
  const { FETCH_END, FETCH_ERROR_SERVER, FETCH_START, INPUT_ERROR } = FetchTypes
  const { tokenSession } = SessionType
  const {
    INPUT_ERROR_GROUP,
    FLASH_SUCCESS_TEXT,
    FLASH_ERROR_TEXT,
    HAS_ERROR,
    GROUPS,
    CONTACTS,
  } = GroupReducerTypes
  const { IS_VISIBLE } = GroupReducerTypes
  const {
    loginPath,
    checkConnect,
    checkUser,
    createGroup,
    AllGroups,
    saveContactPath,
    allContacts,
    AllContactsTrash,
    deleteContact,
    deleteContactMany,
    editContact,
    allContactsFreeNumbers,
    allContactsGroups,
    groupChange,
  } = FetchPath

  const { adressBookRoute, loginRoute } = RoutePath

  const getToken = sessionStorage.getItem(tokenSession)

  const dispatch = useDispatch()

  const errNetwork = (err) => {
    if (err.code == 'ERR_NETWORK') {
      if (location.pathname === '/') return
      location.pathname = '/'
    }
  }

  const checkConnectToServer = async () => {
    return await axios
      .get(`${BaseUrl}${checkConnect}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const statusServer: string = res.data.statusServer
        const statusDB: string = res.data.statusDB

        if (statusDB === Bad) {
          throw Error
        }

        return { statusServer, statusDB }
      })

      .catch((err) => {
        const statusServer = Bad
        const errMessage: string = err.code

        if (!errMessage) {
          throw Error
        }

        return { statusServer, errMessage }
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
          dispatch({ type: INPUT_ERROR })
          return
        }

        if (res.data.token) {
          dispatch({ type: LOGGED, payload: true })
          sessionStorage.setItem(tokenSession, res.data.token)
          location.pathname = adressBookRoute
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

  const GetkUserFromServ = async () => {
    const { loggedSession, StatusServerSession } = SessionType
    const getStatusServer = sessionStorage.getItem(StatusServerSession)
    const { home } = FetchPath
    const { Unauthorized, LOGGED } = LoginTypes

    return await axios
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
        console.log(err)
        errNetwork(err)
        const errMessage: string = err.response.data

        if (errMessage === Unauthorized) {
          sessionStorage.removeItem(loggedSession)

          if (!getStatusServer) {
            if (location.pathname === loginRoute) return
            if (location.pathname === home) {
              return
            }

            location.pathname = home
          }

          if (getStatusServer) {
            if (location.pathname === loginRoute) {
              return
            }

            location.pathname = loginRoute
          }
        }
      })
  }

  const editGroupFetch = async (
    id: string,
    oldName: string,
    newName: string
  ) => {
    return await axios
      .put(`${BaseUrl}${AllGroups}/${id}`, {
        newName: newName,
        oldName: oldName,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: false })
        dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: INPUT_ERROR_GROUP,
          payload: err.response.data.message,
        })
      })
  }

  const createGroupFetch = (nameGroup: string) => {
    return axios
      .post(`${BaseUrl}${createGroup}`, {
        name: nameGroup,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          dispatch({
            type: INPUT_ERROR_GROUP,
            payload: res.data.error,
          })
          return true
        }
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: false })
        dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
        errNetwork(err)
      })
  }
  const getAllGroups = async () => {
    return await axios
      .get(`${BaseUrl}${AllGroups}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const data = res.data as { id: number; name: string }[]
        if (data) {
          return data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const deleteGroupFromServer = async (id: string, withContacts: boolean) => {
    return await axios
      .delete(`${BaseUrl}${AllGroups}/${id}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
        params: {
          withContacts,
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return true
        }
        if (res.data.message) {
          dispatch({ type: HAS_ERROR, payload: false })
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })
        }
      })
      .catch((err) => {
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
      })
  }

  const saveContact = async (contact: ContactType) => {
    return await axios
      .post(`${BaseUrl}${saveContactPath}`, {
        contact: contact,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        if (res.data.message) {
          dispatch({ type: HAS_ERROR, payload: false })
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })

          return 'good'
        }
        getAllGroups().then((data) => {
          if (!data) return
          dispatch({ type: GROUPS, payload: data })
        })
        getAllContacts().then((data) => {
          if (!data) return
          dispatch({ type: CONTACTS, payload: data })
        })
      })

      .catch((err) => {
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
      })
  }

  const saveContactFromImport = async (contact: ContactType) => {
    return await axios
      .post(`${BaseUrl}${saveContactPath}/import`, {
        contact: contact,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        if (res.data.message) {
          dispatch({ type: HAS_ERROR, payload: false })
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })

          return 'good'
        }
        getAllGroups().then((data) => {
          if (!data) return
          dispatch({ type: GROUPS, payload: data })
        })
        getAllContacts().then((data) => {
          if (!data) return
          dispatch({ type: CONTACTS, payload: data })
        })
      })

      .catch((err) => {
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
      })
  }
  const getAllContacts = async () => {
    return await axios
      .get(`${BaseUrl}${allContacts}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        const data = res.data as {
          firstName: string
          lastName: string
          companyName: string
          positionInCompany: string
          email: string
          phoneMobile: string
          phoneHome: string
          group: string
          groupName: string
        }
        if (data) {
          return data
        }
      })
      .catch((err) => {
        console.log(err)

        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
        errNetwork(err)
      })
  }

  const deleteContactTrash = async (
    id: string,
    oldGroup: string,
    newGroup: string
  ) => {
    return await axios
      .put(`${BaseUrl}${deleteContact}${id}`, {
        id: id,
        oldGroup: oldGroup,
        newGroup: newGroup,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          dispatch({
            type: INPUT_ERROR_GROUP,
            payload: res.data.error,
          })
          return true
        }

        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: false })
        dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })

        getAllGroups().then((data) => {
          if (!data) return
          dispatch({ type: GROUPS, payload: data })
        })
        getAllContacts().then((data) => {
          if (!data) return
          dispatch({ type: CONTACTS, payload: data })
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: INPUT_ERROR_GROUP,
          payload: err.response.data.message,
        })
      })
  }

  const getAllContactsFromTrash = async () => {
    return await axios
      .get(`${BaseUrl}${AllContactsTrash}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        const data = res.data as {
          firstName: string
          lastName: string
          companyName: string
          positionInCompany: string
          email: string
          phoneMobile: string
          phoneHome: string
          group: string
          groupName: string
        }
        if (data) {
          return data
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
      })
  }
  const getPreviewContact = async (id: string) => {
    return await axios
      .post(`${BaseUrl}/preview-contact`, {
        id: id,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        const data = res.data as {
          firstName: string
          lastName: string
          companyName: string
          positionInCompany: string
          email: string
          phoneMobile: string
          phoneHome: string
          group: string
          groupName: string
        }
        if (data) {
          return data
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
        errNetwork(err)
      })
  }

  const editContactFetch = async (contact: ContactType, id: string) => {
    return await axios
      .put(`${BaseUrl}${editContact}${id}`, {
        contact: contact,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        if (res.data.message) {
          dispatch({ type: HAS_ERROR, payload: false })
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })

          return 'good'
        }
        getAllGroups().then((data) => {
          if (!data) return
          dispatch({ type: GROUPS, payload: data })
        })
        getAllContacts().then((data) => {
          if (!data) return
          dispatch({ type: CONTACTS, payload: data })
        })
      })

      .catch((err) => {
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
      })
  }
  const getAllContactsFromFreeNumbers = async () => {
    return await axios
      .get(`${BaseUrl}${allContactsFreeNumbers}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        const data = res.data as {
          firstName: string
          lastName: string
          companyName: string
          positionInCompany: string
          email: string
          phoneMobile: string
          phoneHome: string
          group: string
          groupName: string
        }
        if (data) {
          return data
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
        errNetwork(err)
      })
  }
  const getAllContactsFromGroups = async (selectedGroup: string) => {
    return await axios
      .get(`${BaseUrl}${allContactsGroups}`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
        params: {
          selectedGroup: selectedGroup,
        },
      })

      .then((res) => {
        console.log(res.data)
        const data = res.data as {
          firstName: string
          lastName: string
          companyName: string
          positionInCompany: string
          email: string
          phoneMobile: string
          phoneHome: string
          group: string
          id: string
          groupName: string
        }
        if (data) {
          return data
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: true })

        errNetwork(err)
      })
  }

  const groupChangeGroup = async (contacts: Contacts[], newGroup: string) => {
    return await axios
      .put(`${BaseUrl}${groupChange}`, {
        contacts: contacts,
        newGroup: newGroup,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          return 'error'
        }
        if (res.data.message) {
          dispatch({ type: HAS_ERROR, payload: false })
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })

          return 'good'
        }
        getAllGroups().then((data) => {
          if (!data) return
          dispatch({ type: GROUPS, payload: data })
        })
        getAllContacts().then((data) => {
          if (!data) return
          dispatch({ type: CONTACTS, payload: data })
        })
      })

      .catch((err) => {
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: FLASH_ERROR_TEXT,
          payload: err.response.data.message,
        })
      })
  }

  const deleteManyContactsTrash = async (
    checkedContacts: Contacts[],
    newGroup: string
  ) => {
    return await axios
      .put(`${BaseUrl}${deleteContactMany}`, {
        checkedContacts: checkedContacts,
        newGroup: newGroup,
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: IS_VISIBLE, payload: true })
          dispatch({ type: FLASH_ERROR_TEXT, payload: res.data.error })
          dispatch({ type: HAS_ERROR, payload: true })
          dispatch({
            type: INPUT_ERROR_GROUP,
            payload: res.data.error,
          })
          return true
        }
        console.log('trash')
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({ type: HAS_ERROR, payload: false })
        dispatch({ type: FLASH_SUCCESS_TEXT, payload: res.data.message })

        getAllGroups().then((data) => {
          if (!data) return
          dispatch({ type: GROUPS, payload: data })
        })
        getAllContacts().then((data) => {
          if (!data) return
          dispatch({ type: CONTACTS, payload: data })
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: HAS_ERROR, payload: true })
        dispatch({ type: IS_VISIBLE, payload: true })
        dispatch({
          type: INPUT_ERROR_GROUP,
          payload: err.response.data.message,
        })
      })
  }
  const checkContactsInTrash = async () => {
    return await axios
      .put(`${BaseUrl}/checkContactsInTrash`, {
        headers: {
          Authorization: getToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    checkConnectToServer,
    login,
    GetkUserFromServ,
    createGroupFetch,
    getAllGroups,
    deleteGroupFromServer,
    editGroupFetch,
    saveContact,
    getAllContacts,
    deleteContactTrash,
    getAllContactsFromTrash,
    getPreviewContact,
    editContactFetch,
    getAllContactsFromFreeNumbers,
    getAllContactsFromGroups,
    saveContactFromImport,
    groupChangeGroup,
    deleteManyContactsTrash,
    checkContactsInTrash,
  }
}
