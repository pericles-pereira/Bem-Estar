const authService = require('../services/authService');
const tokenBlacklistService = require('../services/tokenBlacklistService');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: result.user,
        token: result.token
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({
        message: 'Login realizado com sucesso',
        user: result.user,
        token: result.token
      });
    } catch (error) {
      next(error);
    }
  }

  async googleLogin(req, res, next) {
    try {
      const { googleToken, email, name } = req.body;
      
      if (!googleToken || !email || !name) {
        return res.status(400).json({
          error: 'Dados do Google incompletos',
          required: ['googleToken', 'email', 'name']
        });
      }

      const result = await authService.googleLogin({ googleToken, email, name });
      res.json({
        message: 'Login com Google realizado com sucesso',
        user: result.user,
        token: result.token
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await authService.getUserById(req.user.id);
      res.json({
        user: user
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req, res, next) {
    try {
      const result = await authService.updateUser(req.user.id, req.body);
      res.json({
        message: 'Usuário atualizado com sucesso',
        user: result.user
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.token; // Token salvo pelo middleware
      
      if (token) {
        // Decodificar o token para pegar a data de expiração
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp * 1000).toISOString();
        
        // Adicionar token à blacklist
        await tokenBlacklistService.blacklistToken(token, req.user.id, expiresAt);
      }
      
      res.json({
        message: 'Logout realizado com sucesso - token invalidado'
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Mesmo com erro na blacklist, confirma o logout
      res.json({
        message: 'Logout realizado com sucesso'
      });
    }
  }
}

module.exports = new AuthController();