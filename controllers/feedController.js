const Wishlist = require('../models/Wishlist');
const User = require('../models/User');

// Получение ленты активности друзей
exports.getFriendFeed = async (req, res) => {
    try {
        // Получаем текущего пользователя и его друзей
        const user = await User.findById(req.user.id).populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const friendIds = user.friends.map(friend => friend._id); // Массив ID друзей

        // Находим все вишлисты, принадлежащие друзьям, отсортированные по дате создания
        const friendWishlists = await Wishlist.find({ user: { $in: friendIds } })
            .sort({ createdAt: -1 }) // Сортировка по убыванию даты создания
            .populate('user', 'username email'); // Получаем имя и email владельца вишлиста

        res.status(200).json(friendWishlists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
