import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '../lib/styles'
import { LayoutHome } from '../features/AdressBook/LayoutHome'
import { ErrorPage } from '../lib/components/pages'
import { StartApp } from '../features/AdressBook/StartApp'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<StartApp />}>
            {/* <Route index element={<Home T={T} />} /> */}
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
