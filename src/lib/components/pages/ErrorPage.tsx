import styled from 'styled-components'

export const ErrorPage = () => {
  return (
    <Container>
      <ErrorPages>Page not Found !</ErrorPages>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
const ErrorPages = styled.div`
  font-size: 50px;
  font-weight: 700;
`
