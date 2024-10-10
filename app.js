const express = require('express');
const mongoose = require('mongoose');
const http = require('http'); // Thêm dòng này
const socketIo = require('socket.io');
const connectDB = require('./config/db'); // Kết nối đến MongoDB
const seatRoutes = require('./routes/seatRoutes');
const Seat = require('./models/seat');
const swaggerSetup = require('./swagger'); // Đường dẫn đến tệp swagger.js
const app = express();

// Kết nối CSDL
connectDB();

app.use(express.json());
app.use('/api/seats', seatRoutes);
app.use(express.static('public'));

// Kết nối Swagger
swaggerSetup(app);


// Tạo HTTP server
const server = http.createServer(app);
const io = socketIo(server);

// Lắng nghe sự kiện socket
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('book_seat', async (seatId) => {
        const seat = await Seat.findById(seatId);
        if (!seat.isBooked) {
            seat.isBooked = true;
            await seat.save();
            io.emit('seat_booked', seatId); // Thông báo cho tất cả người dùng
        }
    });
});

// Chạy server
const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Xuất ứng dụng
module.exports = app; // Đảm bảo bạn xuất ra app ở cuối tệp
