import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);
      const savedToken = await AsyncStorage.getItem('@app:token');
      const savedUserData = await AsyncStorage.getItem('@app:user');
      
      if (savedToken && savedUserData) {
        setToken(savedToken);
        setUser(JSON.parse(savedUserData));
        setIsAuthenticated(true);
        
        // await verifyToken(savedToken);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (tokenToVerify) => {
    try {
      await authAPI.verifyToken();
      return true;
    } catch (error) {
      console.error('Token inválido:', error);
      await signOut();
      return false;
    }
  };

  const signIn = async (userData, tokenValue) => {
    try {
      await AsyncStorage.setItem('@app:token', String(tokenValue));
      await AsyncStorage.setItem('@app:user', JSON.stringify(userData));
      
      setToken(tokenValue);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.data.status === 'success') {
        const { token: newToken, user: userData } = response.data;
        await signIn(userData, newToken);
        return { success: true, data: response.data };
      } else {
        throw new Error(response.data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@app:token');
      await AsyncStorage.removeItem('@app:user');
      
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const logout = signOut;

  const updateUser = async (newUserData) => {
    try {
      const updatedUser = { ...user, ...newUserData };
      await AsyncStorage.setItem('@app:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { success: false, error: error.message };
    }
  };

  const updateToken = async (newToken) => {
    try {
      await AsyncStorage.setItem('@app:token', String(newToken));
      setToken(newToken);
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      return { success: false, error: error.message };
    }
  };

  const getToken = async () => {
    if (token) return token;
    return await AsyncStorage.getItem('@app:token');
  };

  const refreshUser = async () => {
    try {
      const savedUserData = await AsyncStorage.getItem('@app:user');
      if (savedUserData) {
        setUser(JSON.parse(savedUserData));
        return { success: true };
      }
      return { success: false, error: 'Nenhum usuário salvo' };
    } catch (error) {
      console.error('Erro ao recarregar usuário:', error);
      return { success: false, error: error.message };
    }
  };

  const contextValue = {
    user,
    token,
    loading,
    isAuthenticated,
    
    signIn,
    signOut,
    login,
    logout,
    
    updateUser,
    updateToken,
    getToken,
    refreshUser,
    checkUser,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;