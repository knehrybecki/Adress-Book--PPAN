import { Dictionary } from '../../lib/types'
import { Images } from '../../assets'
import styled from 'styled-components'

export type LoginHeaderProps = {
  T: Dictionary
}

export const LoginHeader: React.FunctionComponent<LoginHeaderProps> = ({
  T,
}) => {
  return (
    <Container>
      <Header>
        <Img src={Images.logoPpan} alt='Piotruś Pan Logo' />
        <Title>Książka Adresowa</Title>
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
  height: 120px;
  background-color: #e30613;
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
  color: #fff;
  font-weight: 500;
  font-size: 28px;
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
  width: 150px;
  margin-left: 20px;
`
