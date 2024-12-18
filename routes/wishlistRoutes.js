const express = require('express');
const { createWishlist, getUserWishlists, deleteWishlist } = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Защита маршрутов

const router = express.Router();

// POST /api/wishlists - Создание вишлиста
router.post('/', authMiddleware, createWishlist);

// GET /api/wishlists - Получение всех вишлистов текущего пользователя
router.get('/', authMiddleware, getUserWishlists);

// DELETE /api/wishlists/:id - Удаление вишлиста
router.delete('/:id', authMiddleware, deleteWishlist);

module.exports = router;
