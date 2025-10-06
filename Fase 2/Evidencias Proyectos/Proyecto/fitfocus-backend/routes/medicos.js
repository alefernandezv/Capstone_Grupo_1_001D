import express from 'express';
import bcrypt from 'bcrypt';
import Medico from '../models/Medico.js';
import verificarToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Crear médico
router.post('/', verificarToken, async (req, res) => {
  try {
    const { RUT_Medico, DV_Medico, Nombre_Medico, Email_Medico, Fecha_Nac_Medico, Genero_Medico, Especialidad_ID_Especialidad, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoMedico = new Medico({
      RUT_Medico,
      DV_Medico,
      Nombre_Medico,
      Email_Medico,
      Fecha_Nac_Medico,
      Genero_Medico,
      Especialidad_ID_Especialidad,
      password: hashedPassword
    });

    await nuevoMedico.save();
    res.status(201).json({ message: 'Médico creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear el médico' });
  }
});

// Listar médicos
router.get('/', verificarToken, async (req, res) => {
  try {
    const medicos = await Medico.find().populate('Especialidad_ID_Especialidad');
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener médicos' });
  }
});

export default router;
