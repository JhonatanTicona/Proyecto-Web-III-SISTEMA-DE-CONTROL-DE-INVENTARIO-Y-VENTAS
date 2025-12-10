import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const authAPI = {
  generarCaptcha: () => api.get('/auth/captcha'),
  login: (datos) => api.post('/auth/login', datos),
  registro: (datos) => api.post('/auth/registro', datos),
  logout: () => api.post('/auth/logout'),
  validarPassword: (password) => api.post('/auth/validar-password', { password }),
  obtenerLogs: () => api.get('/auth/logs'),
  obtenerMisLogs: () => api.get('/auth/mis-logs')
};

export const productosAPI = {
  listar: () => api.get('/productos'),
  obtener: (id) => api.get(`/productos/${id}`),
  crear: (datos) => api.post('/productos', datos),
  actualizar: (id, datos) => api.put(`/productos/${id}`, datos),
  eliminar: (id) => api.delete(`/productos/${id}`),
  restaurar: (id) => api.patch(`/productos/${id}/restaurar`),
  stockBajo: () => api.get('/productos/stock-bajo'),
  categorias: () => api.get('/productos/categorias')
};

export const clientesAPI = {
  listar: () => api.get('/clientes'),
  obtener: (id) => api.get(`/clientes/${id}`),
  crear: (datos) => api.post('/clientes', datos),
  actualizar: (id, datos) => api.put(`/clientes/${id}`, datos),
  eliminar: (id) => api.delete(`/clientes/${id}`)
};

export const ventasAPI = {
  listar: () => api.get('/ventas'),
  obtener: (id) => api.get(`/ventas/${id}`),
  crear: (datos) => api.post('/ventas', datos),
  anular: (id) => api.delete(`/ventas/${id}`),
  hoy: () => api.get('/ventas/hoy'),
  porFecha: (fecha_inicio, fecha_fin) => 
    api.get('/ventas/por-fecha', { params: { fecha_inicio, fecha_fin } }),
  porCliente: (cliente_id) => api.get(`/ventas/cliente/${cliente_id}`),
  verificarStock: (producto_id, cantidad) => 
    api.get('/ventas/verificar-stock', { params: { producto_id, cantidad } })
};
export const dashboardAPI = {
  obtener: () => api.get('/dashboard'),
  estadisticas: () => api.get('/dashboard/estadisticas'),
  ventasPorMes: () => api.get('/dashboard/graficos/ventas-mes'),
  ventasDiarias: () => api.get('/dashboard/graficos/ventas-diarias'),
  productosTop: (limite = 10) => 
    api.get('/dashboard/graficos/productos-top', { params: { limite } }),
  ventasPorCategoria: () => api.get('/dashboard/graficos/ventas-categoria'),
  inventario: () => api.get('/dashboard/graficos/inventario'),
  clientesTop: (limite = 10) => 
    api.get('/dashboard/clientes-top', { params: { limite } })
};

export const reportesAPI = {
  verFactura: (id) => api.get(`/reportes/factura/${id}/ver`, {
    responseType: 'blob'
  }),
  descargarFactura: (id) => api.get(`/reportes/factura/${id}/descargar`, {
    responseType: 'blob'
  }),
  verReporteVentas: (fecha_inicio, fecha_fin) => {
    const token = localStorage.getItem('token');
    return api.get('/reportes/ventas/ver', {
      params: { 
        fecha_inicio, 
        fecha_fin,
        token: token || ''
      },
      responseType: 'blob'
    });
  },
  descargarReporteVentas: (fecha_inicio, fecha_fin) => {
    const token = localStorage.getItem('token');
    return api.get('/reportes/ventas/descargar', {
      params: { 
        fecha_inicio, 
        fecha_fin,
        token: token || ''
      },
      responseType: 'blob'
    });
  }
};

export default api;