import express from 'express';
import { check } from 'express-validator';
import {
  listarClientes,
  obtenerCliente,
  insertarCliente,
  modificarCliente,
  borrarCliente
} from '../controladores/clienteControlador.js';
import { verificarToken, esAdmin } from '../middlewares/auth.js';
import { validarCampos } from '../middlewares/validaciones.js';

const router = express.Router();
router.use(verificarToken);
router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 }),
    check('email', 'El email debe ser válido').optional().isEmail(),
    validarCampos
  ],
  insertarCliente
);
router.put(
  '/:id',
  [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 }),
    check('email', 'El email debe ser válido').optional().isEmail(),
    validarCampos
  ],
  modificarCliente
);
router.delete('/:id', esAdmin, borrarCliente);

export default router;