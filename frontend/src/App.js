import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; //aggiunto BrowserRouter perchè dava errore => raccolgo le routes in BrowserRouter
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPanel from './pages/ChatPanel';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatPanel />} />
    </Routes>
    </BrowserRouter>
  )
}
