import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
  RUT_Paciente: {
    type: Number,
    required: true,
    min: 1000000, // mínimo 7 dígitos
    max: 99999999, // máximo 8 dígitos
    validate: {
      validator: (v) => /^[0-9]+$/.test(v),
      message: 'El RUT solo debe contener números',
    },
  },
  DV_Paciente: {
    type: String,
    required: true,
    maxlength: 1,
    uppercase: true,
    validate: {
      validator: (v) => /^[0-9K]$/.test(v),
      message: 'El dígito verificador solo puede ser un número o la letra K',
    },
  },
  Nombre_Paciente: {
    type: String,
    required: true,
  },
  Email_Paciente: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'El email no es válido'],
  },
  password: {
    type: String,
    required: true,
  },
  Fecha_Nac_Paciente: {
    type: Date,
    required: true,
  },
  Genero_Paciente: {
    type: String,
    required: true,
    enum: ['Masculino', 'Femenino', 'Otro'],
  },
  Objetivo_Paciente: {
    type: [String],
    required: true,
  },
  Condicion_Paciente: {
    type: [String],
    required: true,
  },
  Altura_Paciente: {
    type: Number,
    required: true,
    min: 0,
    max: 300,
  },
  Peso_Paciente: {
    type: Number,
    required: true,
    min: 0,
    max: 300,
  },
});

export default mongoose.models.Paciente || mongoose.model('Paciente', pacienteSchema);

