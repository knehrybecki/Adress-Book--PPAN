import { PL_pl } from 'lib/locale'
import styled from 'styled-components'

export const LoginFooter = () => {
  const T = PL_pl
  const { loginPage } = T
  return (
    <Footer>
      <Copyright>{loginPage.copyright}</Copyright>
    </Footer>
  )
}

const Footer = styled.div`
  height: 140px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Copyright = styled.div`
  position: absolute;
  bottom: 0;
  font-size: ${({ theme }) => theme.login.copyrightFont};
  font-weight: 700;
  margin-bottom: 10px;
`
