import express from 'express';
import { check } from 'express-validator';
import {
  listarVentas,
  obtenerVenta,
  registrarVenta,
  cancelarVenta,
  ventasPorFecha,
  ventasDelDia,
  ventasDelCliente,
  consultarStock
} from '../controladores/ventaControlador.js';
import { verificarToken, esAdmin, esVendedor } from '../middlewares/auth.js';
import { validarCampos } from '../middlewares/validaciones.js';

const router = express.Router();

router.use(verificarToken);
router.get('/verificar-stock', consultarStock);
router.get('/', listarVentas);
router.get('/hoy', ventasDelDia);
router.get('/por-fecha', ventasPorFecha);
router.get('/cliente/:cliente_id', ventasDelCliente);
router.get('/:id', obtenerVenta);

router.post(
  '/',
  esVendedor,
  [
    check('cliente_id', 'El cliente es obligatorio').notEmpty(),
    check('cliente_id', 'El cliente debe ser un número').isInt(),
    check('productos', 'Debe incluir al menos un producto').isArray({ min: 1 }),
    check('productos.*.producto_id', 'El ID del producto es obligatorio').notEmpty(),
    check('productos.*.cantidad', 'La cantidad es obligatoria').isInt({ min: 1 }),
    check('productos.*.precio_unitario', 'El precio unitario es obligatorio').isFloat({ min: 0 }),
    check('descuento', 'El descuento debe ser un número').optional().isFloat({ min: 0 }),
    validarCampos
  ],
  registrarVenta
);

router.delete('/:id', esAdmin, cancelarVenta);

export default router;