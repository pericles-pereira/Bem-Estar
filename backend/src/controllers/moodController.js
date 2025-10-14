const moodService = require('../services/moodService');

class MoodController {
  async getMoodEntries(req, res, next) {
    try {
      const userId = req.user.id;
      const entries = await moodService.getUserMoodEntries(userId, req.query);
      res.json({
        moodEntries: entries,
        total: entries.length
      });
    } catch (error) {
      next(error);
    }
  }

  async createMoodEntry(req, res, next) {
    try {
      const userId = req.user.id;
      const entry = await moodService.createMoodEntry(userId, req.body);
      res.status(201).json({
        message: 'Registro de humor criado com sucesso',
        moodEntry: entry
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMoodEntry(req, res, next) {
    try {
      const userId = req.user.id;
      const entry = await moodService.updateMoodEntry(
        req.params.id,
        userId,
        req.body
      );
      res.json({
        message: 'Registro de humor atualizado com sucesso',
        moodEntry: entry
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMoodEntry(req, res, next) {
    try {
      const userId = req.user.id;
      await moodService.deleteMoodEntry(req.params.id, userId);
      res.json({ 
        message: 'Registro de humor deletado com sucesso' 
      });
    } catch (error) {
      next(error);
    }
  }

  async getMoodStats(req, res, next) {
    try {
      console.log('getMoodStats controller - received request:', {
        userId: req.user?.id,
        query: req.query,
        method: req.method,
        url: req.url
      });
      
      const userId = req.user.id;
      const { startDate, endDate } = req.query;
      
      console.log('getMoodStats called with:', { userId, startDate, endDate });
      
      if (!userId) {
        console.error('No userId found in request');
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        });
      }
      
      const stats = await moodService.getMoodStats(userId, startDate, endDate);
      
      console.log('Successfully got stats, returning response');
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error in getMoodStats controller:', error);
      next(error);
    }
  }
}

module.exports = new MoodController();