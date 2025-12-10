import { db } from '../config/db.js';
export const obtenerTodosClientes = async () => {
  const [resultado] = await db.query(`
    SELECT * FROM clientes 
    WHERE eliminado = 0 
    ORDER BY nombre ASC
  `);
  return resultado;
};

export const obtenerClientePorId = async (id) => {
  const [resultado] = await db.query(
    'SELECT * FROM clientes WHERE id = ? AND eliminado = 0',
    [id]
  );
  return resultado[0];
};

export const obtenerClientePorNit = async (nit) => {
  const [resultado] = await db.query(
    'SELECT * FROM clientes WHERE nit = ? AND eliminado = 0',
    [nit]
  );
  return resultado[0];
};

export const crearCliente = async (cliente) => {
  const { nit, nombre, telefono, email, direccion } = cliente;
  
  const [resultado] = await db.query(
    'INSERT INTO clientes (nit, nombre, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
    [nit, nombre, telefono, email, direccion]
  );

  return { id: resultado.insertId, ...cliente };
};

export const actualizarCliente = async (id, cliente) => {
  const { nit, nombre, telefono, email, direccion } = cliente;
  
  await db.query(
    'UPDATE clientes SET nit = ?, nombre = ?, telefono = ?, email = ?, direccion = ? WHERE id = ? AND eliminado = 0',
    [nit, nombre, telefono, email, direccion, id]
  );

  return { id, ...cliente };
};

export const eliminarCliente = async (id) => {
  await db.query(
    'UPDATE clientes SET eliminado = 1 WHERE id = ?',
    [id]
  );
  return id;
};