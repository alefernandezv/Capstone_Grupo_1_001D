import mongoose from 'mongoose';

const medicoSchema = new mongoose.Schema({
  RUT_Medico: {
    type: Number,
    required: [true, 'El RUT del médico es obligatorio'],
    min: [1000000, 'El RUT debe tener al menos 7 dígitos'],
    max: [99999999, 'El RUT no puede tener más de 8 dígitos'],
    validate: {
      validator: (v) => /^[0-9]+$/.test(v),
      message: 'El RUT solo debe contener números',
    },
  },
  DV_Medico: {
    type: String,
    required: [true, 'El dígito verificador es obligatorio'],
    maxlength: [1, 'El dígito verificador solo puede tener 1 carácter'],
    uppercase: true,
    validate: {
      validator: (v) => /^[0-9K]$/.test(v),
      message: 'El dígito verificador solo puede ser un número o la letra K',
    },
  },
  Nombre_Medico: {
    type: String,
    required: [true, 'El nombre del médico es obligatorio'],
    trim: true,
  },
  Email_Medico: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      message: 'El formato del correo electrónico no es válido',
    },
  },
  Fecha_Nac_Medico: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria'],
  },
  Genero_Medico: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: [true, 'El género es obligatorio'],
  },
  Especialidad_ID_Especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Especialidad',
    required: [true, 'La especialidad es obligatoria'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
});

export default mongoose.model('Medico', medicoSchema);
  