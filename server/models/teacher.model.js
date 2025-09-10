import {Datatypes} from "sequelize"; // การสลายโครงสร้าง 
import User from "./user.model"; // สืบทอดจากคลาสแม่

const Teacher = User.init({
    school:{
        type: Datatypes.STRING,
        allowNull:false
    },

    phone:{
        type:Datatypes.STRING,
        allowNull:false
    }
},{
    scopes:{
        defaultScope:{
            where:{
                type:"teacher",
            },
        },
    },
    },
    
    {
        hook: {
        beforeCreate:(teacher) => {
            teacher.type = "teacher";
        },

        }
}); // เฉพาะ sequelize เท่านั้น ถ้าเป็น class ปกติต้องใช้ extend เท่านั้น



export default Teacher;