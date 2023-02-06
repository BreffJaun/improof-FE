import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {UserContextProvider} from './context/userContext.jsx'
import { TriggerContextProvider } from './context/triggerContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <TriggerContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </TriggerContextProvider>
  </React.StrictMode>
)
