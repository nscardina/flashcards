import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../index.css'
import 'material-symbols'
import { Provider } from 'react-redux'
import { deckStore } from './deck.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={deckStore}>
      <App /> 
    </Provider>
  </React.StrictMode>,
)
