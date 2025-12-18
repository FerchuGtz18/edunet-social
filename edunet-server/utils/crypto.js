const CryptoJS = require('crypto-js');

// IMPORTANTE: Esta clave debe ser IGUAL a la que usas en el Frontend
const SECRET_KEY = "tu_clave_secreta_super_segura"; 

const encriptarDato = (dato) => {
    return CryptoJS.AES.encrypt(dato, SECRET_KEY).toString();
};

const desencriptarDato = (datoEncriptado) => {
    try {
        const bytes = CryptoJS.AES.decrypt(datoEncriptado, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return null;
    }
};

module.exports = { encriptarDato, desencriptarDato };