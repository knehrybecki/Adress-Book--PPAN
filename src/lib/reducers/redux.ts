import { configureStore } from '@reduxjs/toolkit'
import { welcomeReducer } from '../../lib/reducers/welcomeReducer'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    welcome: welcomeReducer,
    // login: loginReducer,
  },
})
