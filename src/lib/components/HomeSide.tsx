import styled from 'styled-components'

type HomeSideProps = {
  children: React.ReactNode
}

export const HomeSide = ({ children }: HomeSideProps) => {
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
