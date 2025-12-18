import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { encriptarDato } from '../utils/crypto';
import '../styles/Registro.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Encriptamos la contraseña para que sea igual a la de la DB
      const datosLogin = {
        email: formData.email,
        password: formData.password
      };

      // Producción
      const res = await axios.post('https://edunet-server-03xf.onrender.com/api/auth/login', datosLogin);

      
      // 🔐 Guardamos datos correctos
      localStorage.setItem('usuarioId', res.data.usuario.id);
      localStorage.setItem('nombreUsuario', res.data.nombre);

      navigate('/tinder');
      window.location.reload(); // fuerza actualización del Navbar
    } catch (err) {
      alert("Error: Credenciales incorrectas");
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-box" onSubmit={handleSubmit}>
        <h2>🚀 Iniciar Sesión</h2>
        <input 
          type="email" 
          name="email" 
          placeholder="Tu Email" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Tu Contraseña" 
          onChange={handleChange} 
          required 
        />
        <button type="submit" className="btn-registro">Entrar</button>
      </form>
    </div>
  );
};

export default Login;