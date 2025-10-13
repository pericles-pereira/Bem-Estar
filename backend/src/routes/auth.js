const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateRegister, validateLogin, validateGoogleLogin } = require('../middleware/validation');

// Rotas públicas
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/google-login', validateGoogleLogin, authController.googleLogin);

// Rotas protegidas (requerem autenticação)
router.use(authenticateToken);

router.get('/me', authController.getMe);
router.put('/me', authController.updateMe);
router.post('/logout', authController.logout);

module.exports = router;