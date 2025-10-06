// auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import verificarToken from '../middleware/authMiddleware.js';
import { getConnection } from '../db/oracle.js';

const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, ...rest });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(400).json({ error: 'No se pudo registrar el usuario' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1d' });

    res.json({ token, usuario });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener perfil
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.userId).select('-password');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

// Actualizar perfil
router.put('/perfil', verificarToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, req.body);
    res.json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

export default router;