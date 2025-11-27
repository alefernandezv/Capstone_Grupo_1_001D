import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import bcrypt from 'bcrypt';

import authRoutes from './routes/auth.js';
import medicosRoutes from './routes/medicos.js';
import { initOracle } from './db/oracle.js';
import Paciente from './models/Paciente.js'; // ahora paciente
import Medico from './models/Medico.js';
import Especialidad from './models/Especialidad.js';

// Registrar adaptador de Mongoose en AdminJS
AdminJS.registerAdapter({ Database, Resource });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
    { 
      resource: Medico, 
      options: {
        properties: {
          _id: { isVisible: false },
          password: { 
            type: 'password', 
            isVisible: { list: false, edit: true, filter: false, show: false } 
          },
          Genero_Medico: {
            availableValues: [
              { value: 'Masculino', label: 'Masculino' },
              { value: 'Femenino', label: 'Femenino' },
              { value: 'Otro', label: 'Otro' }
            ]
          }
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.password){
                request.payload.password = await bcrypt.hash(request.payload.password, 10);
              }
              return request;
            }
          },
          edit: {
            before: async (request) => {
              if(request.payload.password){
                request.payload.password = await bcrypt.hash(request.payload.password, 10);
              }
              return request;
            }
          }
        }
      } 
    },
    { 
      resource: Paciente, 
      options: {
        properties: {
          _id: { isVisible: false },
          password: { 
            type: 'password', 
            isVisible: { list: false, edit: true, filter: false, show: false } 
          },
          Genero_Paciente: {
            availableValues: [
              { value: 'Masculino', label: 'Masculino' },
              { value: 'Femenino', label: 'Femenino' },
              { value: 'Otro', label: 'Otro' }
            ]
          }
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.password){
                request.payload.password = await bcrypt.hash(request.payload.password, 10);
              }
              return request;
            }
          },
          edit: {
            before: async (request) => {
              if(request.payload.password){
                request.payload.password = await bcrypt.hash(request.payload.password, 10);
              }
              return request;
            }
          }
        }
      } 
    },
    {
      resource: Especialidad,
      options: {
        properties: {
          _id: { isVisible: false }
        }
      }
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'WellFit Admin',
  },
  assets: {
    scripts: ['/admin-theme-toggle.js'], // cargamos nuestro script del toggle
    styles: ['/admin.css'],             // cargamos nuestro CSS
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
app.listen(PORT, () => console.log(`🚀 Servidor en ejecución en http://localhost:${PORT}/admin`));
