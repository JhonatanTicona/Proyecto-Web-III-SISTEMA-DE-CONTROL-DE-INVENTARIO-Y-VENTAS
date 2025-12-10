import express from 'express';
import {
  descargarFactura,
  verFactura,
  descargarReporteVentas,
  verReporteVentas
} from '../controladores/reporteControlador.js';
import { verificarToken } from '../middlewares/auth.js';

const router = express.Router();
router.use(verificarToken);
router.get('/factura/:id/descargar', descargarFactura);
router.get('/factura/:id/ver', verFactura);

router.get('/ventas/descargar', descargarReporteVentas);
router.get('/ventas/ver', verReporteVentas);

export default router;