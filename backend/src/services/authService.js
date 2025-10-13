const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { getDb, getFieldValue } = require('../config/firebase');
const { createError } = require('../middleware/error');
const config = require('../config');

class AuthService {
  constructor() {
    this.db = getDb();
    this.FieldValue = getFieldValue();
    // Inicializar Google OAuth2 Client usando config
    this.googleClient = new OAuth2Client(config.GOOGLE_CLIENT_ID);
  }

  async register(userData) {
    const { name, email, password, birthDate } = userData;

    try {
      // Verificar se email já existe
      const existingUser = await this.db.collection('users')
        .where('email', '==', email)
        .get();

      if (!existingUser.empty) {
        throw createError(400, 'Email já está em uso', 'EMAIL_IN_USE');
      }

      // Criar usuário
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const userDoc = await this.db.collection('users').add({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        registrationDate: this.FieldValue.serverTimestamp(),
        loginProvider: 'email', // 'email' ou 'google'
        googleId: null // Para login com Google
      });

      // Buscar o documento criado para obter o timestamp do servidor
      const createdDoc = await userDoc.get();
      const createdData = createdDoc.data();

      // Gerar token
      const token = this.generateToken({ id: userDoc.id, name, email });

      return {
        token,
        user: {
          id: userDoc.id,
          name,
          email,
          registrationDate: createdData.registrationDate.toDate().toISOString(),
          loginProvider: 'email'
        }
      };

    } catch (error) {
      if (error.status) throw error;
      throw createError(500, 'Erro ao criar usuário', 'USER_CREATION_ERROR');
    }
  }

  async login(email, password) {
    try {
      const userSnapshot = await this.db.collection('users')
        .where('email', '==', email.toLowerCase())
        .get();

      if (userSnapshot.empty) {
        throw createError(401, 'Credenciais inválidas', 'INVALID_CREDENTIALS');
      }

      const userData = userSnapshot.docs[0].data();
      const userId = userSnapshot.docs[0].id;

      // Verificar se foi login com Google (não tem senha)
      if (userData.loginProvider === 'google') {
        throw createError(400, 'Esta conta usa login com Google', 'GOOGLE_ACCOUNT');
      }

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      
      if (!isPasswordValid) {
        throw createError(401, 'Credenciais inválidas', 'INVALID_CREDENTIALS');
      }

      const token = this.generateToken({ 
        id: userId, 
        name: userData.name, 
        email: userData.email 
      });

      return {
        token,
        user: {
          id: userId,
          name: userData.name,
          email: userData.email,
          registrationDate: userData.registrationDate ? userData.registrationDate.toDate().toISOString() : null,
          loginProvider: userData.loginProvider || 'email'
        }
      };

    } catch (error) {
      if (error.status) throw error;
      throw createError(500, 'Erro ao fazer login', 'LOGIN_ERROR');
    }
  }

  async googleLogin(googleUserData) {
    const { googleToken, email, name } = googleUserData;

    try {
      // Verificar e validar o googleToken com Google API
      let googlePayload;
      
      if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_ID !== 'seu_google_client_id_aqui.apps.googleusercontent.com') {
        try {
          const ticket = await this.googleClient.verifyIdToken({
            idToken: googleToken,
            audience: config.GOOGLE_CLIENT_ID
          });
          googlePayload = ticket.getPayload();
          
          // Verificar se o email do token corresponde ao enviado
          if (googlePayload.email !== email) {
            throw createError(400, 'Email do token Google não corresponde', 'GOOGLE_EMAIL_MISMATCH');
          }
        } catch (error) {
          console.error('Erro na verificação do token Google:', error);
          throw createError(401, 'Token Google inválido', 'INVALID_GOOGLE_TOKEN');
        }
      } else {
        // Fallback para desenvolvimento: simular dados do Google
        console.warn('⚠️  GOOGLE_CLIENT_ID não configurado - usando modo de desenvolvimento');
        googlePayload = {
          sub: `google_${email.replace('@', '_').replace('.', '_')}`,
          email: email,
          name: name
        };
      }
      
      // Verificar se usuário já existe (por email)
      const existingUser = await this.db.collection('users')
        .where('email', '==', email.toLowerCase())
        .get();

      let userId, userData;

      if (!existingUser.empty) {
        // Usuário existe, atualizar com dados do Google se necessário
        const userDoc = existingUser.docs[0];
        userId = userDoc.id;
        userData = userDoc.data();

        if (userData.loginProvider !== 'google') {
          await this.db.collection('users').doc(userId).update({
            googleId: googlePayload.sub, // ID único do Google
            loginProvider: 'google'
          });
          userData.loginProvider = 'google';
          userData.googleId = googlePayload.sub;
        }
      } else {
        // Criar novo usuário com Google
        const userDoc = await this.db.collection('users').add({
          name: name.trim(),
          email: email.toLowerCase(),
          googleId: googlePayload.sub, // ID único do Google
          loginProvider: 'google',
          password: null, // Sem senha para login Google
          registrationDate: this.FieldValue.serverTimestamp()
        });

        userId = userDoc.id;
        
        // Buscar documento criado para obter timestamp
        const createdDoc = await userDoc.get();
        userData = createdDoc.data();
      }

      const token = this.generateToken({ id: userId, name: userData.name, email });

      return {
        token,
        user: {
          id: userId,
          name: userData.name,
          email,
          registrationDate: userData.registrationDate ? userData.registrationDate.toDate().toISOString() : null,
          loginProvider: 'google',
          googleId: userData.googleId
        }
      };

    } catch (error) {
      console.error('Erro no login Google:', error);
      throw createError(500, 'Erro no login com Google', 'GOOGLE_LOGIN_ERROR');
    }
  }

  async getUserById(userId) {
    try {
      const userDoc = await this.db.collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        throw createError(404, 'Usuário não encontrado', 'USER_NOT_FOUND');
      }

      const userData = userDoc.data();
      const { password, ...userInfo } = userData;

      return {
        id: userId,
        name: userInfo.name,
        email: userInfo.email,
        registrationDate: userInfo.registrationDate ? userInfo.registrationDate.toDate().toISOString() : null,
        loginProvider: userInfo.loginProvider || 'email',
        ...(userInfo.googleId && { googleId: userInfo.googleId })
      };

    } catch (error) {
      if (error.status) throw error;
      throw createError(500, 'Erro ao buscar usuário', 'USER_FETCH_ERROR');
    }
  }

  async updateUser(userId, updateData) {
    try {
      const { name } = updateData;
      const updatePayload = {};

      if (name !== undefined) {
        updatePayload.name = name.trim();
      }

      if (Object.keys(updatePayload).length === 0) {
        throw createError(400, 'Nenhum dado válido para atualizar', 'NO_UPDATE_DATA');
      }

      updatePayload.updatedAt = this.FieldValue.serverTimestamp();

      await this.db.collection('users').doc(userId).update(updatePayload);

      // Buscar dados atualizados
      const updatedUser = await this.getUserById(userId);

      return {
        user: updatedUser
      };

    } catch (error) {
      if (error.status) throw error;
      throw createError(500, 'Erro ao atualizar usuário', 'USER_UPDATE_ERROR');
    }
  }

  generateToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET, { 
      expiresIn: config.JWT_EXPIRES_IN || '7d' 
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      throw createError(401, 'Token inválido', 'INVALID_TOKEN');
    }
  }
}

module.exports = new AuthService();