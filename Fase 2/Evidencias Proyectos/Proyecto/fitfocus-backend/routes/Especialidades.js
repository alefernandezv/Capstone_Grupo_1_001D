// routes/especialidades.js
import express from 'express';
import Especialidad from '../models/Especialidad.js';

const router = express.Router();

/**
 * Crear una nueva especialidad
 */
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaEspecialidad = new Especialidad({ nombre, descripcion });
    await nuevaEspecialidad.save();
    res.status(201).json({ message: '✅ Especialidad creada correctamente', especialidad: nuevaEspecialidad });
  } catch (err) {
    console.error('❌ Error al crear especialidad:', err);
    res.status(400).json({ error: 'Error al crear la especialidad' });
  }
});

/**
 * Listar todas las especialidades
 */
router.get('/', async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    res.json(especialidades);
  } catch (err) {
    console.error('❌ Error al obtener especialidades:', err);
    res.status(500).json({ error: 'Error al obtener especialidades' });
  }
});

/**
 * Eliminar una especialidad por ID (con confirmación)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si existe
    const especialidad = await Especialidad.findById(id);
    if (!especialidad) {
      return res.status(404).json({ error: 'Especialidad no encontrada' });
    }

    // Eliminar
    await Especialidad.findByIdAndDelete(id);
    res.json({
      message: `⚠️ Especialidad "${especialidad.nombre}" eliminada correctamente.`,
      deletedId: id
    });
  } catch (err) {
    console.error('❌ Error al eliminar especialidad:', err);
    res.status(500).json({ error: 'Error al eliminar la especialidad' });
  }
});

export default router;
