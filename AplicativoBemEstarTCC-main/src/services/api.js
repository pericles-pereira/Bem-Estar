import axios from 'axios';
import { Platform } from 'react-native';

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

export default api;
