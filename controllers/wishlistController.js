const Wishlist = require('../models/Wishlist');

// Создание нового вишлиста
exports.createWishlist = async (req, res) => {
    try {
        const { title, description, image, purchaseLink } = req.body;

        // Создаем новый вишлист
        const wishlist = new Wishlist({
            title,
            description,
            image,
            purchaseLink,
            user: req.user.id, // Получаем ID пользователя из токена
        });

        const savedWishlist = await wishlist.save(); // Сохраняем в базу данных
        res.status(201).json(savedWishlist); // Возвращаем сохраненный вишлист
    } catch (err) {
        res.status(500).json({ error: err.message }); // Возвращаем ошибку
    }
};

// Получение всех вишлистов пользователя
exports.getUserWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find({ user: req.user.id }); // Находим вишлисты текущего пользователя
        res.json(wishlists); // Возвращаем список вишлистов
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Удаление вишлиста
exports.deleteWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);

        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
        if (wishlist.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await wishlist.deleteOne(); // Удаляем вишлист
        res.json({ message: 'Wishlist deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
