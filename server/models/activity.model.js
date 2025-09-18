import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define(
  "activity", 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {    
      type: DataTypes.STRING,
      allowNull: false,
    },
    team_size: {    
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 }
    },
    date: {    
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {    
      type: DataTypes.STRING,
      allowNull: false,   
    },
    reg_open: {    
      type: DataTypes.DATE,
      allowNull: true,
    },
    reg_close: {    
      type: DataTypes.DATE,
      allowNull: true,
    },
    contact_name: {    
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_email: {    
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: { msg: "Email is invalid" } }
    },
    status: {    
      type: DataTypes.ENUM("draft","open","closed","in_progress","completed"), // แก้ typo
      defaultValue: "draft",
    }
  },
  {
    tableName: "activities",
    timestamps: false,
    hooks: {
      beforeValidate: (activity) => {
        if (activity.name) activity.name = activity.name.trim();
      }
    }
  }
);

// sync table
Activity.sync({ force: false })
  .then(() => console.log("Table 'activities' created"))
  .catch((error) => console.log("Error creating table", error));

export default Activity;
