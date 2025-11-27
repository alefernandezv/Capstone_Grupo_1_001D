// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Paciente from '../models/Paciente.js';  // ✅ Importamos el modelo correcto
import verificarToken from '../middleware/authMiddleware.js';
import { getConnection } from '../db/oracle.js';

const router = express.Router();

// 🟢 Registro de paciente
router.post('/register', async (req, res) => {
  try {
    const { Email_Paciente, password, ...rest } = req.body;

    // Validar si el paciente ya existe
    const existe = await Paciente.findOne({ Email_Paciente });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoPaciente = new Paciente({
      Email_Paciente,
      password: hashedPassword,
      ...rest
    });

    await nuevoPaciente.save();

    res.status(201).json({ message: 'Paciente registrado exitosamente' });
  } catch (err) {
    console.error('❌ Error al registrar paciente:', err);
    res.status(400).json({ error: 'No se pudo registrar el paciente' });
  }
});

// 🟡 Login de paciente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const paciente = await Paciente.findOne({ Email_Paciente: email });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    const valido = await bcrypt.compare(password, paciente.password);
    if (!valido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: paciente._id }, 'secreto', { expiresIn: '1d' });

    res.json({ token, paciente });
  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// 🟣 Obtener perfil de paciente autenticado
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.userId).select('-password');
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    console.error('❌ Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

// 🟠 Actualizar perfil
router.put('/perfil', verificarToken, async (req, res) => {
  try {
    await Paciente.findByIdAndUpdate(req.userId, req.body);
    res.json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

export default router;
