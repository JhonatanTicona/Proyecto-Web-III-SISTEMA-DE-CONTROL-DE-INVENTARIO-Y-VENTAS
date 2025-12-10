import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password, captchaId, captchaText) => {
    try {
      const response = await authAPI.login({
        email,
        password,
        captchaId,
        captchaText
      });

      if (response.data.ok) {
        const { token, usuario } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        
        setToken(token);
        setUsuario(usuario);
        
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al iniciar sesión'
      };
    }
  };

  const registro = async (datos) => {
    try {
      const response = await authAPI.registro(datos);
      
      if (response.data.ok) {
        return { 
          success: true, 
          message: response.data.mensaje,
          fortaleza: response.data.fortalezaPassword
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al registrar usuario',
        criterios: error.response?.data?.criterios
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      setToken(null);
      setUsuario(null);
    }
  };

  const esAdmin = () => {
    return usuario?.rol === 'admin';
  };

  const esVendedor = () => {
    return usuario?.rol === 'vendedor' || usuario?.rol === 'admin';
  };

  const value = {
    usuario,
    token,
    loading,
    login,
    registro,
    logout,
    esAdmin,
    esVendedor,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};