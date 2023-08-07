import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../index.css'
import 'material-symbols'
import { Provider } from 'react-redux'
import { appStore } from './state/Store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App /> 
    </Provider>
  </React.StrictMode>,
)
