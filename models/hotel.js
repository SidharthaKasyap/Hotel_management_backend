import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Hotel = sequelize.define("Hotel", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  rating: DataTypes.FLOAT,
});

export default Hotel;
