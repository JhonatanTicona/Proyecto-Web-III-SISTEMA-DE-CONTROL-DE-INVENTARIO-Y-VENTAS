import {
  buscarUsuarioPorEmail,
  crearUsuario,
  registrarLogAcceso,
  obtenerLogsUsuario,
  obtenerTodosLogs
} from '../modelos/authModelo.js';
import {
  encriptarPassword,
  compararPassword,
  validarFortalezaPassword
} from '../utils/password.js';
import { generarToken } from '../middlewares/auth.js';
import svgCaptcha from 'svg-captcha';

const captchaStore = new Map();

export const generarCaptcha = (req, res) => {
  try {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 2,
      color: true,
      background: '#f0f0f0'
    });

    const captchaId = Date.now().toString() + Math.random().toString(36);
    
    captchaStore.set(captchaId, {
      text: captcha.text,
      timestamp: Date.now()
    });

    limpiarCaptchasExpirados();

    res.json({
      ok: true,
      captchaId,
      captchaSvg: captcha.data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al generar captcha',
      error: error.message
    });
  }
};

const validarCaptcha = (captchaId, captchaText) => {
  const captcha = captchaStore.get(captchaId);
  
  if (!captcha) {
    return false;
  }

  if (Date.now() - captcha.timestamp > 5 * 60 * 1000) {
    captchaStore.delete(captchaId);
    return false;
  }

  const isValid = captcha.text.toLowerCase() === captchaText.toLowerCase();
  
  if (isValid) {
    captchaStore.delete(captchaId);
  }

  return isValid;
};

const limpiarCaptchasExpirados = () => {
  const ahora = Date.now();
  for (const [key, value] of captchaStore.entries()) {
    if (ahora - value.timestamp > 5 * 60 * 1000) {
      captchaStore.delete(key);
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, captchaId, captchaText } = req.body;

    if (!validarCaptcha(captchaId, captchaText)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Captcha inválido o expirado'
      });
    }

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Email o contraseña incorrectos'
      });
    }

    const passwordValido = await compararPassword(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Email o contraseña incorrectos'
      });
    }

    const token = generarToken(usuario);

    await registrarLogAcceso({
      usuario_id: usuario.id,
      ip: req.ip || req.connection.remoteAddress,
      evento: 'ingreso',
      browser: req.headers['user-agent']
    });

    res.json({
      ok: true,
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error en el login',
      error: error.message
    });
  }
};

export const registro = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuarioExiste = await buscarUsuarioPorEmail(email);
    if (usuarioExiste) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El email ya está registrado'
      });
    }

    const validacion = validarFortalezaPassword(password);
    
    if (validacion.fortaleza === 'débil') {
      return res.status(400).json({
        ok: false,
        mensaje: validacion.mensaje,
        fortaleza: validacion.fortaleza,
        criterios: validacion.criterios
      });
    }
    const passwordEncriptado = await encriptarPassword(password);

    const nuevoUsuario = await crearUsuario({
      nombre,
      email,
      password: passwordEncriptado,
      rol
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado exitosamente',
      fortalezaPassword: validacion.fortaleza,
      usuario: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al registrar usuario',
      error: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    await registrarLogAcceso({
      usuario_id: req.usuario.id,
      ip: req.ip || req.connection.remoteAddress,
      evento: 'salida',
      browser: req.headers['user-agent']
    });

    res.json({
      ok: true,
      mensaje: 'Logout exitoso'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al cerrar sesión',
      error: error.message
    });
  }
};

export const validarPassword = (req, res) => {
  try {
    const { password } = req.body;
    const validacion = validarFortalezaPassword(password);

    res.json({
      ok: true,
      ...validacion
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al validar contraseña',
      error: error.message
    });
  }
};

export const obtenerMisLogs = async (req, res) => {
  try {
    const logs = await obtenerLogsUsuario(req.usuario.id);
    res.json({
      ok: true,
      logs
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener logs',
      error: error.message
    });
  }
};

export const obtenerLogs = async (req, res) => {
  try {
    const logs = await obtenerTodosLogs();
    res.json({
      ok: true,
      logs
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener logs',
      error: error.message
    });
  }
};