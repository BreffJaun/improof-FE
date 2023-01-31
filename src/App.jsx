import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route}  from "react-router-dom"

import './App.css'


import Login from './components/pages/Login.jsx'
import Registration from './components/pages/Registration.jsx'
import Main from './components/pages/Main.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="*" element={<Main/>} />
      </Routes>
    </div>
  )
}

export default App
