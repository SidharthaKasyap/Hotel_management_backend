import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/my", authenticate, getUserBookings);
router.delete("/:id", authenticate, cancelBooking);

export default router;
