import express from 'express';
import {
  obtenerDashboard,
  obtenerEstadisticas,
  graficoVentasMes,
  graficoProductosTop,
  graficoVentasCategoria,
  obtenerMejoresClientes,
  graficoVentasDiarias,
  graficoInventario
} from '../controladores/dashboardControlador.js';
import { verificarToken } from '../middlewares/auth.js';

const router = express.Router();
router.use(verificarToken);
router.get('/', obtenerDashboard);
router.get('/estadisticas', obtenerEstadisticas);
router.get('/graficos/ventas-mes', graficoVentasMes);
router.get('/graficos/ventas-diarias', graficoVentasDiarias);
router.get('/graficos/productos-top', graficoProductosTop);
router.get('/graficos/ventas-categoria', graficoVentasCategoria);
router.get('/graficos/inventario', graficoInventario);
router.get('/clientes-top', obtenerMejoresClientes);

export default router;