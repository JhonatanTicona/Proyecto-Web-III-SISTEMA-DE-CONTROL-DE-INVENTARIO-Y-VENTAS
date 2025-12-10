import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clientesAPI } from '../../services/api';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  User,
  Edit,
  Trash2,
  Calendar
} from 'lucide-react';

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCliente();
  }, [id]);

  const cargarCliente = async () => {
    try {
      setLoading(true);
      const response = await clientesAPI.obtener(id);
      if (response.data.ok) {
        setCliente(response.data.cliente);
      } else {
        alert('Cliente no encontrado');
        navigate('/clientes');
      }
    } catch (error) {
      console.error('Error al cargar cliente:', error);
      alert('Error al cargar el cliente');
      navigate('/clientes');
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

  if (!cliente) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cliente no encontrado</p>
        <button
          onClick={() => navigate('/clientes')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Volver a clientes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/clientes')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{cliente.nombre}</h1>
          <p className="text-gray-600">Detalles del cliente</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información personal */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-semibold text-gray-900">{cliente.nombre}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">NIT/CI</p>
                <p className="font-semibold text-gray-900">{cliente.nit || 'No registrado'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-semibold text-gray-900">
                  {cliente.telefono ? (
                    <a href={`tel:${cliente.telefono}`} className="text-blue-600 hover:text-blue-700">
                      {cliente.telefono}
                    </a>
                  ) : (
                    'No registrado'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">
                  {cliente.email ? (
                    <a href={`mailto:${cliente.email}`} className="text-blue-600 hover:text-blue-700">
                      {cliente.email}
                    </a>
                  ) : (
                    'No registrado'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h2>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Dirección</p>
                <p className="font-semibold text-gray-900 whitespace-pre-wrap">
                  {cliente.direccion || 'No registrada'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ID del Cliente</p>
                <p className="font-semibold text-gray-900">{cliente.id}</p>
              </div>
            </div>

            {cliente.fecha_creacion && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Registro</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(cliente.fecha_creacion).toLocaleDateString('es-BO')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5" />
            Editar Cliente
          </button>
          <button
            onClick={() => navigate('/clientes')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h4 className="font-semibold text-blue-900 mb-2">Estado</h4>
          <p className="text-blue-800">
            Cliente activo en el sistema
          </p>
        </div>

        <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-600">
          <h4 className="font-semibold text-green-900 mb-2">Información</h4>
          <p className="text-green-800">
            Todos los datos están actualizados
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetalleCliente;
