import {Datatypes} from "sequelize"; // การสลายโครงสร้าง 
import User from "./user.model"; // สืบทอดจากคลาสแม่
 
const Admin = User({

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
});

export default Admin