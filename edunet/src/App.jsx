import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import TinderStudy from './pages/TinderStudy';
import Matches from './pages/Matches';
import Perfil from './pages/Perfil'; // Importación nueva
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tinder" element={<TinderStudy />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;