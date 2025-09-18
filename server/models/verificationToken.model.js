import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class VerificationToken extends Model {}

VerificationToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // ✅ กำหนด primary key
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VerificationToken",
    tableName: "verificationTokens",
    timestamps: true,
  }
);

export default VerificationToken;
