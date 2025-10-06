// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import authRoutes from './routes/auth.js';
import medicosRoutes from './routes/medicos.js';
import { initOracle } from './db/oracle.js';
import User from './models/User.js';
import Medico from './models/Medico.js';

// Registrar adaptador de Mongoose en AdminJS
AdminJS.registerAdapter({ Database, Resource });

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/fitfocus', {})
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error(err));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/medicos', medicosRoutes);

// Configuración de AdminJS
const adminJs = new AdminJS({
  resources: [
    { resource: User, options: { 
        properties: { password: { isVisible: false } } // Oculta passwords
    }},
    { resource: Medico, options: { 
        properties: { password: { isVisible: false } } 
    }},
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'FitFocus Admin',
  },
});

// Usar AdminJS con Express
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Conexión a Oracle
(async () => {
  await initOracle();
})();

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
