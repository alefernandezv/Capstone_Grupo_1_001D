const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: String,
  rutNumero: Number,   // ✅ número del RUT
  rutDV: { type: String, required: true, maxlength: 1 }, 
  email: { type: String, unique: true },
  password: String,
  fechaNacimiento: { type: Date },
  genero: String,
  objetivo: [String],
  condicion: [String],
  altura: Number,
  peso: Number
});

module.exports = mongoose.model('User', UserSchema);
