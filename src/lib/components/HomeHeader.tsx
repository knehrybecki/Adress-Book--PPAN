import { Images } from 'assets'
import { PL_pl } from 'lib/locale'
import styled from 'styled-components'

export const HomeHeader = () => {
  const T = PL_pl
  const { loginPage } = T

  const ChangeTitle = () => {
    // switch (location.pathname)
  }

  return (
    <Container>
      <Header>
        <Img src={Images.logoPpan} alt='Piotruś Pan Logo' />
        <Title>{loginPage.HeaderTitle}</Title>
      </Header>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Header = styled.div`
  height: 70px;
  background-color: ${({ theme }) => theme.header.backgroundHeader};
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    height: 150px;
    flex-direction: column;
    justify-content: center;
  }
`
const Title = styled.div`
  color: ${({ theme }) => theme.header.colorHeader};
  font-weight: 500;
  font-size: ${({ theme }) => theme.title.fontSize};
  text-align: center;
  position: absolute;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    margin-top: 10px;
    position: relative;
  }
`
const Img = styled.img`
  width: 80px;
  margin-left: 20px;
`
