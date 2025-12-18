const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();

const app = express();

// MIDDLEWARES
app.use(cors()); 
app.use(express.json()); 

// RUTAS
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// RUTA DE PRUEBA (Para verificar que el servidor vive al subirlo)
app.get('/', (req, res) => {
  res.send('🌌 Edunet Astral API corriendo...');
});

// CONEXIÓN A MONGODB
// Usamos una validación para evitar errores si no está el .env
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ ERROR: No se encontró MONGO_URI en el archivo .env");
  process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log("🚀 MongoDB Conectado con éxito"))
    .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

// PUERTO DINÁMICO
// Render/Railway asignan un puerto automático, por eso usamos process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en puerto ${PORT}`);
});