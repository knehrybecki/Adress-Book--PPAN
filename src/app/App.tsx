import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '../lib/styles'
import { LayoutHome, LayoutLogin } from '../features/AdressBook'
import { ErrorPage } from '../lib/components/pages'
import { StartApp } from '../features/AdressBook/StartApp'
import { RoutePath } from '../lib/config'

export const App = () => {
  const { home, login } = RoutePath
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={home} element={<StartApp />} />
          <Route path={login} element={<LayoutLogin />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
