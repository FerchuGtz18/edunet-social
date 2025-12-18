import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Matches.css"; // Asegúrate de que el archivo exista aquí

const Matches = () => {
  const [misMatches, setMisMatches] = useState([]);
  const [cargando, setCargando] = useState(true);
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/mis-matches/${usuarioId}`);
        setMisMatches(res.data);
        setCargando(false);
      } catch (err) {
        console.error("Error al cargar matches");
        setCargando(false);
      }
    };

    if (usuarioId) fetchMatches();
  }, [usuarioId]);

  if (cargando) return <div className="loader">Buscando conexiones...</div>;

  return (
    <div className="matches-container">
      <h2>💖 Mis Conexiones Astrales</h2>
      
      {misMatches.length === 0 ? (
        <div className="no-matches">
          <p>Aún no tienes matches. ¡Sigue explorando el universo!</p>
        </div>
      ) : (
        <div className="matches-grid">
          {misMatches.map((match) => (
            <div key={match._id} className="match-card">
              <div className="match-info">
                <h3>{match.nombre} {match.apellido}</h3>
                <p className="match-signo">☀️ {match.astrologia?.signoSolar}</p>
                <p className="match-ciudad">📍 {match.residencia}</p>
              </div>
              
              <a 
                href={`https://wa.me/${match.whatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-chat"
              >
                Enviar Mensaje 📱
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;