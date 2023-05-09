import styled from 'styled-components'

export const HomeSide = ({ children }) => {
  return (
    <Container>
      <>{children}</>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 90vh;
`
