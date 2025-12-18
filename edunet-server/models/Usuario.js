const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  whatsapp: String,
  residencia: String,
  genero: String,    // <--- AGREGADO: hombre/mujer/otro
  buscando: String,  // <--- AGREGADO: hombre/mujer/indistinto
  astrologia: {
    dia: Number,
    mes: Number,
    año: Number,
    lugarNacimiento: String,
    horaExacta: String,
    signoSolar: String
  },
  likesDados: { type: [String], default: [] },
  puntosVirtuales: { type: Number, default: 0 },
  monedas: { type: Number, default: 0 },
  advertencias: { type: Number, default: 0 }
});

module.exports = mongoose.model('Usuario', usuarioSchema);