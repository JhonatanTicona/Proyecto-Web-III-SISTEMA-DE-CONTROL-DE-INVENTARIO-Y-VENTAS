import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const verificarToken = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    token = req.query.token || req.body.token;
  }

  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'No se proporcionó token de autenticación'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token inválido o expirado'
    });
  }
};

export const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({
      ok: false,
      mensaje: 'No tienes permisos para realizar esta acción'
    });
  }
  next();
};

export const esVendedor = (req, res, next) => {
  if (req.usuario.rol !== 'vendedor' && req.usuario.rol !== 'admin') {
    return res.status(403).json({
      ok: false,
      mensaje: 'No tienes permisos para realizar esta acción'
    });
  }
  next();
};