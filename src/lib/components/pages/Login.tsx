import { Dictionary } from '../../../lib/types'
import { RootState } from '../../../lib/reducers'
import { useSelector } from 'react-redux'
import { useFetch } from '../../../lib/hooks/UseFetch'

import styled from 'styled-components'

export type LoginProps = {
  T: Dictionary
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  // const welcome = useSelector((state: RootState) => state.welcome)

  // const { login } = useFetch()
  // const Text = T
  // useEffect(() => {
  //   login()
  // }, [])

  return (
    <Container>
      <Title>Logowanie</Title>
      <BoxInput>
        <InputLogin placeholder='Użytkownik' />
        <InputPassword placeholder='Hasło' />
      </BoxInput>
      <ButtonLogin value={'Zaloguj się'} />
      <Copyright>Copyright © 2023 - Kamil Nehrybecki</Copyright>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Title = styled.div`
  margin: 80px 0;
  font-size: 30px;
  font-weight: 700;
`
const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  row-gap: 40px;
`

const InputLogin = styled.input`
  border-radius: 12px;
  height: 30px;
  border: 3px solid;
  padding-left: 10px;
`
const InputPassword = styled.input`
  border-radius: 12px;
  height: 30px;
  border: 3px solid;
  padding-left: 10px;
`
const ButtonLogin = styled.input`
  margin-top: 100px;
  border-radius: 12px;
  width: 300px;
  height: 40px;
  border: #000;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
`
const Copyright = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 10px;
`
