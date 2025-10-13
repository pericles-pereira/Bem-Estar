const config = require('../config');

const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado:', err);

  // Erro customizado
  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
      code: err.code || 'CUSTOM_ERROR'
    });
  }

  // Erro do Firebase
  if (err.code && err.code.startsWith('permission-denied')) {
    return res.status(403).json({
      error: 'Acesso negado',
      code: 'FIREBASE_PERMISSION_DENIED'
    });
  }

  // Erro de validação do Firestore
  if (err.code === 'invalid-argument') {
    return res.status(400).json({
      error: 'Dados inválidos',
      code: 'INVALID_DATA'
    });
  }

  // Erro JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido',
      code: 'JWT_INVALID'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado',
      code: 'JWT_EXPIRED'
    });
  }

  // Erro genérico
  return res.status(500).json({
    error: config.isDevelopment ? err.message : 'Erro interno do servidor',
    code: 'INTERNAL_ERROR',
    ...(config.isDevelopment && { stack: err.stack })
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    error: `Rota ${req.method} ${req.path} não encontrada`,
    code: 'ROUTE_NOT_FOUND'
  });
};

const createError = (status, message, code = null) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

module.exports = {
  errorHandler,
  notFound,
  createError
};