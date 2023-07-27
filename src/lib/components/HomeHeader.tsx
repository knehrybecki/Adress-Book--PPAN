import { Images } from 'assets'
import { RootState } from 'lib/reducers'


import {  useSelector } from 'react-redux'
import styled from 'styled-components'

enum altImg {
  logo = 'Piotruś Pan Logo',
}

export const HomeHeader = () => {
  const { nameSelected,  } = useSelector(
    (state: RootState) => state.side
  )

  return (
    <Container>
      <Header>
        <Img src={Images.logoPpan} alt={altImg.logo} />
        <Title>{nameSelected}</Title>
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
  height: 65px;
  background-color: ${({ theme }) => theme.header.backgroundHeader};
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    height: 120px;
    flex-direction: column;
    justify-content: center;
  }
`
const Title = styled.h1`
  color: ${({ theme }) => theme.header.colorHeader};
  font-weight: bold;
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
