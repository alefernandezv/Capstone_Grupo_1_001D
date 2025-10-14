// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import authRoutes from './routes/auth.js';
import medicosRoutes from './routes/medicos.js';
import especialidadesRoutes from './routes/especialidades.js';
import { initOracle } from './db/oracle.js';
import User from './models/User.js';
import Medico from './models/Medico.js';
import Especialidad from './models/Especialidad.js';

// Registrar adaptador de Mongoose en AdminJS
AdminJS.registerAdapter({ Database, Resource });

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/fitfocus', {})
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/especialidades', especialidadesRoutes);

// Configuración de AdminJS
const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, edit: false, filter: false, show: false },
          },
          password: {
            isVisible: { list: false, edit: false, filter: false, show: false },
          },
        },
      },
    },
    {
      resource: Medico,
      options: {
        properties: {
          password: {
            type: 'password', // Campo tipo contraseña
            isVisible: {
              list: false,   // No mostrar en lista
              filter: false, // No usar en filtros
              show: false,   // No mostrar en detalle
              edit: true,    // Visible al crear/editar
            },
          },
          RUT_Medico: { 
            type: 'number', 
            isVisible: { edit: true, list: true, filter: true, show: true } 
          },
          DV_Medico: { 
            isVisible: { edit: true, list: true, filter: true, show: true } 
          },
          Genero_Medico: {
            availableValues: [
              { value: 'Masculino', label: 'Masculino' },
              { value: 'Femenino', label: 'Femenino' },
              { value: 'Otro', label: 'Otro' },
            ],
          },
        },
      },
    },
    {
      resource: Especialidad,
      options: {
        navigation: { name: 'Gestión Médica', icon: 'Book' },
        actions: {
          delete: {
            guard: '¿Seguro que deseas eliminar esta especialidad? Esta acción no se puede deshacer.',
          },
        },
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'WellFit Admin',
    logo: false,
    softwareBrothers: false,
  },
});

// Router de AdminJS
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Conexión a Oracle
(async () => {
  await initOracle();
})();

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en ejecución en http://localhost:${PORT}/admin`));
