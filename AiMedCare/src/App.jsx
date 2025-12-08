import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes.jsx'
import Chatbot from './ai/chatbot.jsx'


export const App = () => {

 
  return (
    <div>

      
  
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        
      </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
