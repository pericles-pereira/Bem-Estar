const jwt = require('jsonwebtoken');
const config = require('../config');
const tokenBlacklistService = require('../services/tokenBlacklistService');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acesso requerido',
      code: 'TOKEN_REQUIRED'
    });
  }

  // Verificar se o token está na blacklist
  try {
    const isBlacklisted = await tokenBlacklistService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(403).json({ 
        error: 'Token foi invalidado',
        code: 'TOKEN_BLACKLISTED'
      });
    }
  } catch (error) {
    console.error('Error checking token blacklist:', error);
    // Continue com a verificação normal em caso de erro
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Token inválido ou expirado',
        code: 'TOKEN_INVALID'
      });
    }
    
    req.user = user;
    req.token = token; // Salvar o token para uso posterior
    next();
  });
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  optionalAuth
};