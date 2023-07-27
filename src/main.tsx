import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import './index.css'
import './print.css'
import './reset.css'
import { Provider } from 'react-redux'
import { store } from './lib/reducers/redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
