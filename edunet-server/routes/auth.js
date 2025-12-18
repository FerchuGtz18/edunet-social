const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { encriptarDato, desencriptarDato } = require('../utils/crypto');

// --- REGISTRO ---
router.post('/registro', async (req, res) => {
  try {
    const { email, password, nombre, apellido, whatsapp, residencia, genero, buscando, astrologia } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ error: "El email ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10); // 'password' ya viene encriptado del front
    const nuevoUsuario = new Usuario({
      nombre, apellido, email, password: hashedPassword, // Viene encriptado del front
      whatsapp, residencia, genero, buscando, astrologia
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar" });
  }
});

// --- LOGIN CORREGIDO ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // 'password' viene encriptado del front
    console.log("Email recibido:", email);
    console.log("Password recibido:", password);

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    console.log("Password guardado en DB:", usuario.password);

    // Comparamos los datos encriptados directamente
    const match = await bcrypt.compare(password, usuario.password); 
    console.log("Coincide?", match);  
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ 
      mensaje: "Login exitoso", 
      usuarioId: usuario._id,
      nombre: usuario.nombre 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor durante el login" });
  }
});

// --- PERFIL (OBTENER) ---
router.get('/perfil/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
});

// --- PERFIL (ACTUALIZAR) ---
router.put('/perfil/:id', async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
});

// --- EXPLORAR ---
router.get('/alumnos/:idActual', async (req, res) => {
  try {
    const { idActual } = req.params;
    const miUsuario = await Usuario.findById(idActual);
    if (!miUsuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const queBusco = miUsuario.buscando; 
    const yaVotados = miUsuario.likesDados || [];

    let filtro = { _id: { $ne: idActual, $nin: yaVotados } };
    if (queBusco === 'hombre' || queBusco === 'mujer') {
      filtro.genero = queBusco;
    }

    const alumnos = await Usuario.find(filtro);
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
});

// --- MATCHES ---
router.get('/mis-matches/:idActual', async (req, res) => {
  try {
    const { idActual } = req.params;
    const usuario = await Usuario.findById(idActual);
    const matches = await Usuario.find({
      _id: { $in: usuario.likesDados },
      likesDados: idActual
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Error en matches" });
  }
});

// --- LIKE ---
router.post('/like', async (req, res) => {
  try {
    const { idUsuario, idDestino } = req.body;
    await Usuario.findByIdAndUpdate(idUsuario, { $addToSet: { likesDados: idDestino } });
    const otroUsuario = await Usuario.findById(idDestino);
    const hayMatch = otroUsuario.likesDados.includes(idUsuario);
    res.json({ match: hayMatch });
  } catch (error) {
    res.status(500).json({ error: "Error en like" });
  }
});

module.exports = router;