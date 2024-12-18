const User = require('../models/User'); // Импорт модели пользователя
const bcrypt = require('bcryptjs');       // Для хеширования паролей
const jwt = require('jsonwebtoken');    // Для создания токенов

// Регистрация нового пользователя
exports.register = async (req, res) => {
    try {
        // Извлекаем данные из тела запроса
        const { username, email, password } = req.body;

        // Хешируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save(); // Сохраняем пользователя в базе данных

        res.status(201).json({ message: 'User registered successfully' }); // Успешный ответ
    } catch (err) {
        res.status(500).json({ error: err.message }); // Ответ при ошибке
    }
};

// Логин пользователя
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ищем пользователя в базе данных по email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' }); // Ошибка, если не найден

        // Сравниваем введенный пароль с хешированным паролем в базе данных
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' }); // Ошибка при несовпадении

        // Создаем JWT токен для авторизации
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Возвращаем токен и данные пользователя
        res.json({ token, userId: user._id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message }); // Ответ при ошибке
    }
};
