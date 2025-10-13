const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateDate = (dateString) => {
  if (!dateString) return true; // Data é opcional
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const validateMoodLevel = (level) => {
  return Number.isInteger(level) && level >= 1 && level <= 5;
};

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Validações obrigatórias
  if (!name || name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Email inválido');
  }

  if (!password || password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  // Validações opcionais
  if (req.body.birthDate && !validateDate(req.body.birthDate)) {
    errors.push('Data de nascimento deve estar no formato YYYY-MM-DD');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !validateEmail(email)) {
    errors.push('Email inválido');
  }

  if (!password) {
    errors.push('Senha é obrigatória');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: errors
    });
  }

  next();
};

const validateMood = (req, res, next) => {
  const { moodType, level, shortDescription } = req.body;
  const errors = [];

  // Validar moodType
  const validMoodTypes = ['Triste', 'Ansioso', 'Neutro', 'Feliz', 'Motivado'];
  if (!moodType || !validMoodTypes.includes(moodType)) {
    errors.push('Tipo de humor deve ser: Triste, Ansioso, Neutro, Feliz ou Motivado');
  }

  // Validar level
  if (!level || !Number.isInteger(level) || level < 1 || level > 5) {
    errors.push('Nível deve estar entre 1 e 5');
  }

  // Validar shortDescription (opcional)
  if (shortDescription && typeof shortDescription !== 'string') {
    errors.push('Descrição deve ser uma string');
  }

  if (shortDescription && shortDescription.length > 500) {
    errors.push('Descrição deve ter no máximo 500 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: errors
    });
  }

  next();
};

const validateGoogleLogin = (req, res, next) => {
  const { googleToken, email, name } = req.body;
  const errors = [];

  if (!googleToken || typeof googleToken !== 'string') {
    errors.push('Google Token é obrigatório');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Email válido é obrigatório');
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateMood,
  validateGoogleLogin,
  validateEmail,
  validateDate,
  validateMoodLevel
};