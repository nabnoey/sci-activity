// models/judge.model.js
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import sequelize from "../config/db.js"; // import instance จริง

const Judge = User.init(
  {
    expertise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,          // ต้องใส่ Sequelize instance
    modelName: "Judge", // ชื่อโมเดล
    defaultScope: {     // scopes ต้องอยู่ใน options
      where: {
        type: "judge",
      },
    },
    hooks: {            // hooks ต้องอยู่ใน object ชื่อ hooks
      beforeCreate: (judge) => {
        judge.type = "judge";
      },
    },
  }
);

export default Judge;
