import dotenv from "dotenv";
dotenv.config(); // จะให้ dotenv โหลดค่าจากไฟล์ .env JWT_SECRET=noey_jwt_secret

export default {
  secret: process.env.JWT_SECRET,
};
