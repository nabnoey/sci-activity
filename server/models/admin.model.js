import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece
import sequelize from "../config/db.js"; // import instance

const Admin = User.init(
  {
    department: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize, // ✅ ต้องใส่ instance ของ Sequelize
    modelName: "Admin",
    hooks: {
      beforeCreate: (admin) => { admin.type = "admin"; },
    },
  }
);

export default Admin;