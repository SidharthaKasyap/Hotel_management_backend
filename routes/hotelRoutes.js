import express from "express";
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorize("admin"), createHotel)
  .get(getHotels);

router
  .route("/:id")
  .get(getHotelById)
  .put(authenticate, authorize("admin"), updateHotel)
  .delete(authenticate, authorize("admin"), deleteHotel);

export default router;
