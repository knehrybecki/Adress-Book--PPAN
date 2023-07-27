import styled from 'styled-components'

type HomeSideProps = {
  children: React.ReactNode
}

export const HomeSide = ({ children }: HomeSideProps) => {
  const w = window.innerHeight
  return (
    <Container height={w}>
      <>{children}</>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: ${({ height }) => `${height}px`};
  overflow: auto;
`
