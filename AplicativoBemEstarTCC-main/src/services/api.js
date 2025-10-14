import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IP da máquina no Wi-Fi (substituindo pelo localhost que não funciona no Android físico)
const LOCAL_IP = '10.0.0.2';

const baseURL =
  Platform.OS === 'android'
    ? `http://${LOCAL_IP}:3000/api` // Android físico
    : 'http://localhost:3000/api'; // iOS simulado

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@App:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Erro ao recuperar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token inválido ou expirado - limpar dados e redirecionar para login
      await AsyncStorage.multiRemove(['@App:token', '@App:user']);
      // Emitir evento para o AuthContext saber que precisa deslogar
      if (global.forceLogout) {
        global.forceLogout();
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
