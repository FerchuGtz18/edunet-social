import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { encriptarDato } from '../utils/crypto';
import '../styles/Registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '', 
    apellido: '', 
    email: '', 
    password: '', 
    whatsapp: '',
    residencia: '', 
    genero: '', 
    buscando: '', 
    dia: '', 
    mes: '', 
    año: '', 
    lugarNacimiento: '', 
    horaExacta: '12:00'
  });
  
  const [signoDetectado, setSignoDetectado] = useState('');
  const navigate = useNavigate();

  const obtenerSigno = (dia, mes, hora) => {
    if (!dia || !mes || !hora) return "";
    const d = parseInt(dia);
    const m = parseInt(mes);
    const h = parseInt(hora.split(':')[0]);

    if (m === 1) return (d < 20 || (d === 20 && h < 10)) ? "Capricornio" : "Acuario";
    if (m === 2) return (d < 19 || (d === 19 && h < 14)) ? "Acuario" : "Piscis";
    if (m === 3) return (d < 21 || (d === 21 && h < 12)) ? "Piscis" : "Aries";
    if (m === 4) return (d < 20 || (d === 20 && h < 18)) ? "Aries" : "Tauro";
    if (m === 5) return (d < 21 || (d === 21 && h < 16)) ? "Tauro" : "Géminis";
    if (m === 6) return (d < 21 || (d === 21 && h < 22)) ? "Géminis" : "Cáncer";
    if (m === 7) return (d < 23 || (d === 23 && h < 9)) ? "Cáncer" : "Leo";
    if (m === 8) return (d < 23 || (d === 23 && h < 16)) ? "Leo" : "Virgo";
    if (m === 9) return (d < 23 || (d === 23 && h < 14)) ? "Virgo" : "Libra";
    if (m === 10) return (d < 23 || (d === 23 && h < 23)) ? "Libra" : "Escorpio";
    if (m === 11) return (d < 22 || (d === 22 && h < 11)) ? "Escorpio" : "Sagitario";
    if (m === 12) return (d < 22 || (d === 22 && h < 6)) ? "Sagitario" : "Capricornio";
    return "";
  };

  useEffect(() => {
    if (formData.dia && formData.mes && formData.horaExacta) {
      setSignoDetectado(obtenerSigno(formData.dia, formData.mes, formData.horaExacta));
    }
  }, [formData.dia, formData.mes, formData.horaExacta]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosFinales = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      password: encriptarDato(formData.password),
      whatsapp: formData.whatsapp,
      residencia: formData.residencia,
      genero: formData.genero,
      buscando: formData.buscando,
      astrologia: {
        dia: parseInt(formData.dia),
        mes: parseInt(formData.mes),
        año: parseInt(formData.año),
        lugarNacimiento: formData.lugarNacimiento,
        horaExacta: formData.horaExacta,
        signoSolar: signoDetectado
      }
    };
    try {
      await axios.post('http://localhost:5000/api/auth/registro', datosFinales);
      navigate('/login');
    } catch (err) {
      alert("Error en el registro. Revisa los datos.");
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-box" onSubmit={handleSubmit}>
        <h2>✨ Únete a Edunet</h2>
        
        {/* SECCIÓN 1: DATOS PERSONALES */}
        <div className="input-group">
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
        </div>

        {/* SECCIÓN 2: CUENTA Y SEGURIDAD */}
        <div className="input-group">
          <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        </div>

        {/* SECCIÓN 3: CONTACTO Y UBICACIÓN */}
        <div className="input-group">
          <input type="text" name="whatsapp" placeholder="Número de WhatsApp" onChange={handleChange} required />
          <input type="text" name="residencia" placeholder="Ciudad Actual" onChange={handleChange} required />
        </div>
        
        {/* SECCIÓN 4: GÉNERO Y PREFERENCIAS */}
        <div className="input-group">
          <select name="genero" onChange={handleChange} required>
            <option value="">Soy...</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>

          <select name="buscando" onChange={handleChange} required>
            <option value="">Busco...</option>
            <option value="hombre">Hombres</option>
            <option value="mujer">Mujeres</option>
            <option value="indistinto">Ambos / Indistinto</option>
          </select>
        </div>

        <h3>📅 Datos de Nacimiento</h3>
        
        {/* SECCIÓN 5: FECHA */}
        <div className="input-group">
          <input type="number" name="dia" placeholder="Día" onChange={handleChange} required />
          <input type="number" name="mes" placeholder="Mes" onChange={handleChange} required />
          <input type="number" name="año" placeholder="Año" onChange={handleChange} required />
        </div>

        {/* SECCIÓN 6: LUGAR Y HORA */}
        <div className="input-group">
          <input type="text" name="lugarNacimiento" placeholder="Ciudad de Nacimiento" onChange={handleChange} required />
          <div className="time-field">
             <label style={{color: '#aaa', fontSize: '0.8rem'}}>Hora:</label>
             <input type="time" name="horaExacta" onChange={handleChange} required />
          </div>
        </div>
        
        {signoDetectado && (
          <p className="signo-alert">☀️ Tu signo solar es: <strong>{signoDetectado}</strong></p>
        )}

        <button type="submit" className="btn-registro">Crear Cuenta Astral</button>
      </form>
    </div>
  );
};

export default Registro;