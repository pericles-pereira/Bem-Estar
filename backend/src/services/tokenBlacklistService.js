const { getDb } = require('../config/firebase');

class TokenBlacklistService {
  constructor() {
    this.db = getDb();
    this.collection = 'blacklisted_tokens';
  }

  // Adicionar token à blacklist
  async blacklistToken(token, userId, expiresAt) {
    try {
      // Validar parâmetros obrigatórios
      if (!token) {
        throw new Error('Token é obrigatório');
      }
      if (!userId) {
        throw new Error('UserId é obrigatório');
      }
      if (!expiresAt) {
        throw new Error('ExpiresAt é obrigatório');
      }

      await this.db.collection(this.collection).add({
        token: token,
        userId: userId,
        blacklistedAt: new Date().toISOString(),
        expiresAt: expiresAt // Para limpeza automática
      });
    } catch (error) {
      console.error('❌ Error blacklisting token:', error.message);
      console.error('Debug info:', { token: token ? 'present' : 'missing', userId, expiresAt });
      throw error;
    }
  }

  // Verificar se token está na blacklist
  async isTokenBlacklisted(token) {
    try {
      const snapshot = await this.db.collection(this.collection)
        .where('token', '==', token)
        .limit(1)
        .get();
      
      return !snapshot.empty;
    } catch (error) {
      console.error('Error checking blacklist:', error);
      return false; // Em caso de erro, permite o acesso
    }
  }

  // Limpar tokens expirados (executar periodicamente)
  async cleanupExpiredTokens() {
    try {
      const now = new Date().toISOString();
      const snapshot = await this.db.collection(this.collection)
        .where('expiresAt', '<', now)
        .get();
      
      const batch = this.db.batch();
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error cleaning up blacklisted tokens:', error);
    }
  }

  // Invalidar todos os tokens de um usuário
  async blacklistAllUserTokens(userId) {
    try {
      const snapshot = await this.db.collection(this.collection)
        .where('userId', '==', userId)
        .get();
      
      const batch = this.db.batch();
      snapshot.forEach(doc => {
        batch.update(doc.ref, {
          blacklistedAt: new Date().toISOString()
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error blacklisting user tokens:', error);
      throw error;
    }
  }
}

module.exports = new TokenBlacklistService();