// src/utils/astrologia.js

export const obtenerSignoSolar = (dia, mes) => {
  const signos = [
    { nombre: "Capricornio", fin: 19 }, { nombre: "Acuario", fin: 18 },
    { nombre: "Piscis", fin: 20 }, { nombre: "Aries", fin: 19 },
    { nombre: "Tauro", fin: 20 }, { nombre: "Géminis", fin: 20 },
    { nombre: "Cáncer", fin: 22 }, { nombre: "Leo", fin: 22 },
    { nombre: "Virgo", fin: 22 }, { nombre: "Libra", fin: 22 },
    { nombre: "Escorpio", fin: 21 }, { nombre: "Sagitario", fin: 21 }
  ];
  
  // El índice del mes en el array (Enero es 0)
  const mesIndex = mes - 1;
  const signo = dia <= signos[mesIndex].fin 
    ? signos[mesIndex === 0 ? 11 : mesIndex - 1] 
    : signos[mesIndex];
    
  return signo.nombre;
};

// Nota: Para el Ascendente y Casas se necesita la latitud/longitud del lugar.
// Usaremos un cálculo aproximado basado en la hora para el Ascendente:
export const calcularAscendenteAprox = (hora) => {
  const [h, m] = hora.split(':').map(Number);
  // Lógica simplificada: el ascendente cambia aprox cada 2 horas desde el amanecer
  if (h >= 6 && h < 8) return "Aries";
  if (h >= 8 && h < 10) return "Tauro";
  // ... esto es una aproximación, lo ideal es usar la librería 'astrology-js'
  return "Calculando..."; 
};