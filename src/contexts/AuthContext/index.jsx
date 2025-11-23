import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = await AsyncStorage.getItem('@app:token');
      const userData = await AsyncStorage.getItem('@app:user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Erro ao verificar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (userData, token) => {
    try {
      await AsyncStorage.setItem('@app:token', String(token));
      await AsyncStorage.setItem('@app:user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@app:token');
      await AsyncStorage.removeItem('@app:user');
      setUser(null);
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
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