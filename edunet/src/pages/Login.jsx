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
        password: encriptarDato(formData.password)
      };

      const res = await axios.post('http://localhost:5000/api/auth/login', datosLogin);
      
      localStorage.setItem('usuarioId', res.data.usuarioId);
      localStorage.setItem('nombre', res.data.nombre);
      
      navigate('/explorar');
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