const { getDb } = require('../config/firebase');
const { createError } = require('../middleware/error');
const admin = require('firebase-admin');

// Mood types based on frontend
const MOOD_TYPES = [
  { level: 1, name: 'Triste', icon: 'emoticon-sad-outline', color: '#E74C3C' },
  { level: 2, name: 'Ansioso', icon: 'emoticon-confused-outline', color: '#F39C12' },
  { level: 3, name: 'Neutro', icon: 'emoticon-neutral-outline', color: '#F1C40F' },
  { level: 4, name: 'Feliz', icon: 'emoticon-happy-outline', color: '#2ECC71' },
  { level: 5, name: 'Motivado', icon: 'emoticon-excited-outline', color: '#9B59B6' },
];

class MoodService {
  constructor() {
    this.db = getDb();
    this.collection = 'mood_entries';
  }

  async createMoodEntry(userId, moodData) {
    try {
      const { moodType, level, shortDescription } = moodData;
      
      // Validate mood type and level
      const validMoodTypes = ['Triste', 'Ansioso', 'Neutro', 'Feliz', 'Motivado'];
      if (!validMoodTypes.includes(moodType)) {
        throw createError(400, 'Tipo de humor deve ser: Triste, Ansioso, Neutro, Feliz ou Motivado', 'INVALID_MOOD_TYPE');
      }

      if (!level || level < 1 || level > 5) {
        throw createError(400, 'Nível deve estar entre 1 e 5', 'INVALID_MOOD_LEVEL');
      }

      const moodEntry = {
        userId,
        moodType, // String: "Triste", "Feliz", etc.
        level, // Number 1-5
        registrationDate: new Date().toISOString(),
        shortDescription: shortDescription || '',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await this.db.collection(this.collection).add(moodEntry);
      
      return {
        id: docRef.id,
        ...moodEntry
      };
    } catch (error) {
      console.error('Error creating mood entry:', error);
      if (error.status) throw error;
      throw createError(500, 'Erro interno do servidor', 'INTERNAL_ERROR');
    }
  }

  async getUserMoodEntries(userId, options = {}) {
    try {
      const { startDate, endDate, limit = 30 } = options;
      
      // Query simples apenas por userId (sem índice composto necessário)
      let query = this.db.collection(this.collection)
        .where('userId', '==', userId);

      const snapshot = await query.get();
      
      if (snapshot.empty) {
        return [];
      }

      let entries = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        
        entries.push({
          id: doc.id,
          userId: data.userId,
          moodType: data.moodType,
          level: data.level,
          shortDescription: data.shortDescription || '',
          registrationDate: data.registrationDate,
          createdAt: data.createdAt,
          ...(data.updatedAt && { updatedAt: data.updatedAt })
        });
      });

      // Filtrar por data em JavaScript se necessário
      if (startDate) {
        entries = entries.filter(entry => entry.registrationDate >= startDate);
      }

      if (endDate) {
        entries = entries.filter(entry => entry.registrationDate <= endDate);
      }

      // Sempre ordenar em JavaScript por registrationDate (mais recente primeiro)
      entries.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));

      // Aplicar limite após ordenação
      return entries.slice(0, parseInt(limit));
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      console.error('Error details:', error.message);
      throw createError(500, 'Erro interno do servidor', 'INTERNAL_ERROR');
    }
  }

  async updateMoodEntry(entryId, userId, updateData) {
    try {
      const entryRef = this.db.collection(this.collection).doc(entryId);
      const doc = await entryRef.get();

      if (!doc.exists) {
        throw createError(404, 'Registro de humor não encontrado', 'MOOD_NOT_FOUND');
      }

      const entryData = doc.data();
      if (entryData.userId !== userId) {
        throw createError(403, 'Acesso negado', 'ACCESS_DENIED');
      }

      const { moodType, level, shortDescription } = updateData;
      const updatedData = {};

      if (moodType !== undefined) {
        const validMoodTypes = ['Triste', 'Ansioso', 'Neutro', 'Feliz', 'Motivado'];
        if (!validMoodTypes.includes(moodType)) {
          throw createError(400, 'Tipo de humor deve ser: Triste, Ansioso, Neutro, Feliz ou Motivado', 'INVALID_MOOD_TYPE');
        }
        updatedData.moodType = moodType;
      }

      if (level !== undefined) {
        if (level < 1 || level > 5) {
          throw createError(400, 'Nível deve estar entre 1 e 5', 'INVALID_MOOD_LEVEL');
        }
        updatedData.level = level;
      }

      if (shortDescription !== undefined) {
        updatedData.shortDescription = shortDescription;
      }

      if (Object.keys(updatedData).length === 0) {
        throw createError(400, 'Nenhum dado válido para atualizar', 'NO_UPDATE_DATA');
      }

      updatedData.updatedAt = new Date().toISOString();

      await entryRef.update(updatedData);

      return {
        id: entryId,
        userId: entryData.userId,
        moodType: updatedData.moodType || entryData.moodType,
        level: updatedData.level || entryData.level,
        shortDescription: updatedData.shortDescription !== undefined ? updatedData.shortDescription : entryData.shortDescription,
        registrationDate: entryData.registrationDate,
        createdAt: entryData.createdAt,
        updatedAt: updatedData.updatedAt
      };
    } catch (error) {
      console.error('Error updating mood entry:', error);
      if (error.status) throw error;
      throw createError(500, 'Erro interno do servidor', 'INTERNAL_ERROR');
    }
  }

  async deleteMoodEntry(entryId, userId) {
    try {
      const entryRef = this.db.collection(this.collection).doc(entryId);
      const doc = await entryRef.get();

      if (!doc.exists) {
        throw createError(404, 'Registro de humor não encontrado', 'MOOD_NOT_FOUND');
      }

      const entryData = doc.data();
      if (entryData.userId !== userId) {
        throw createError(403, 'Acesso negado', 'ACCESS_DENIED');
      }

      await entryRef.delete();
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      if (error.status) throw error;
      throw createError(500, 'Erro interno do servidor', 'INTERNAL_ERROR');
    }
  }

  async getMoodStats(userId, options = {}) {
    try {
      const { startDate, endDate } = options;
      
      let query = this.db.collection(this.collection)
        .where('userId', '==', userId);

      if (startDate) {
        query = query.where('registrationDate', '>=', startDate);
      }

      if (endDate) {
        query = query.where('registrationDate', '<=', endDate);
      }

      const snapshot = await query.get();
      
      if (snapshot.empty) {
        return {
          totalEntries: 0,
          averageMood: 0,
          moodDistribution: {},
          lastEntry: null,
          trend: 'stable'
        };
      }

      const entries = [];
      snapshot.forEach(doc => {
        entries.push(doc.data());
      });

      const totalEntries = entries.length;
      const moodLevels = entries.map(entry => entry.level);
      const averageMood = moodLevels.reduce((sum, level) => sum + level, 0) / totalEntries;

      // Mood type distribution
      const moodDistribution = {};
      MOOD_TYPES.forEach(mood => {
        moodDistribution[mood.name] = entries.filter(entry => entry.level === mood.level).length;
      });

      // Last entry
      const sortedEntries = entries.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
      const lastEntry = sortedEntries[0] || null;

      // Trend (last 7 days vs previous 7 days)
      const trend = this.calculateMoodTrend(entries);

      return {
        totalEntries,
        averageMood: Math.round(averageMood * 100) / 100,
        moodDistribution,
        lastEntry,
        trend
      };
    } catch (error) {
      console.error('Error fetching mood statistics:', error);
      throw createError(500, 'Internal server error', 'INTERNAL_ERROR');
    }
  }

  calculateMoodTrend(entries) {
    if (entries.length < 7) {
      return 'stable';
    }

    const sortedEntries = entries.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
    
    const recent = sortedEntries.slice(0, 7);
    const previous = sortedEntries.slice(7, 14);
    
    if (previous.length === 0) {
      return 'stable';
    }

    const recentAvg = recent.reduce((sum, entry) => sum + entry.level, 0) / recent.length;
    const previousAvg = previous.reduce((sum, entry) => sum + entry.level, 0) / previous.length;
    
    const difference = recentAvg - previousAvg;
    
    if (difference > 0.3) return 'improving';
    if (difference < -0.3) return 'declining';
    return 'stable';
  }

  // Method to get available mood types
  getMoodTypes() {
    return MOOD_TYPES;
  }
}

module.exports = new MoodService();