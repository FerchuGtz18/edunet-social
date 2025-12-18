import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuarioId');
  const nombre = localStorage.getItem('nombreUsuario');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={usuarioId ? "/tinder" : "/"} onClick={cerrarMenu}>
          🚀 Edunet
        </Link>
      </div>

      {/* BOTÓN HAMBURGUESA */}
      <button 
        className="navbar-toggle"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        ☰
      </button>

      <ul className={`navbar-links ${menuAbierto ? 'open' : ''}`}>
        {!usuarioId ? (
          <>
            <li><Link to="/" onClick={cerrarMenu}>Registro</Link></li>
            <li><Link to="/login" onClick={cerrarMenu}>Login</Link></li>
          </>
        ) : (
          <>
            <li className="user-name">✨ {nombre}</li>
            <li><Link to="/tinder" onClick={cerrarMenu}>Explorar</Link></li>
            <li><Link to="/matches" onClick={cerrarMenu}>Matches 💖</Link></li>
            <li><Link to="/perfil" onClick={cerrarMenu}>Mi Perfil ⚙️</Link></li>
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Salir
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
