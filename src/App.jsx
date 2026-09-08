import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Cotizador from './pages/Cotizador';
import Emitir from './pages/Emitir';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SelectRole from './pages/SelectRole';
import Marketplace from './pages/Marketplace';
import Seguimiento from './pages/Seguimiento';
import Servicios from './pages/Servicios';
import Condiciones from './pages/Condiciones';
import Faq from './pages/Faq';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cotizar" element={<Cotizador />} />
          <Route path="/emitir" element={<Emitir />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/condiciones" element={<Condiciones />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
