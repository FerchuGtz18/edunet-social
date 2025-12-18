import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TinderStudy.css';

const TinderStudy = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [indice, setIndice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState({ show: false, nombre: '', whatsapp: '' });

  // Obtenemos el ID del usuario logueado desde el localStorage
  const userActualId = localStorage.getItem('usuarioId') || "PROVISORIO";

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/alumnos/${userActualId}`);
        setAlumnos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando perfiles");
        setLoading(false);
      }
    };
    cargarAlumnos();
  }, [userActualId]);

  const handleVoto = async (tipo, idDestino, nombreDestino) => {
    if (tipo === 'like') {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/like', {
          idDe: userActualId,
          idA: idDestino
        });

        if (res.data.esMatch) {
          setMatchData({ show: true, nombre: nombreDestino, whatsapp: res.data.whatsapp });
        }
      } catch (err) {
        console.error("Error al enviar like");
      }
    }
    setIndice(indice + 1);
  };

  if (loading) return <div className="loader">Sincronizando con el cosmos...</div>;
  if (indice >= alumnos.length) return <div className="no-more">✨ Ya viste a todos los estudiantes por hoy.</div>;

  const persona = alumnos[indice];
  const edad = persona.astrologia?.año ? new Date().getFullYear() - persona.astrologia.año : "S/N";

  return (
    <div className="tinder-container">
      {/* MODAL DE MATCH */}
      {matchData.show && (
        <div className="match-overlay">
          <div className="match-modal">
            <h1>¡MATCH ASTRAL! 🚀</h1>
            <p>Tú y {matchData.nombre} tienen energías compatibles.</p>
            <div className="match-actions">
              <button onClick={() => setMatchData({ ...matchData, show: false })}>Seguir viendo</button>
              <a href={`https://wa.me/${matchData.whatsapp}`} target="_blank" rel="noreferrer" className="btn-whatsapp">
                Enviar Mensaje 📱
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="tinder-card">
        <div className="card-photo">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${persona.nombre}`} alt="avatar" />
          <span className="badge-signo">{persona.astrologia?.signoSolar || "Zodiaco"}</span>
        </div>
        
        <div className="card-info">
          <h2>{persona.nombre} {persona.apellido}, {edad}</h2>
          <p className="residencia">📍 {persona.residencia || "Salta, Argentina"}</p>
          
          <div className="compatibilidad">
            <div className="stat-item">
              <span>🔥 {persona.puntosVirtuales || 0} Puntos</span>
            </div>
            <div className="stat-item">
              <span>🔍 Busca: {persona.buscando || "Estudiar"}</span>
            </div>
          </div>
        </div>

        <div className="card-buttons">
          <button className="btn-x" onClick={() => handleVoto('pass', persona._id)}>✖️</button>
          <button className="btn-heart" onClick={() => handleVoto('like', persona._id, persona.nombre)}>🔥</button>
        </div>
      </div>
    </div>
  );
};

export default TinderStudy;