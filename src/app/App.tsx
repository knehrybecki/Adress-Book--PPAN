import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'lib/styles'
import { LayoutHome, LayoutLogin } from 'features/AdressBook'
import { ErrorPage, Login } from 'lib/components/pages'
import { StartApp } from 'features/AdressBook/StartApp'
import { RoutePath } from 'lib/config'
import { PL_pl } from 'lib/locale'
import { Welcome } from 'lib/components/Welcome'

import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useFetch } from 'lib/hooks'
import { LoginTypes, SessionType } from 'lib/types'

import { AllContacts, CreateContact, EditContact } from 'lib/components'

export const App = () => {
  const {
    home,
    loginRoute,
    adressBookRoute,
    PreviewContact,
    all,
    createContact,
    idContact,
    editContact,
    trashRoute,
  } = RoutePath
  const T = PL_pl

  const { GetkUserFromServ, checkContactsInTrash } = useFetch()
  const dispatch = useDispatch()
  const { Unauthorized, LOGGED } = LoginTypes
  const { StatusServerSession, loggedSession } = SessionType

  const getStatusServer = sessionStorage.getItem(StatusServerSession)

  const wasCalled = useRef<boolean>(false)
  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    GetkUserFromServ()
      .then((res) => {
        if (!res) {
          return
        }

        if (res) {
          sessionStorage.setItem(loggedSession, res)
          dispatch({ type: LOGGED, payload: res })

          //   if (location.pathname === adressBookRoute) return
          //   location.pathname = home
        }
      })
      .catch((err) => {
        const res = err.response

        if (!res) {
          return
        }

        if (res.data === Unauthorized) {
          sessionStorage.removeItem(loggedSession)

          if (!getStatusServer) {
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

    if (!getStatusServer) {
      if (location.pathname === home) {
        return
      }

      location.pathname = home
    }

    checkContactsInTrash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (getLoggedUser) {
  //     dispatch({ type: 'SET_LOGGED', payload: getLoggedUser })
  //     if (location.pathname === adressBookRoute) return
  //     location.pathname = adressBookRoute
  //   }
  // }, [getStatusServer, getLoggedUser, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={home} element={<StartApp />}>
            <Route index element={<Welcome T={T} />} />
          </Route>

          <Route path={loginRoute} element={<LayoutLogin T={T} />}>
            <Route index element={<Login T={T} />} />
          </Route>

          <Route path={adressBookRoute} element={<LayoutHome />}>
            <Route path={createContact} element={<CreateContact />} />
            <Route path={adressBookRoute} element={<AllContacts />} />
            <Route path={trashRoute} element={<AllContacts />} />
            <Route path={idContact} element={<AllContacts />} />
            <Route path={PreviewContact} element={<PreviewContact />} />
            <Route path={editContact} element={<EditContact />} />
          </Route>
          <Route path={all} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
