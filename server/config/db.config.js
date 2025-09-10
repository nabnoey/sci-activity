import dotenv from "dotenv";
dotenv.config();
export default {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  PORT: process.env.DBPORT,
  DIALECT: process.env.DIALECT,
  //ใช้ pool เพื่อจัดการ connection ให้มีประสิทธิภาพและปลอดภัยมากขึ้น
  pool: {
    max: 5, //จำนวน connection สูงสุดที่อนุญาตใน pool
    min: 0,
    acquire: 30000,//เวลาสูงสุด (มิลลิวินาที) ที่ Sequelize จะรอเพื่อรับ connection ก่อนจะเกิด error (30000 ms = 30 วินาที)
    idle: 10000,// เวลาที่ connection จะว่าง (idle) ก่อนจะถูกปิด (10000 ms = 10 วินาที)
  },
};
