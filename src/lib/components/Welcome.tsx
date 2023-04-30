import { Images } from '../../assets'
import styled from 'styled-components'
import PuffLoader from 'react-spinners/PuffLoader'
import { useEffect } from 'react'

export const Welcome = () => {
  return (
    <WelcomeContainer>
      <Container>
        <Img src={Images.logoPpan} alt='Piotruś Pan Logo' />
        <PuffLoader
          color='#E30613'
          cssOverride={{}}
          size={100}
          speedMultiplier={0.5}
        />
      </Container>
    </WelcomeContainer>
  )
}

const WelcomeContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-color: ${({ theme }) => theme.LoadApp.Background}; */
`
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`
const Img = styled.img`
  width: 250px;
  height: 250px;
`
