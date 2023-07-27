import { RoutePath } from 'lib/config'
import { PL_pl } from 'lib/locale'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ErrorPage = () => {
  const { errorPage } = PL_pl
  const { adressBookRoute } = RoutePath
  return (
    <Container>
      <ErrorPages>{errorPage.title}</ErrorPages>
      <Back>
        <Link to={adressBookRoute}>{errorPage.link}</Link>
      </Back>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`
const ErrorPages = styled.div`
  font-size: 50px;
  font-weight: 700;
`
const Back = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  :hover {
    background-color: #000;
    color: #fff;
  }
`
