import { createAction, createReducer } from '@reduxjs/toolkit'

export const INITIAL_STATE_WELCOME = {
  statusServer: '',
  statusDB: '',
  colorloading: '#000',
  isError: false,
  codeError: '',
}

type CheckStatusServer = {
  statusServer: string
  statusDB: string
}

const setStatusServer = createAction<CheckStatusServer>('SET_STATUS_SERVER')
const ServerOK = createAction<string>('SERVER_OK')
const ServerError = createAction<string>('SERVER_ERROR')
const ServerReconnect = createAction<boolean>('SERVER_RECONNECT')

export const welcomeReducer = createReducer(
  INITIAL_STATE_WELCOME,
  (builder) => {
    builder.addCase(setStatusServer, (state, action) => {
      const { statusServer, statusDB } = action.payload

      state.statusServer = statusServer
      state.statusDB = statusDB
    })
    builder.addCase(ServerOK, (state) => {
      state.colorloading = '#0dff00'
      sessionStorage.setItem('StatusServer', 'Good')
    })
    builder.addCase(ServerError, (state, action) => {
      state.isError = true
      state.codeError = action.payload
      state.colorloading = '#ff0000'
    })
    builder.addCase(ServerReconnect, (state) => {
      state.isError = false
    })
  }
)
