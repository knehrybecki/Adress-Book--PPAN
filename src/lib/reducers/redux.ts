import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'lib/reducers/loginReducer'
import { sideReducer } from 'lib/reducers/sideReducer'
import { welcomeReducer } from 'lib/reducers/welcomeReducer'
import { homeReducer } from 'lib/reducers/homeReducer'

export type RootState = ReturnType<typeof store.getState>

// export const history = createBrowserHistory();
// const middleware = routerMiddleware(history);

export const store = configureStore({
  reducer: {
    welcome: welcomeReducer,
    login: loginReducer,
    side: sideReducer,
    home: homeReducer,
  },
})
