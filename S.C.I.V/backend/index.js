import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verificarConexion } from './config/db.js';

import authRutas from './rutas/authRutas.js';
import productoRutas from './rutas/productoRutas.js';
import clienteRutas from './rutas/clienteRutas.js';
import ventaRutas from './rutas/ventaRutas.js';
import dashboardRutas from './rutas/dashboardRutas.js';
import reporteRutas from './rutas/reporteRutas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await verificarConexion();

app.use('/api/auth', authRutas);
app.use('/api/productos', productoRutas);
app.use('/api/clientes', clienteRutas);
app.use('/api/ventas', ventaRutas);
app.use('/api/dashboard', dashboardRutas);
app.use('/api/reportes', reporteRutas);

app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API de Sistema de Inventario y Ventas',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      productos: '/api/productos',
      clientes: '/api/clientes',
      ventas: '/api/ventas',
      dashboard: '/api/dashboard',
      reportes: '/api/reportes'
    }
  });
});
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada'
  });
});
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    ok: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
app.listen(PORT, () => {
  console.log('Servidor iniciado correctamente');
  console.log(`Puerto: ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});