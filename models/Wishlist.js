const mongoose = require('mongoose');

// Схема для вишлиста
const WishlistSchema = new mongoose.Schema({
    title: { type: String, required: true },           // Название вишлиста
    description: { type: String },                     // Описание вишлиста
    image: { type: String },                           // Ссылка на изображение
    purchaseLink: { type: String },                    // Ссылка, где купить
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID пользователя
    createdAt: { type: Date, default: Date.now }       // Дата создания
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
