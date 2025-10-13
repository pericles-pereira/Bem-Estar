const moodService = require('../services/moodService');

class MoodController {
  async getMoodEntries(req, res, next) {
    try {
      const entries = await moodService.getUserMoodEntries(req.user.id, req.query);
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
      const entry = await moodService.createMoodEntry(req.user.id, req.body);
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
      const entry = await moodService.updateMoodEntry(
        req.params.id,
        req.user.id,
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
      await moodService.deleteMoodEntry(req.params.id, req.user.id);
      res.json({ 
        message: 'Registro de humor deletado com sucesso' 
      });
    } catch (error) {
      next(error);
    }
  }

  async getMoodStats(req, res, next) {
    try {
      const stats = await moodService.getMoodStats(req.user.id, req.query);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MoodController();