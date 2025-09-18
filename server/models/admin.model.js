import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece


const Admin = User.init(
  {
    department: { type: DataTypes.STRING, allowNull: false },
  },
  {
  
    modelName: "Admin",
    hooks: {
      beforeCreate: (admin) => { admin.type = "admin"; },
    },
  }
);

export default Admin;