import {DataTypes} from "sequelize"
import sequelize from  "./db.js";

const VeriticationToken = sequelize.define("veritificationToken", {
id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primatyKey: true
},
token:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true

},

userId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    reference:{
        model: "user",
        key: "id"
    },
},

expiresAt:{
    type: DataTypes.STRING,
    allowNull: false
},
});

export default VeriticationToken