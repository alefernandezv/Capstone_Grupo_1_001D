const jwt = require('jsonwebtoken');

// Middleware para verificar token
function verificarToken(req, res, next) {
  // Leer token del header Authorization: Bearer <token>
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar token usando la misma clave que usaste al hacer login
    const decoded = jwt.verify(token, 'secreto');
    req.userId = decoded.id; // guardamos el id del usuario en la request
    next(); // continuar con la ruta
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
