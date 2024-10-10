// routes/seatRoutes.js
const express = require('express');
const Seat = require('../models/seat');
const router = express.Router();

// Lấy danh sách ghế
router.get('/', async (req, res) => {
  const seats = await Seat.find();
  res.json(seats);
});

// Cập nhật ghế
router.put('/:id', async (req, res) => {
  const { isBooked } = req.body;
  const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, { isBooked }, { new: true });
  res.json(updatedSeat);
});

module.exports = router;
