import sequelize from "./db.js";
//import (นำเข้า) สิ่งที่ชื่อว่า DataTypes จากไลบรารีที่ชื่อว่า "sequelize"
import {DataTypes} from "sequelize";
import bcrypt from "bcryptjs"

// สร้างโมเดล (Model) ที่ชื่อว่า User โดยใช้ sequelize.define
// โมเดลนี้จะมีฟิลด์ (fields) ต่าง ๆ ที่กำหนดไว้ในออบเจ็กต์ที่สอง

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
     validate:{
      isEmail:true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
   
    }
  },

  type:{
    type:DataTypes.STRING,
    allowNull:false
  },

  isVerified:{
    type:DataTypes.BOOLEAN,
    default:false,
    allowNull:false

  },
},
{
  hooks: { 
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10) // เพื่อที่จะ password ไม่ซ้ำกัน  ยิ่งใส่เลขเยอะยิ่งถอดรหัสยาก แต่ก็จะรอนาน
         user.password = await bcrypt.hash(user.password, salt);
        
      }
    },
    beforeUpdate: async (user) =>{
      if(user.changed("password")){
       const salt = await bcrypt.genSalt(10) // เพื่อที่จะ password ไม่ซ้ำกัน  ยิ่งใส่เลขเยอะยิ่งถอดรหัสยาก แต่ก็จะรอนาน
         user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
});

// User.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.error("Error creating table", error);
//   });


  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
  }

export default User;
