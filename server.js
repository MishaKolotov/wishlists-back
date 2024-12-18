require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Подключение к базе данных
const authRoutes = require('./routes/authRoutes'); // Импорт маршрутов для аутентификации
const wishlistRoutes = require('./routes/wishlistRoutes');
const friendRoutes = require('./routes/friendRoutes');
const feedRoutes = require('./routes/feedRoutes');
const cors = require('cors');
const path = require('path');
const mime = require('mime-types');

const options = {
    key: fs.readFileSync('./certs/key.pem'), // путь к ключу
    cert: fs.readFileSync('./certs/cert.pem') // путь к сертификату
};

dotenv.config(); // Загружаем переменные окружения из файла .env
connectDB()
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

const app = express();
app.use(cors());
app.use(express.json()); // Middleware для обработки JSON в запросах
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
});

app.get('/', (req, res) => {
    res.send('Production server is running!');
});

// Маршруты для аутентификации
app.use('/api/auth', authRoutes);

app.use('/api/wishlists', wishlistRoutes);

app.use('/api/friends', friendRoutes);

app.use('/api/feed', feedRoutes);

const PORT = process.env.PORT || 5000; // Порт сервера
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`)); // Запуск сервера

https.createServer(options, app).listen(PORT, '0.0.0.0',() => {
    console.log(`Server running securely on https://localhost:${PORT}`);
});