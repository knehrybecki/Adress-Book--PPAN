import { Images } from 'assets'
import styled from 'styled-components'
import PuffLoader from 'react-spinners/PuffLoader'
import { useEffect, useRef } from 'react'
import { useFetch } from 'lib/hooks/UseFetch'
import { useDispatch, useSelector } from 'react-redux'

import { StatusServer, StatusCheck, Dictionary } from 'lib/types'
import { RoutePath } from 'lib/config'

import { RootState } from 'lib/reducers'

type WelcomeProps = {
  T: Dictionary
}

export const Welcome: React.FunctionComponent<WelcomeProps> = ({ T }) => {
  const wasCalled = useRef<boolean>(false)
  const { codeError, colorloading, isError, statusServer, statusDB } =
    useSelector((state: RootState) => state.welcome)

  const dispatch = useDispatch()

  const { checkConnectToServer } = useFetch()

  const { Bad, Good, errMessageTS, statusDBTS, statusServerTS } = StatusCheck
  const { SET_STATUS_SERVER, SERVER_OK, SERVER_ERROR, SERVER_RECONNECT } =
    StatusServer

  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    const wait = setTimeout(() => {
      checkConnectToServer().then((data) => {
        if (statusDBTS in data && statusServerTS in data) {
          const { statusDB, statusServer } = data
          console.log(data)
          dispatch({
            type: SET_STATUS_SERVER,
            payload: {
              statusServer: statusServer,
              statusDB: statusDB,
            },
          })
        }
        if (errMessageTS in data) {
          if (data.errMessage) {
            dispatch({ type: SERVER_ERROR, payload: data.errMessage })
            return
          }
        }
      })
      clearTimeout(wait)
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkConnectToServer])

  useEffect(() => {
    if (statusServer === Good && statusDB === Good) {
      dispatch({ type: SERVER_OK })
      setTimeout(() => {
        location.pathname = RoutePath.loginRoute
      }, 1000)
    }
    if (statusServer === Good && statusDB === Bad) {
      dispatch({ type: SERVER_ERROR })
    }
    if (statusServer === Bad) {
      dispatch({ type: SERVER_ERROR })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusServer, statusDB])

  const reconnect = () => {
    const reconnect = setInterval(() => {
      checkConnectToServer().then((data) => {
        console.log(data)
        if (statusDBTS in data && statusServerTS in data) {
          const { statusDB, statusServer } = data

          dispatch({
            type: SET_STATUS_SERVER,
            payload: {
              statusServer: statusServer,
              statusDB: statusDB,
            },
          })
        }

        if (errMessageTS in data) {
          if (data.errMessage) {
            dispatch({ type: SERVER_ERROR, payload: data.errMessage })
            return
          }
        }

        dispatch({ type: SERVER_RECONNECT })
        clearInterval(reconnect)

        if (!isError) {
          location.pathname = RoutePath.loginRoute
        }
      })
    }, 1000)
  }

  return (
    <WelcomeContainer>
      <Container>
        <Img src={Images.logoPpan} alt='Piotruś Pan Logo' />
        <Title>{T.welcome.title}</Title>
        <PuffLoader color={colorloading} size={100} speedMultiplier={0.5} />
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

const Title = styled.div`
  font-size: ${({ theme }) => theme.title.fontSize};
  font-weight: 500;
  margin-bottom: 50px;
`
const Img = styled.img`
  width: 250px;
  height: 250px;
`
const Error = styled.div`
  width: 100%;
  position: absolute;
  bottom: -80px;
  text-align: center;
  margin-left: 10px;
`
