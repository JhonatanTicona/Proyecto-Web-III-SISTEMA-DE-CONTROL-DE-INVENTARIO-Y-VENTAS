import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ListaProductos from './components/Productos/ListaProductos';
import FormProducto from './components/Productos/FormProducto';
import NuevaVenta from './components/Ventas/NuevaVenta';
import ListaVentas from './components/Ventas/ListaVentas';
import DetalleVenta from './components/Ventas/DetalleVenta';
import DetalleProducto from './components/Productos/DetalleProducto';
import ListaClientes from './components/Clientes/ListaClientes';
import FormCliente from './components/Clientes/FormCliente';
import DetalleCliente from './components/Clientes/DetalleCliente';
import ReporteInventario from './components/Reportes/ReporteInventario';
import ReporteVentas from './components/Reportes/ReporteVentas';
import Estadisticas from './components/Estadisticas/Estadisticas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />

          <Route path="/productos" element={
            <Layout>
              <ListaProductos />
            </Layout>
          } />
          <Route path="/productos/nuevo" element={
            <Layout>
              <FormProducto />
            </Layout>
          } />
          <Route path="/productos/editar/:id" element={
            <Layout>
              <FormProducto />
            </Layout>
          } />
          <Route path="/productos/:id" element={
            <Layout>
              <DetalleProducto />
            </Layout>
          } />

          <Route path="/ventas" element={
            <Layout>
              <ListaVentas />
            </Layout>
          } />
          <Route path="/ventas/nueva" element={
            <Layout>
              <NuevaVenta />
            </Layout>
          } />
          <Route path="/ventas/:id" element={
            <Layout>
              <DetalleVenta />
            </Layout>
          } />

          <Route path="/clientes" element={
            <Layout>
              <ListaClientes />
            </Layout>
          } />
          <Route path="/clientes/nuevo" element={
            <Layout>
              <FormCliente />
            </Layout>
          } />
          <Route path="/clientes/:id" element={
            <Layout>
              <DetalleCliente />
            </Layout>
          } />
          <Route path="/clientes/editar/:id" element={
            <Layout>
              <FormCliente />
            </Layout>
          } />
          <Route path="/reportes" element={
            <Layout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reportes</h2>
                <p className="text-gray-600">Selecciona un tipo de reporte</p>
                <div className="mt-6 flex gap-4 justify-center flex-wrap">
                  <a href="/reportes/inventario" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                    📦 Reporte de Inventario
                  </a>
                  <a href="/reportes/ventas" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                    💰 Reporte de Ventas
                  </a>
                </div>
              </div>
            </Layout>
          } />
          <Route path="/reportes/inventario" element={
            <Layout>
              <ReporteInventario />
            </Layout>
          } />
          <Route path="/reportes/ventas" element={
            <Layout>
              <ReporteVentas />
            </Layout>
          } />

          <Route path="/estadisticas" element={
            <Layout>
              <Estadisticas />
            </Layout>
          } />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Página no encontrada</p>
                <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
                  Volver al Dashboard
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;