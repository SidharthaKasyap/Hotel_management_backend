import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("Hotel Booking API is running...");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => console.log("✅ DB connected successfully."))
  .catch((err) => console.error("❌ DB connection failed:", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
