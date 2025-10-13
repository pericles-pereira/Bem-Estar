const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

// Inicializar Firebase ANTES de importar outras dependências
const { initializeFirebase } = require('./config/firebase');
initializeFirebase();

// Importar middlewares
const { errorHandler } = require('./middleware/error');

// Importar rotas (após Firebase ser inicializado)
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const config = require('./config');
const packageInfo = require('../package.json');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Rota de status
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Bem-Estar funcionando!',
    version: packageInfo.version,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      mood: '/api/mood'
    }
  });
});

// Rota para listar tipos de humor disponíveis
app.get('/api/mood-types', (req, res) => {
  const moodTypes = [
    { level: 1, name: 'Triste', icon: 'emoticon-sad-outline', color: '#E74C3C' },
    { level: 2, name: 'Ansioso', icon: 'emoticon-confused-outline', color: '#F39C12' },
    { level: 3, name: 'Neutro', icon: 'emoticon-neutral-outline', color: '#F1C40F' },
    { level: 4, name: 'Feliz', icon: 'emoticon-happy-outline', color: '#2ECC71' },
    { level: 5, name: 'Motivado', icon: 'emoticon-excited-outline', color: '#9B59B6' },
  ];
  
  res.json(moodTypes);
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Rota para endpoints não encontrados
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint não encontrado',
    path: req.originalUrl,
    available_endpoints: [
      'GET /',
      'GET /api/mood-types',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/auth/google-login',
      'GET /api/auth/me',
      'PUT /api/auth/me',
      'POST /api/auth/logout',
      'GET /api/mood',
      'POST /api/mood',
      'PUT /api/mood/:id',
      'DELETE /api/mood/:id',
      'GET /api/mood/stats'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`🔥 Firebase conectado com sucesso`);
  console.log(`📋 Endpoints principais:`);
  console.log(`   🔐 Autenticação: http://localhost:${PORT}/api/auth`);
  console.log(`   😊 Humor: http://localhost:${PORT}/api/mood`);
});

module.exports = app;