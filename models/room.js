import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Hotel from "./hotel.js";

const Room = sequelize.define("Room", {
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: DataTypes.STRING,
  price: DataTypes.FLOAT,
  capacity: DataTypes.INTEGER,
  amenities: DataTypes.STRING,
});

Room.belongsTo(Hotel);
Hotel.hasMany(Room);

export default Room;
