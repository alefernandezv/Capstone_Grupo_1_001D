const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { initOracle } = require('./db/oracle'); // 👈 importamos Oracle

const app = express();

app.use(cors());           // Permite solicitudes CORS
app.use(express.json());   // **Aquí se procesa el body JSON de las solicitudes**

mongoose.connect('mongodb://localhost:27017/fitfocus', {})
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));

// Conexión a Oracle
(async () => {
  await initOracle();
})();

app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));