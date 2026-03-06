import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes.jsx'
import Chatbot from './ai/chatbot.jsx'
import Login from './login/login.jsx'

export const App = () => {
  console.log("sample");
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
