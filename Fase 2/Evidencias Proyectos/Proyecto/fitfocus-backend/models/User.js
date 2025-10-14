import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: String,
  rutNumero: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => /^[0-9]+$/.test(v),
      message: 'El RUT solo debe contener números',
    },
  },
  rutDV: {
    type: String,
    required: true,
    maxlength: 1,
    uppercase: true,
    validate: {
      validator: (v) => /^[0-9K]$/.test(v),
      message: 'El dígito verificador solo puede ser un número o la letra K',
    },
  },
  email: { type: String, unique: true },
  password: String,
  fechaNacimiento: Date,
  genero: String,
  objetivo: [String],
  condicion: [String],
  altura: Number,
  peso: Number,
});

export default mongoose.model('User', UserSchema);
