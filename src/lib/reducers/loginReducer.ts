import { createAction, createReducer } from '@reduxjs/toolkit'

export const INITIAL_STATE_LOGIN = {
  isLoading: true,
  user: {
    emailValue: '',
    inputErrorText: '',
    isInputError: false,
  },
  password: {
    passwordValue: '',
    inputErrorText: '',
    isInputError: false,
  },
  fetchError: {
    text: '',
    isError: false,
  },
  logged: false,
}

type inputError = {
  inputErrorText: string
  isInputError: boolean
}

const fetchStart = createAction<boolean>('FETCH_START')
const fetchSuccess = createAction<boolean>('FETCH_SUCCESS')
const fetchErrorServer = createAction<string>('FETCH_ERROR_SERVER')
const fetchEnd = createAction<boolean>('FETCH_END')
const inputErrorEmail = createAction<inputError>('INPUT_ERROR_EMAIL')
const inputErrorPassword = createAction<inputError>('INPUT_ERROR_PASSWORD')
const inputValueEmail = createAction<string>('INPUT_VALUE_EMAIL')
const inputValuePassword = createAction<string>('INPUT_VALUE_PASSWORD')
const inputFetchError = createAction<string>('INPUT_ERROR')

const setLogged = createAction<boolean>('SET_LOGGED')

export const loginReducer = createReducer(INITIAL_STATE_LOGIN, (builder) => {
  builder.addCase(fetchStart, (state) => {
    state.isLoading = false
  })
  builder.addCase(fetchSuccess, (state) => {
    state.logged = true
  })
  builder.addCase(fetchErrorServer, (state, action) => {
    state.fetchError.text = action.payload
    state.fetchError.isError = true
  })
  builder.addCase(inputValueEmail, (state, action) => {
    state.user.emailValue = action.payload
  })
  builder.addCase(inputValuePassword, (state, action) => {
    state.password.passwordValue = action.payload
  })
  builder.addCase(inputErrorEmail, (state, action) => {
    state.user.inputErrorText = action.payload.inputErrorText
    state.user.isInputError = action.payload.isInputError
  })
  builder.addCase(inputErrorPassword, (state, action) => {
    state.password.inputErrorText = action.payload.inputErrorText
    state.password.isInputError = action.payload.isInputError
  })
  builder.addCase(fetchEnd, (state) => {
    state.isLoading = true
  })
  builder.addCase(setLogged, (state, action) => {
    state.logged = action.payload
  })
  builder.addCase(inputFetchError, (state, action) => {
    state.user.isInputError = true
    state.password.isInputError = true
  })
})
