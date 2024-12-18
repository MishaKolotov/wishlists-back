const express = require('express');
const { getFriendFeed } = require('../controllers/feedController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/feed - Получить ленту активности друзей
router.get('/', authMiddleware, getFriendFeed);

module.exports = router;
