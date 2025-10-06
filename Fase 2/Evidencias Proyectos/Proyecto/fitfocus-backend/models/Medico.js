import mongoose from 'mongoose';

const medicoSchema = new mongoose.Schema({
  RUT_Medico: { type: Number, required: true },
  DV_Medico: { type: String, required: true, maxlength: 1 },
  Nombre_Medico: { type: String, required: true },
  Email_Medico: { type: String, unique: true, required: true },
  Fecha_Nac_Medico: { type: Date },
  Genero_Medico: { type: String },
  Especialidad_ID_Especialidad: { type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad' },
  password: { type: String, required: true }
});

export default mongoose.model('Medico', medicoSchema);