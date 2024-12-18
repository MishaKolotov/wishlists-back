const express = require('express');
const { register, login } = require('../controllers/authController'); // Импорт контроллеров

const router = express.Router();

// POST /api/auth/register - Регистрация пользователя
router.post('/register', register);

// POST /api/auth/login - Логин пользователя
router.post('/login', login);

module.exports = router; // Экспорт маршрутов
