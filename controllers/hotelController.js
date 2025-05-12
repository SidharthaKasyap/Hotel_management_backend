import { TryCatch } from "../middleware/errorMiddleware.js";
import Hotel from "../models/hotel.js";

export const createHotel = TryCatch(async (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    res.send(400).json({ message: "Please provide necessary details" });
  }
  const hotel = await Hotel.create(req.body);
  res.status(201).json(hotel);
});

export const getHotels = TryCatch(async (req, res) => {
  const hotels = await Hotel.findAll();

  res.status(200).json(hotels);
});

export const getHotelById = TryCatch(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Please provide a valid id" });
  }
  const hotel = await Hotel.findByPk(req.params.id);

  if (!hotel) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(hotel);
});

export const updateHotel = TryCatch(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Please provide a valid id" });
  }

  const hotel = await Hotel.findByPk(req.params.id);

  if (!hotel) return res.status(404).json({ message: "Hotel Not found" });

  await hotel.update(req.body);

  res.status(200).json(hotel);
});

export const deleteHotel = TryCatch(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Please provide a valid id" });
  }

  const hotel = await Hotel.findByPk(req.params.id);

  if (!hotel) return res.status(404).json({ message: "Hotel Not found" });

  await hotel.destroy();

  res.status(204).end();
});
