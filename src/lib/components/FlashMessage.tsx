import { ErrorIcon, Success } from 'assets/svg'
import { RootState } from 'lib/reducers'
import { GroupReducerTypes } from 'lib/types'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

type FlashProps = { hasError: boolean }

export const FlashMessage = () => {
  const { flashSuccessText, isVisible, hasError, flashErrorText } = useSelector(
    (state: RootState) => state.side
  )
  const { IS_VISIBLE } = GroupReducerTypes

  const nodeRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: IS_VISIBLE, payload: false })
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [IS_VISIBLE, dispatch, isVisible])

  return (
    <>
      <CSSTransition
        in={isVisible}
        timeout={2000}
        classNames='slide'
        unmountOnExit
        nodeRef={nodeRef}
      >
        <CotainerSucces ref={nodeRef} hasError={hasError}>
          <Box>
            {hasError ? <ErrorIcon /> : <Success />}
            <Text>
              {hasError ? <Title> Error</Title> : <Title>Success</Title>}
              {hasError ? (
                <SuccessText>{flashErrorText}</SuccessText>
              ) : (
                <SuccessText>{flashSuccessText}</SuccessText>
              )}
            </Text>
            <CloseButton
              onClick={() => {
                dispatch({ type: IS_VISIBLE, payload: false })
              }}
            >
              Zamknij
            </CloseButton>
          </Box>
        </CotainerSucces>
      </CSSTransition>
    </>
  )
}

const CotainerSucces = styled.div<FlashProps>`
  position: absolute;
  bottom: -70px;
  right: 50%;
  width: 400px;
  transform: translateX(50%);
  z-index: 99999;
  border-left: ${({ hasError }) =>
    hasError ? '5px solid #ff5c5c' : '5px solid #32bea6'};
  border-radius: 5px;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  background-color: #fff;

  &.slide-enter {
    bottom: -70px;
  }
  &.slide-enter-active {
    bottom: 2px;
    transition: bottom 1s ease-in-out;
  }
  &.slide-exit {
    bottom: 2px;
  }
  &.slide-exit-active {
    bottom: -70px;
    transition: bottom 1s ease-in-out;
  }
`

const SuccessText = styled.div`
  font-size: 14px;
  color: #b9bfc4;
`
const Box = styled.div`
  width: 310px;
  display: flex;
  align-items: center;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Title = styled.div`
  font-size: 20px;
  color: #4b5057;
`
const CloseButton = styled.div`
  position: absolute;
  right: 0;
  padding: 14.5px;
  top: 0;
  border-left: 1px solid #d9dbdd;
  color: #b9bfc4;
  &:hover {
    cursor: pointer;
    color: #000;
  }
`
