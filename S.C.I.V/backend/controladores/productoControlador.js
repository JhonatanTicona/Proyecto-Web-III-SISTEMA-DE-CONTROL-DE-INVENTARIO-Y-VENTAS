import {
  obtenerTodosProductos,
  obtenerProductoPorId,
  obtenerProductoPorCodigo,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  restaurarProducto,
  obtenerProductosStockBajo,
  obtenerCategorias
} from '../modelos/productoModelo.js';

export const listarProductos = async (req, res) => {
  try {
    const productos = await obtenerTodosProductos();
    res.json({
      ok: true,
      productos
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener productos',
      error: error.message
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorId(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      ok: true,
      producto
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el producto',
      error: error.message
    });
  }
};

export const insertarProducto = async (req, res) => {
  try {
    const { codigo } = req.body;

    const productoExiste = await obtenerProductoPorCodigo(codigo);
    if (productoExiste) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El código de producto ya existe'
      });
    }

    const nuevoProducto = await crearProducto(req.body);

    res.status(201).json({
      ok: true,
      mensaje: 'Producto creado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el producto',
      error: error.message
    });
  }
};

export const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo } = req.body;

    const productoExiste = await obtenerProductoPorId(id);
    if (!productoExiste) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado'
      });
    }
    const codigoExiste = await obtenerProductoPorCodigo(codigo);
    if (codigoExiste && codigoExiste.id !== parseInt(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El código de producto ya está en uso'
      });
    }

    const productoActualizado = await actualizarProducto(id, req.body);

    res.json({
      ok: true,
      mensaje: 'Producto actualizado exitosamente',
      producto: productoActualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el producto',
      error: error.message
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoExiste = await obtenerProductoPorId(id);
    if (!productoExiste) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado'
      });
    }

    await eliminarProducto(id);

    res.json({
      ok: true,
      mensaje: 'Producto eliminado exitosamente (eliminación lógica)',
      id
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el producto',
      error: error.message
    });
  }
};
export const recuperarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await restaurarProducto(id);

    res.json({
      ok: true,
      mensaje: 'Producto restaurado exitosamente',
      id
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al restaurar el producto',
      error: error.message
    });
  }
};
export const stockBajo = async (req, res) => {
  try {
    const productos = await obtenerProductosStockBajo();
    res.json({
      ok: true,
      productos,
      cantidad: productos.length
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener productos con stock bajo',
      error: error.message
    });
  }
};
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategorias();
    res.json({
      ok: true,
      categorias
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener categorías',
      error: error.message
    });
  }
};