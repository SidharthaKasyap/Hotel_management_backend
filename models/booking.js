import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Room from "./room.js";
import User from "./user.js";

const Booking = sequelize.define("Booking", {
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Booking.belongsTo(Room);
Room.hasMany(Booking);

Booking.belongsTo(User);
User.hasMany(Booking);

export default Booking;
