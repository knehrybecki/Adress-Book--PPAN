import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '../lib/styles'
import { LayoutLogin } from '../features/AdressBook'
import { ErrorPage, Login } from '../lib/components/pages'
import { StartApp } from '../features/AdressBook/StartApp'
import { RoutePath } from '../lib/config'
import { PL_pl } from '../lib/locale'
import { useSelector } from 'react-redux'
import { RootState } from 'lib/reducers'
import { Welcome } from '../lib/components/Welcome'

export const App = () => {
  const { home, login } = RoutePath
  const T = PL_pl

  const welcome = useSelector((state: RootState) => state.welcome)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={home} element={<StartApp T={T} />}>
            <Route index element={<Welcome T={T} />} />
          </Route>
          <Route path={login} element={<LayoutLogin T={T} />}>
            <Route index element={<Login T={T} />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
