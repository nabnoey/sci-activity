import User from "./user.model.js";
import { DataTypes } from "sequelize"; // <-- this is the missing piece


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
   
    modelName: "Teacher",
    
    hooks: {
      beforeCreate: (teacher) => { teacher.type = "teacher"; },
    },
  }
);

export default Teacher;