import { Dictionary, InputType } from 'lib/types'
import { RootState } from 'lib/reducers'
import { useSelector } from 'react-redux'
import { useFetch } from 'lib/hooks/UseFetch'

import styled from 'styled-components'
import { useLogin } from 'lib/hooks/UseLogin'
import { ClipLoader } from 'react-spinners'
import { FormProps } from 'lib/types/form'

export type LoginProps = {
  T: Dictionary
}

export const Login: React.FunctionComponent<LoginProps> = ({ T }) => {
  const logins = useSelector((state: RootState) => state.login)

  const { user, fetchError, isLoading, password } = logins
  const { login } = useFetch()
  const { loginPage } = T
  const { handleSubmit, handleChange } = useLogin()

  return (
    <Container>
      <Title>{loginPage.title}</Title>

      <Form>
        <LoginControl>
          <Label isError={user.isInputError}>
            <Input
              type={InputType.text}
              name={InputType.email}
              autoComplete='true'
              value={user.emailValue}
              maxLength={50}
              minLength={4}
              placeholder={loginPage.user}
              onChange={handleChange}
            />
            <PlaceLabel></PlaceLabel>
          </Label>
          <InputError>{user.inputErrorText}</InputError>
        </LoginControl>
        <PasswordControl>
          <Label isError={password.isInputError}>
            <Input
              type={InputType.password}
              name={InputType.password}
              autoComplete='true'
              value={password.passwordValue}
              maxLength={50}
              minLength={4}
              placeholder={loginPage.password}
              onChange={handleChange}
            />
            <PlaceLabel></PlaceLabel>
          </Label>
          <InputError>{password.inputErrorText}</InputError>
        </PasswordControl>
        {fetchError.isError && <MessageError>{fetchError.text}</MessageError>}
        <ButtonLogin
          onClick={(event) => {
            handleSubmit(event)
            login(event, user.emailValue, password.passwordValue)
          }}
        >
          {isLoading ? (
            loginPage.SignIn
          ) : (
            <ClipLoader color='#fc0000' size={35} speedMultiplier={0.5} />
          )}
        </ButtonLogin>
      </Form>
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
  font-size: ${({ theme }) => theme.title.fontSize};
  font-weight: 700;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  row-gap: 40px;
  position: relative;
`
const LoginControl = styled.div``
const PasswordControl = styled.div``

const PlaceLabel = styled.label`
  position: relative;
  color: #8c8c8c;
  left: 5%;
  top: 50%;
`
const Label = styled.div<FormProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  ::after {
    border-bottom: 3px solid #e87c03;
    content: '';
    display: ${(props) => (props.isError ? 'block' : 'none')};
    position: absolute;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 96%;
    margin: 0 auto;
    bottom: 2px;
  }
`
const Input = styled.input`
  border-radius: 12px;
  height: 30px;
  border: 3px solid;
  padding-left: 10px;
  color: #000;
  width: 350px;
`
const ButtonLogin = styled.button`
  margin-top: 100px;
  border-radius: 12px;
  width: 300px;
  height: 40px;
  border: ${({ theme }) => theme.login.buttonLogin.border};
  background-color: ${({ theme }) => theme.login.buttonLogin.backgroundColor};
  color: ${({ theme }) => theme.login.buttonLogin.color};
  cursor: pointer;
  text-align: center;
  font-weight: 600;
`

const InputError = styled.div`
  font-size: 12px;
  margin-left: 20px;
`
const MessageError = styled.div`
  position: absolute;
  bottom: 100px;
`
