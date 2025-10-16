
import mongoose from 'mongoose';

const especialidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String }
});

const Especialidad = mongoose.model('Especialidad', especialidadSchema);
export default Especialidad;
