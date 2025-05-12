import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TryCatch } from "../middleware/errorMiddleware.js";

export const register = TryCatch(async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(402).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  res.status(201).json({ message: "User created", user });
});

export const login = TryCatch(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({ token, user });
});
