import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'lib/styles'
import { LayoutHome, LayoutLogin } from 'features/AdressBook'
import { ErrorPage, Login } from 'lib/components/pages'
import { StartApp } from 'features/AdressBook/StartApp'
import { RoutePath } from 'lib/config'
import { PL_pl } from 'lib/locale'
import { Welcome } from 'lib/components/Welcome'
import { RootState } from 'lib/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFetch } from 'lib/hooks'
import { LoginTypes, SessionType } from 'lib/types'

import { AllContacts, CreateContact, PreviewContact } from 'lib/components'

export const App = () => {
  const { home, loginRoute, adressBookRoute } = RoutePath
  const T = PL_pl
  const { logged } = useSelector((state: RootState) => state.login)

  const { GetkUserFromServ } = useFetch()
  const dispatch = useDispatch()
  const { Unauthorized, LOGGED } = LoginTypes
  const { StatusServerSession, loggedSession } = SessionType

  const getStatusServer = sessionStorage.getItem(StatusServerSession)
  const getLoggedUser = sessionStorage.getItem(loggedSession)

  useEffect(() => {
    GetkUserFromServ()
      .then((res) => {
        if (!res) {
          return
        }

        if (res) {
          sessionStorage.setItem(loggedSession, res)
          dispatch({ type: LOGGED, payload: res })

          // if (location.pathname === adressBook) return
          // location.pathname = adressBook
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {

  //   if (getLogged) {
  //     dispatch({ type: 'SET_LOGGED', payload: getLogged })
  //     if (location.pathname === '/AdressBook') return
  //     location.pathname = '/AdressBook'
  //   }
  // }, [getStatusServer, getLogged, dispatch])

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
            {/* <Route index element={<AdressBook />} /> */}
            <Route
              path='/adress-book/create-contact'
              element={<CreateContact />}
            />
            <Route path='/adress-book' element={<AllContacts />} />
            <Route path='/adress-book/kosz' element={<AllContacts />} />
            <Route path='/adress-book/:id' element={<AllContacts />} />
            <Route
              path='/adress-book/person/:id'
              element={<PreviewContact />}
            />
          </Route>
          {/* <Route path='/AdressBook/kosz' element={<LayoutHome />}> */}

          {/* </Route> */}

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
