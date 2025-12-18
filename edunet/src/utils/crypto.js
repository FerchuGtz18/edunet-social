import CryptoJS from 'crypto-js';

// Esta función tomará la contraseña y la devolverá encriptada
export const encriptarDato = (dato) => {
  return CryptoJS.SHA256(dato).toString();
};