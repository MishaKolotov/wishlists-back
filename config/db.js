const mongoose = require('mongoose');

// Функция для подключения к базе данных MongoDB
const connectDB = async () => {
    try {
        // Подключаемся к MongoDB с использованием переменной окружения MONGO_URI
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...'); // Выводим сообщение об успешном подключении
    } catch (err) {
        console.error(err.message); // Выводим ошибку, если подключение не удалось
        process.exit(1); // Завершаем процесс с кодом 1
    }
};

module.exports = connectDB; // Экспортируем функцию для подключения
