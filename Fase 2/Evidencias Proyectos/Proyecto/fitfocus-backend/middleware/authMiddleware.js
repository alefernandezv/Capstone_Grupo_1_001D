import jwt from 'jsonwebtoken';

function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

export default verificarToken;
