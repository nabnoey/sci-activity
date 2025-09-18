import express from "express";
// const dotenv = require("dotenv")
import dotenv from "dotenv";
import cors from "cors";
import activityRouter from "./routers/activity.router.js"
import authRouter from "./routers/auth.router.js";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5003;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    if(NODE_ENV === "development"){
      await db.sequelize.sync({ aiter: true }); // สร้างตารางใหม่ทุกครั้งที่เริ่มเซิร์ฟเวอร์
      console.log("database Synced successfully.");
    }
  }catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

import db from "./models/index.js";
const Role = db.Role;
// const initRole = () => {
//   Role.create({ id: 1, roleName: "admin" });
//   Role.create({ id: 2, roleName: "manager" });
//   Role.create({ id: 3, roleName: "teacher" });
//   Role.create({ id: 4, roleName: "judge" });
// };
// db.sequelize.sync({ force: false }).then(() => {
//   initRole();
// });

db.sequelize.sync({ force: false }).then(() => {
  console.log("create table user_roles");
});

app.get("/", (req, res) => {
  res.send("SCI Competition Backend Server");
});

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization, x-access-token"],
  })
);


app.use("/api/v1/activity", activityRouter);

// use authentication router
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
