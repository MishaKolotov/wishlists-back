const express = require('express');
const { addFriend, removeFriend, getFriends } = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Добавить друга
router.post('/add', authMiddleware, addFriend);

// Удалить друга
router.delete('/remove/:friendId', authMiddleware, removeFriend);

// Получить список друзей
router.get('/', authMiddleware, getFriends);

module.exports = router;
