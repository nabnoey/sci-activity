import { Sequelize } from "sequelize";
import dbConfig from "./db.config.js";

// สร้าง instance ของ Sequelize จาก config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  logging: false,
  pool: dbConfig.pool,
});

export default sequelize; // ✅ ต้อง import ตัวนี้ในโมเดล
