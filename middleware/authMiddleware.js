const jwt = require('jsonwebtoken');

// Middleware для проверки JWT токена
module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Извлекаем токен из заголовка Authorization
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        // Расшифровываем токен и добавляем данные пользователя в req.user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Добавляем расшифрованные данные в запрос
        next(); // Переходим к следующему обработчику
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' }); // Ошибка при неверном токене
    }
};
