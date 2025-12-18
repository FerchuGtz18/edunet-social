import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Registro.css';

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const usuarioId = localStorage.getItem('usuarioId');

  const obtenerSigno = (dia, mes, hora) => {
    if (!dia || !mes || !hora) return "No calculado";
    const d = parseInt(dia);
    const m = parseInt(mes);
    const h = parseInt(hora.split(':')[0]);

    // Lógica corregida para Acuario en Enero y cúspides por hora
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
    return "No calculado";
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await axios.get(`https://edunet-server-03xf.onrender.com/api/auth/perfil/${usuarioId}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Error al cargar perfil");
      }
    };
    if (usuarioId) fetchPerfil();
  }, [usuarioId]);

  useEffect(() => {
    if (userData?.astrologia) {
      const { dia, mes, horaExacta } = userData.astrologia;
      const nuevoSigno = obtenerSigno(dia, mes, horaExacta);
      if (nuevoSigno !== userData.astrologia.signoSolar) {
        setUserData(prev => ({
          ...prev,
          astrologia: { ...prev.astrologia, signoSolar: nuevoSigno }
        }));
      }
    }
  }, [userData?.astrologia?.dia, userData?.astrologia?.mes, userData?.astrologia?.horaExacta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['dia', 'mes', 'año', 'lugarNacimiento', 'horaExacta'].includes(name)) {
      setUserData({
        ...userData,
        astrologia: { ...userData.astrologia, [name]: value }
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://edunet-server-03xf.onrender.com/api/auth/perfil/${usuarioId}`, userData);
      setMensaje("✅ Perfil actualizado");
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      setMensaje("❌ Error al guardar");
    }
  };

  if (!userData) return <div>Cargando...</div>;

  return (
    <div className="registro-container">
      <div className="registro-box profile-box">
        <h2>⚙️ Perfil de {userData.nombre}</h2>
        {mensaje && <p className="alert success">{mensaje}</p>}
        <form onSubmit={handleUpdate}>
          <div className="input-group">
            <input type="text" name="nombre" placeholder="Nombre" value={userData.nombre || ''} onChange={handleChange} />
            <input type="text" name="apellido" placeholder="Apellido" value={userData.apellido || ''} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="text" name="whatsapp" placeholder="WhatsApp" value={userData.whatsapp || ''} onChange={handleChange} />
            <input type="text" name="residencia" placeholder="Ciudad" value={userData.residencia || ''} onChange={handleChange} />
          </div>
          <div className="input-group">
            <select name="genero" value={userData.genero || ''} onChange={handleChange}>
              <option value="hombre">Soy Hombre</option>
              <option value="mujer">Soy Mujer</option>
              <option value="otro">Otro</option>
            </select>
            <select name="buscando" value={userData.buscando || ''} onChange={handleChange}>
              <option value="hombre">Busco Hombres</option>
              <option value="mujer">Busco Mujeres</option>
              <option value="indistinto">Busco Ambos</option>
            </select>
          </div>
          <h3>📅 Datos de Nacimiento</h3>
          <div className="input-group">
            <input type="number" name="dia" value={userData.astrologia?.dia || ''} onChange={handleChange} />
            <input type="number" name="mes" value={userData.astrologia?.mes || ''} onChange={handleChange} />
            <input type="time" name="horaExacta" value={userData.astrologia?.horaExacta || ''} onChange={handleChange} />
          </div>
          <div className="signo-display-perfil" style={{marginTop: '10px', color: '#00d2ff'}}>
            ☀️ Signo Solar: <strong>{userData.astrologia?.signoSolar}</strong>
          </div>
          <button type="submit" className="btn-registro">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;