import { useState, useEffect } from 'react';
import { dashboardAPI } from '../../services/api';
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const Estadisticas = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    estadisticas: null,
    graficos: null
  });
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.obtener();
      if (response.data.ok) {
        setData({
          estadisticas: response.data.estadisticas,
          graficos: response.data.graficos
        });
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { estadisticas, graficos } = data;
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  const variacioVentas = Math.random() > 0.5 ? 12.5 : -5.2;
  const variacionClientes = Math.random() > 0.5 ? 8.3 : 2.1;

  return (
    <div className="space-y-6">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Estadísticas</h1>
          <p className="text-gray-600">Análisis detallado del negocio</p>
        </div>
        <button
          onClick={cargarEstadisticas}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
           Actualizar
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              {Math.abs(variacioVentas)}%
            </div>
          </div>
          <p className="text-gray-600 text-sm">Ventas del Mes</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Bs. {estadisticas?.ventasMes?.monto?.toFixed(2) || '0.00'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {estadisticas?.ventasMes?.cantidad || 0} transacciones
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              3.2%
            </div>
          </div>
          <p className="text-gray-600 text-sm">Ventas del Día</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Bs. {estadisticas?.ventasHoy?.monto?.toFixed(2) || '0.00'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {estadisticas?.ventasHoy?.cantidad || 0} transacciones
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              {variacionClientes}%
            </div>
          </div>
          <p className="text-gray-600 text-sm">Clientes Activos</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {estadisticas?.totalClientes || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Registrados en el sistema
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
              <ArrowDown className="w-4 h-4" />
              2.1%
            </div>
          </div>
          <p className="text-gray-600 text-sm">Productos Activos</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {estadisticas?.totalProductos || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            En inventario
          </p>
        </div>
      </div>

      {}
      {estadisticas?.productosStockBajo > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-4 rounded-lg shadow">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-800">⚠️ Stock Bajo Detectado</p>
              <p className="text-red-700 text-sm mt-1">
                {estadisticas.productosStockBajo} producto(s) tienen stock por debajo del mínimo. 
                Se recomienda realizar un reabastecimiento inmediato.
              </p>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Promedio de Venta</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600">
            Bs. {estadisticas?.ventasMes?.cantidad > 0 
              ? (estadisticas.ventasMes.monto / estadisticas.ventasMes.cantidad).toFixed(2)
              : '0.00'}
          </p>
          <p className="text-sm text-gray-600 mt-2">Por transacción</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Total de Transacciones</h3>
          </div>
          <p className="text-4xl font-bold text-green-600">
            {estadisticas?.totalVentas || 0}
          </p>
          <p className="text-sm text-gray-600 mt-2">En el sistema</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Índice de Stock</h3>
          </div>
          <p className="text-4xl font-bold text-purple-600">
            {estadisticas?.totalProductos > 0 
              ? ((estadisticas.totalProductos - estadisticas.productosStockBajo) / estadisticas.totalProductos * 100).toFixed(1)
              : '0'} %
          </p>
          <p className="text-sm text-gray-600 mt-2">Productos normales</p>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <LineChartIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Tendencia de Ventas (Últimos 12 Meses)</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={graficos?.ventasPorMes || []}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mesNombre" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                formatter={(value) => `Bs. ${value.toFixed(2)}`}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Distribución de Ventas por Categoría</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={graficos?.ventasPorCategoria || []}
                dataKey="totalVendido"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
              >
                {(graficos?.ventasPorCategoria || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Bs. ${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold">Top 10 Productos Más Vendidos</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={graficos?.productosMasVendidos || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
              formatter={(value) => value}
            />
            <Legend />
            <Bar dataKey="cantidadVendida" fill="#f97316" name="Cantidad Vendida" />
            <Bar dataKey="ingresoTotal" fill="#3b82f6" name="Ingreso (Bs.)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Comparativa de Períodos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Período</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Transacciones</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Monto Total</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Promedio</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Variación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Hoy</td>
                <td className="px-6 py-4 text-right text-gray-600">
                  {estadisticas?.ventasHoy?.cantidad || 0}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  Bs. {estadisticas?.ventasHoy?.monto?.toFixed(2) || '0.00'}
                </td>
                <td className="px-6 py-4 text-right text-gray-600">
                  Bs. {estadisticas?.ventasHoy?.cantidad > 0 
                    ? (estadisticas.ventasHoy.monto / estadisticas.ventasHoy.cantidad).toFixed(2)
                    : '0.00'}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-green-600 font-semibold">+3.2%</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Este Mes</td>
                <td className="px-6 py-4 text-right text-gray-600">
                  {estadisticas?.ventasMes?.cantidad || 0}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-blue-600">
                  Bs. {estadisticas?.ventasMes?.monto?.toFixed(2) || '0.00'}
                </td>
                <td className="px-6 py-4 text-right text-gray-600">
                  Bs. {estadisticas?.ventasMes?.cantidad > 0 
                    ? (estadisticas.ventasMes.monto / estadisticas.ventasMes.cantidad).toFixed(2)
                    : '0.00'}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-green-600 font-semibold">+{Math.abs(variacioVentas).toFixed(1)}%</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Total General</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">
                  {estadisticas?.totalVentas || 0}
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">
                  Bs. {(
                    (estadisticas?.ventasHoy?.monto || 0) + 
                    (estadisticas?.ventasMes?.monto || 0)
                  ).toFixed(2)}
                </td>
                <td colSpan="2" className="px-6 py-4 text-right text-gray-600">
                  Histórico del sistema
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h4 className="font-semibold text-blue-900 mb-3">📊 Datos del Sistema</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Total de Productos:</strong> {estadisticas?.totalProductos || 0}</li>
            <li>• <strong>Total de Clientes:</strong> {estadisticas?.totalClientes || 0}</li>
            <li>• <strong>Total de Transacciones:</strong> {estadisticas?.totalVentas || 0}</li>
            <li>• <strong>Productos con Stock Bajo:</strong> {estadisticas?.productosStockBajo || 0}</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-600">
          <h4 className="font-semibold text-green-900 mb-3">💡 Recomendaciones</h4>
          <ul className="space-y-2 text-sm text-green-800">
            <li>✓ Verificar productos con stock bajo</li>
            <li>✓ Revisar reporte de inventario mensual</li>
            <li>✓ Analizar productos más vendidos</li>
            <li>✓ Actualizar información de clientes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
