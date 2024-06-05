import React from 'react'
import ReactDOM from 'react-dom/client'
import 'material-symbols'
import App from './App.tsx'
import "../style/index.scss"
import "@fontsource/roboto"
import "@fontsource/roboto/400-italic.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/500-italic.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/700-italic.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
