import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'lib/reducers/loginReducer'
import { welcomeReducer } from 'lib/reducers/welcomeReducer'

export type RootState = ReturnType<typeof store.getState>

// export const history = createBrowserHistory();
// const middleware = routerMiddleware(history);

export const store = configureStore({
  reducer: {
    welcome: welcomeReducer,
    login: loginReducer,
  },
})
