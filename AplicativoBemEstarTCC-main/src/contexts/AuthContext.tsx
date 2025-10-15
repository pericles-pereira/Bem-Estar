import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate?: string;
  loginProvider?: string;
  googleId?: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  validateToken: () => Promise<boolean>;
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeGoogleSignin();
    loadUser();
  }, []);

  const initializeGoogleSignin = () => {
    GoogleSignin.configure({
      webClientId: '98741688423-a76au93esrl3hjeojjikqara6dri4e3v.apps.googleusercontent.com', // Web Client ID do projeto
      offlineAccess: true,
    });
  };

  const loadUser = async () => {
    try {
      const [userJson, token] = await AsyncStorage.multiGet(['@App:user', '@App:token']);
      
      if (userJson[1] && token[1]) {
        const userData = JSON.parse(userJson[1]);
        // Verificar se o token ainda é válido
        const isValid = await validateToken();
        if (isValid) {
          setUser(userData);
        } else {
          // Token inválido, limpar dados
          await AsyncStorage.multiRemove(['@App:user', '@App:token']);
        }
      }
    } catch (err) {
      console.log('Erro ao carregar usuário', err);
      await AsyncStorage.multiRemove(['@App:user', '@App:token']);
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async (): Promise<boolean> => {
    try {
      await api.get('/auth/me');
      return true;
    } catch (error) {
      console.log('Token inválido:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: userData, token } = response.data;
      
      await AsyncStorage.multiSet([
        ['@App:user', JSON.stringify(userData)],
        ['@App:token', token]
      ]);
      
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Erro no login';
      Alert.alert('Erro no Login', errorMessage);
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { user: userData, token } = response.data;
      
      await AsyncStorage.multiSet([
        ['@App:user', JSON.stringify(userData)],
        ['@App:token', token]
      ]);
      
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Erro no registro';
      const details = err.response?.data?.details;
      
      if (details && Array.isArray(details)) {
        Alert.alert('Erro no Cadastro', details.join('\n'));
      } else {
        Alert.alert('Erro no Cadastro', errorMessage);
      }
      throw err;
    }
  };

  const googleLogin = async () => {
    try {
      // Verificar se Google Play Services estão disponíveis
      await GoogleSignin.hasPlayServices();
      
      // Fazer login com Google
      const userInfo = await GoogleSignin.signIn();
      
      // Tratamento mais seguro dos dados do Google
      const googleData = userInfo as any; // Type assertion temporária
      
      if (googleData.idToken || (googleData.data && googleData.data.idToken)) {
        const idToken = googleData.idToken || googleData.data.idToken;
        const userData = googleData.user || googleData.data.user;
        
        // Enviar token para o backend
        const response = await api.post('/auth/google-login', {
          googleToken: idToken,
          email: userData.email,
          name: userData.name || userData.givenName + ' ' + userData.familyName
        });
        
        const { user: backendUser, token } = response.data;
        
        await AsyncStorage.multiSet([
          ['@App:user', JSON.stringify(backendUser)],
          ['@App:token', token]
        ]);
        
        setUser(backendUser);
      } else {
        throw new Error('Não foi possível obter token do Google');
      }
    } catch (error: any) {
      console.log('Erro no Google Login:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Usuário cancelou o login
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Aguarde', 'Login em andamento...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Erro', 'Google Play Services não disponível');
      } else {
        const errorMessage = error.response?.data?.error || error.message || 'Erro no login com Google';
        Alert.alert('Erro no Google Login', errorMessage);
      }
      throw error;
    }
  };

  const updateProfile = async (name: string) => {
    try {
      const response = await api.put('/auth/me', { name });
      const updatedUser = response.data.user;
      
      await AsyncStorage.setItem('@App:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erro ao atualizar perfil';
      Alert.alert('Erro', errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Chamar logout no backend para invalidar o token
      await api.post('/auth/logout');
    } catch (error) {
      console.log('Erro no logout do backend:', error);
      // Continuar com logout local mesmo se der erro no backend
    }
    
    try {
      // Logout do Google se necessário
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('Erro no logout do Google:', error);
    }
    
    // Limpar dados locais
    setUser(null);
    await AsyncStorage.multiRemove(['@App:user', '@App:token']);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      register, 
      login, 
      logout, 
      googleLogin, 
      updateProfile, 
      validateToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};