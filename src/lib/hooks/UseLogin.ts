import { PL_pl } from 'lib/locale'
import { RootState } from 'lib/reducers'
import { FormInputValueLength, FormTypes, InputName } from 'lib/types'
import { useDispatch, useSelector } from 'react-redux'

export type EnumInputError = {
  emptyText: string
  enterEmail: string
  vaildEmail: string
  enterPassword: string
}

export const useLogin = () => {
  const T = PL_pl
  const { user, password } = useSelector((state: RootState) => state.login)

  const dispatch = useDispatch()

  const InputError = {
    emptyText: '',
    enterEmail: 'Wpisz Login',
    enterPassword: 'Wpisz Hasło',
  }

  const {
    INPUT_ERROR_EMAIL,
    INPUT_ERROR_PASSWORD,
    INPUT_VALUE_EMAIL,
    INPUT_VALUE_PASSWORD,
  } = FormTypes

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    user.emailValue.length === FormInputValueLength.empty &&
      dispatch({
        type: INPUT_ERROR_EMAIL,
        payload: {
          inputErrorText: InputError.enterEmail,
          isInputError: true,
        },
      })
    user.emailValue.length > FormInputValueLength.empty &&
      dispatch({
        type: INPUT_ERROR_EMAIL,
        payload: {
          inputErrorText: InputError.emptyText,
          isInputError: false,
        },
      })

    password.passwordValue.length === FormInputValueLength.empty &&
      dispatch({
        type: INPUT_ERROR_PASSWORD,
        payload: {
          inputErrorText: InputError.enterPassword,
          isInputError: true,
        },
      })
    password.passwordValue.length > FormInputValueLength.empty &&
      dispatch({
        type: INPUT_ERROR_PASSWORD,
        payload: {
          inputErrorText: InputError.emptyText,
          isInputError: false,
        },
      })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    if (name === InputName.email) {
      value.length >= FormInputValueLength.empty &&
        dispatch({ type: INPUT_VALUE_EMAIL, payload: value })
    }

    if (name === InputName.password) {
      value.length >= FormInputValueLength.empty &&
        dispatch({ type: INPUT_VALUE_PASSWORD, payload: value })
    }
  }

  return {
    handleSubmit,
    handleChange,
  }
}
