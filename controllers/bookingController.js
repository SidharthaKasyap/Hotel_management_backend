import { TryCatch } from "../middleware/errorMiddleware.js";
import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { Op } from "sequelize";

export const createBooking = TryCatch(async (req, res) => {
  const { roomId, startDate, endDate } = req.body;

  if (!roomId || !startDate || endDate) {
    return res
      .status(400)
      .json({ message: "Please provide necessary details" });
  }

  const overlap = await Booking.findOne({
    where: {
      roomId,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          startDate: {
            [Op.lte]: startDate,
          },
          endDate: {
            [Op.gte]: endDate,
          },
        },
      ],
    },
  });

  if (overlap) {
    return res
      .status(409)
      .json({ message: "Room already booked for given dates" });
  }

  const booking = await Booking.create({
    roomId,
    startDate,
    endDate,
    UserId: req.user.id,
  });

  res.status(201).json({ message: "Booking Completed", booking });
});

export const getUserBookings = TryCatch(async (req, res) => {
  const bookings = await Booking.findAll({
    where: { UserId: req.user.id },
    include: Room,
  });

  res.status(200).json(bookings);
});

export const cancelBooking = TryCatch(async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking || booking.UserId !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized or not found" });
  }
  await booking.destroy();
  res.status(204).end();
});
