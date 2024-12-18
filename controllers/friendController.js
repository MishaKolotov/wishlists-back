const User = require('../models/User');

// Добавить друга
exports.addFriend = async (req, res) => {
    try {
        const friendId = req.body.friendId;

        // Проверяем, что пользователь существует
        const friend = await User.findById(friendId);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        const user = await User.findById(req.user.id);

        // Проверяем, что друг еще не добавлен
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Friend already added' });
        }

        // Добавляем друга
        user.friends.push(friendId);
        await user.save();

        res.status(200).json({ message: 'Friend added successfully', friends: user.friends });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Удалить друга
exports.removeFriend = async (req, res) => {
    try {
        const friendId = req.params.friendId;

        const user = await User.findById(req.user.id);

        // Удаляем друга из списка
        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();

        res.status(200).json({ message: 'Friend removed successfully', friends: user.friends });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Получить список друзей
exports.getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username email');
        res.json(user.friends);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
