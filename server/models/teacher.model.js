import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece
import sequelize from "../config/db.js"; // import instance

const Teacher = User.init({
    school:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
}, {
    sequelize, // ✅ ต้องใส่ instance ของ Sequelize
    modelName: "Teacher",
    
    hooks: {
      beforeCreate: (teacher) => { teacher.type = "teacher"; },
    },
  }
);

export default Teacher;