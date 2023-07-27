import { RootState } from 'lib/reducers'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

type PositionProps = {
  top: number
  left: number
  toogle: boolean
}
export const Popper = () => {
  const { positionPopper, textPopper, tooglePopper } = useSelector(
    (state: RootState) => state.popper
  )

  const { top, left } = positionPopper

  const positionTop = top + 30
  const positionLeft = left

  return (
    <Container top={positionTop} left={positionLeft} toogle={tooglePopper}>
      <Box>
        <Text>{textPopper}</Text>
      </Box>
    </Container>
  )
}
const Container = styled.div<PositionProps>`
  position: absolute;
  pointer-events: none;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: 99;
  display: ${({ toogle }) => (toogle ? 'block' : 'none')};
`
const Box = styled.div`
  font-size: 10px;
  background-color: gray;
  padding: 3px 5px;
  min-width: 80px;
  text-align: center;
`
const Text = styled.span`
  color: #fff;
`
