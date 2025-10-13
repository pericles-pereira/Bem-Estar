const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const { authenticateToken } = require('../middleware/auth');
const { validateMood } = require('../middleware/validation');

// Aplicar autenticação a todas as rotas
router.use(authenticateToken);

// GET /api/mood - Buscar entradas de humor do usuário
router.get('/', moodController.getMoodEntries);

// POST /api/mood - Criar nova entrada de humor
router.post('/', validateMood, moodController.createMoodEntry);

// PUT /api/mood/:id - Atualizar entrada de humor
router.put('/:id', validateMood, moodController.updateMoodEntry);

// DELETE /api/mood/:id - Deletar entrada de humor
router.delete('/:id', moodController.deleteMoodEntry);

// GET /api/mood/stats - Buscar estatísticas de humor
router.get('/stats', moodController.getMoodStats);

module.exports = router;