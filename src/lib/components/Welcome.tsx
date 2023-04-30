import { Images } from '../../assets'
import styled from 'styled-components'
import PuffLoader from 'react-spinners/PuffLoader'
import { useEffect, useRef, useState } from 'react'
import { useFetch } from '../../lib/hooks/UseFetch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/reducers'
import { StatusServer } from '../../lib/types'

export const Welcome = () => {
  const { checkConnectToServer } = useFetch()
  const wasCalled = useRef<boolean>(false)
  const { SET_STATUS_SERVER, SERVER_OK, SERVER_ERROR, SERVER_RECONNECT } =
    StatusServer

  const welcome = useSelector((state: RootState) => state.welcome)
  const { codeError, colorloading, isError, statusServer } = welcome
  const dispatch = useDispatch()

  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    const wait = setTimeout(() => {
      checkConnectToServer().then((data) => {
        dispatch({ type: SET_STATUS_SERVER, payload: data.status })
        if (data.errMessage) {
          dispatch({ type: SERVER_ERROR, payload: data.errMessage })
          return
        }
      })
      clearTimeout(wait)
    }, 2000)
  }, [checkConnectToServer])

  useEffect(() => {
    if (statusServer === 'Good') {
      dispatch({ type: SERVER_OK })
      setTimeout(() => {
        location.pathname = '/login'
      }, 500)
    }

    if (statusServer === 'Bad') {
      dispatch({ type: SERVER_ERROR })
    }
  }, [statusServer])

  const reconnect = () => {
    const reconnect = setInterval(() => {
      checkConnectToServer().then((data) => {
        dispatch({ type: SET_STATUS_SERVER, payload: data.status })

        if (data.errMessage) {
          dispatch({ type: SERVER_ERROR, payload: data.errMessage })
          return
        }
        dispatch({ type: SERVER_RECONNECT })
        clearInterval(reconnect)

        if (!isError) {
          location.pathname = '/login'
        }
      })
    }, 1000)
  }

  return (
    <WelcomeContainer>
      <Container>
        <Img src={Images.logoPpan} alt='Piotruś Pan Logo' />
        <PuffLoader
          color={colorloading}
          cssOverride={{}}
          size={100}
          speedMultiplier={0.5}
        />
        <Error>{isError ? codeError : ''}</Error>
        <> {isError && reconnect()}</>
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
  margin-bottom: 20px;
`
const Error = styled.div`
  width: 100%;
  position: absolute;
  bottom: -80px;
  text-align: center;
  margin-left: 10px;
`
